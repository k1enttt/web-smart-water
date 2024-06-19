import mqtt from "mqtt";

import {
  dbRef,
  updateCurrentHumidity,
  updateCurrentLight,
  updateCurrentMoisture,
  updateCurrentTemperature,
} from "@/lib/plants";
import { getTodayString } from "@/lib/utils";
import { DayLogSchema } from "@/schemas";
import { child, push } from "firebase/database";

const clientId = "emqx_react_21520309";
const CERT = `-----BEGIN CERTIFICATE-----
MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVT
MRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5j
b20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsB
CSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97
nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt
43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7P
T19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4
gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAO
BgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbR
TLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUw
DQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/Esr
hMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg
06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJF
PnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0ls
YSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQk
CAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=
-----END CERTIFICATE-----`

const client = mqtt.connect(
  "mqtts://oe9219e1.ala.eu-central-1.emqxsl.com:8883",
  {
    clientId: clientId,
    username: "thinh",
    password: "6wbF6MbDLF8fEFT",
    cert: CERT,
  }
);

const buttonState = false;

export const connectToMqtt = () => {
  client.on("connect", function () {
    console.log("MQTT connected");
    client.subscribe(
      "client/esp32-client-24:D7:EB:18:3D:D8/status",
      function (err) {
        if (!err) {
          console.log("Subscribed to Status");
        }
      }
    );
    client.subscribe(
      "client/esp32-client-24:D7:EB:18:3D:D8/sensor",
      function (err) {
        if (!err) {
          console.log("Subscribed to Sensor");
        }
      }
    );
    listenOnMqttSensor();
    publishButtonState({topic: "water_button_state", payload: buttonState});
  });
};

export const listenOnMqttSensor = () => {
  let lastHour = new Date().getHours() - 1;

  client.on("message", async function (topic, message) {
    const temperature: number = JSON.parse(message.toString()).temperature;
    const humidity: number = JSON.parse(message.toString()).humidity;
    const light: number = JSON.parse(message.toString()).lux;
    const moisture: number = JSON.parse(message.toString()).soil_moisture;
    // Cập nhật giá trị hiện tại của cảm biến
    await updateCurrentTemperature("0", temperature);
    await updateCurrentHumidity("0", humidity);
    await updateCurrentLight("0", light);
    await updateCurrentMoisture("0", moisture);

    // Cập nhật logs cho biểu đồ
    // 1a. Lấy thời gian thực định dạng thành mẫu "hh:mm:ss dd-MM-yyyy"
    const time: string = getTodayString();
    // 1b. Lấy giờ hiện tại
    const hour: number = parseInt(time.split(" ")[0].split(":")[0]);
    // 2. Gộp thành mẫu DayLogSchema
    if (hour !== lastHour && false) {
      const daylog = {
        time,
        temperature,
        humidity,
        light,
        moisture,
      } as DayLogSchema;
      // 3. Thêm vào mảng daylogs
      await push(child(dbRef, `plants/0/daylogs`), daylog);
      lastHour = hour;
    }
  });
};

export const publishButtonState = ({topic, payload} : {topic: string, payload: boolean}) => {
  const payloadString = payload ? "1" : "0";
    if (client) {
      client.publish(topic, payloadString, (error) => {
        if (error) {
          console.error("Publish error: ", error);
        }
        else console.log("Published to ", topic, payloadString);
      });
    } else {
      console.error("Client not connected");
    }
}
