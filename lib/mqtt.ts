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

let mqttClient: mqtt.MqttClient;
const plantsRef = getPlantsRef();

const buttonState = false;
let temperature;
let humidity;
let light;
let moisture;

export const connectToMqtt = (planId: string) => {
  const clientId = `webserver_${Math.random().toString(36).substring(7)}`;
  const options = {
    clientId,
    username: "kienttt",
    password: "kienttt",
    reconnectPeriod: 5000,
    clean: true,
  } as IClientOptions;

  mqttClient = mqtt.connect(
    "tls://a12b4b611c244a27b486495fb4c1e28f.s1.eu.hivemq.cloud:8883",
    options
  );

  mqttClient.on("error", (err) => {
    console.error("Error connecting to MQTT broker:", err);
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker");
  });

  mqttClient.on("connect", function () {
    console.log("Client connected:" + clientId);
  });

  mqttClient.on("message", function (topic, message) {
    if (topic === "temperature") {
      temperature = message.toString();
      console.log("Temperature: ", temperature);
    }
    if (topic === "humidity") {
      humidity = message.toString();
      console.log("Humidity: ", humidity);
    }
    if (topic === "light") {
      light = message.toString();
      console.log("Light: ", light);
    }
    if (topic === "moisture") {
      moisture = message.toString();
      console.log("Moisture: ", moisture);
    }
    if (topic === "water") {
      const water = message.toString();
      console.log("Water: ", water);
    }
  });
};

function subscribeToTopic(topic: string) {
  console.log(`Subscribing to Topic: ${topic}`);
  mqttClient.subscribe(topic, { qos: 0 }, (err) => {
    if (err) {
      console.error("Error subscribing to topic:", err);
    }
  });
}

function unsubscribeToTopic(topic: string) {
  console.log(`Unsubscribing to Topic: ${topic}`);

  mqttClient.unsubscribe(topic, (err) => {
    if (err) {
      console.error("Error unsubscribing to topic:", err);
    }
  });
}
