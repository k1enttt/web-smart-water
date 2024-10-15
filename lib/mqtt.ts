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

const clientId = "webserver-" + Math.random() * 1000;

const client = mqtt.connect(
  "mqtt://192.168.229.12:1883",
  {
    clientId: clientId,
  }
);

const buttonState = false;

export const connectToMqtt = (planId: string) => {
  client.on("connect", function () {
    console.log("MQTT connected");
    client.subscribe(
      "client/esp32-client-24:D7:EB:18:3D:D8/status",
      function (err) {
        if (!err) {
          console.log("Subscribed to Status");
        }
        if (err) {
          console.log("Error: ", err);
        }
      }
    );
    client.subscribe(
      "client/esp32-client-24:D7:EB:18:3D:D8/sensor",
      function (err) {
        if (!err) {
          console.log("Subscribed to Sensor");
        }
        if (err) {
          console.log("Error: ", err);
        }
      }
    );
    listenOnMqttSensor(planId);
    publishButtonState({topic: "water_button_state", payload: buttonState});
  });
};

export const listenOnMqttSensor = (plantId: string) => {
  let lastHour = new Date().getHours() - 1;

  client.on("message", async function (topic, message) {
    const temperature: number = JSON.parse(message.toString()).temperature;
    const humidity: number = JSON.parse(message.toString()).humidity;
    const light: number = JSON.parse(message.toString()).lux;
    const moisture: number = JSON.parse(message.toString()).soil_moisture;

    // Cập nhật giá trị hiện tại của cảm biến lên Firebase
    await updateCurrentTemperature(plantId, temperature);
    await updateCurrentHumidity(plantId, humidity);
    await updateCurrentLight(plantId, light);
    await updateCurrentMoisture(plantId, moisture);

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
