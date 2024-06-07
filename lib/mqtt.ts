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

const client = mqtt.connect(
  "mqtts://oe9219e1.ala.eu-central-1.emqxsl.com:8883",
  {
    username: "thinh",
    password: "6wbF6MbDLF8fEFT",
  }
);

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
  });
};

export const listenOnMqtt = () => {
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
    if (hour !== lastHour) {
      const daylog = {
        time,
        temperature,
        humidity,
        light,
        moisture,
      } as DayLogSchema;
      // 3. Thêm vào mảng daylogs
      await push(child(dbRef, `plants/0/daylogs`), daylog);
      console.log("Pushed to daylogs");
      lastHour = hour;
    }
  });
};
