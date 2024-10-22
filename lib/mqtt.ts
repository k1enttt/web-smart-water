import mqtt, { IClientOptions } from "mqtt";
import {
  updateCurrentHumidity,
  updateCurrentLight,
  updateCurrentMoisture,
  updateCurrentTemperature,
} from "@/lib/plants";
import { getTodayString } from "@/lib/utils";
import { DayLogSchema } from "@/schemas";
import { child, push } from "firebase/database";
import { getPlantsRef } from "./db";
import { topics } from "./constaints";

let mqttClient: mqtt.MqttClient;
const plantsRef = getPlantsRef();

const buttonState = false;
let temperature;
let humidity;
let light;
let moisture;

export const connectToMqtt = (planId: string) => {
  const clientId = `webserver_${Math.random().toString(36).substring(7)}`;

  const hiveHost =
    "tls://a12b4b611c244a27b486495fb4c1e28f.s1.eu.hivemq.cloud:8883";
  const hiveOptions = {
    clientId,
    username: "kienttt",
    password: "kienttt",
    reconnectPeriod: 5000,
    clean: true,
  } as IClientOptions;
  const nt531Host = "mqtt://192.168.50.12:1883";
  const nt531Options = {
    clientId,
    reconnectPeriod: 5000,
    clean: true,
  };

  mqttClient = mqtt.connect(hiveHost, hiveOptions);

  mqttClient.on("error", (err) => {
    console.error("Error connecting to MQTT broker:", err);
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker");
  });

  mqttClient.on("connect", function () {
    console.log("Client connected: " + clientId);
  });

  mqttClient.on("message", function (topic, message) {
    if (topic === topics.temperature) {
      temperature = message.toString();
      updateCurrentTemperature("0", Number(temperature));
      console.log("Temperature: ", temperature);
    } else if (topic === topics.humidity) {
      humidity = message.toString();
      updateCurrentHumidity("0", Number(humidity));
      console.log("Humidity: ", humidity);
    } else if (topic === topics.light) {
      light = message.toString();
      updateCurrentLight("0", Number(light));
      console.log("Light: ", light);
    } else if (topic === topics.moisture) {
      moisture = message.toString();
      updateCurrentMoisture("0", Number(moisture));
      console.log("Moisture: ", moisture);
    } else if (topic === "water") {
      const water = message.toString();
      console.log("Water: ", water);
    } else {
      console.log("Unknown topic: ", topic);
      console.log("Message: ", message.toString());
    }
  });
};

export function subscribeToTopic(topic: string) {
  console.log(`Subscribing to Topic: ${topic}`);
  mqttClient.subscribe(topic, { qos: 0 }, (err) => {
    if (err) {
      console.error("Error subscribing to topic:", err);
    }
  });
}

export function unsubscribeToTopic(topic: string) {
  console.log(`Unsubscribing to Topic: ${topic}`);

  mqttClient.unsubscribe(topic, (err) => {
    if (err) {
      console.error("Error unsubscribing to topic:", err);
    }
  });
}
