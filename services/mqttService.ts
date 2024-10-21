import mqtt from "mqtt";

export default class MQTTService {
  private client: mqtt.MqttClient | null;
  private host: string;
  private options: mqtt.IClientOptions;
  private messageHandler: (topic: string, message: string) => void;

  constructor(
    host: string,
    messageHandler: (topic: string, message: string) => void
  ) {
    this.client = null;
    this.host = host;
    this.options = {
      username: "kienttt",
      password: "kienttt",
      reconnectPeriod: 5000,
    };
    this.messageHandler = messageHandler;
  }

  public connect() {
    this.client = mqtt.connect(this.host, this.options);

    // MQTT Callback for 'error' event
    this.client.on("error", (err) => {
      console.log(err);
      if (!this.client) {
        console.log("MQTT client is not connected");
        return;
      }
      this.client.end();
    });

    // MQTT Callback for 'connect' event
    this.client.on("connect", () => {
      console.log(`MQTT client connected`);
    });

    // Call the message callback function when message arrived
    this.client.on("message", (topic, message) => {
      console.log(message.toString());
      if (this.messageHandler) {
        this.messageHandler(topic, message.toString());
      }
    });

    this.client.on("close", () => {
      console.log(`MQTT client disconnected`);
    });
  }

  // Publish MQTT Message
  public publish(topic: string, message: string, options?: mqtt.IClientPublishOptions) {
    if (!this.client) {
      console.log("MQTT client is not connected");
      return;
    }
    this.client.publish(topic, message, options);
  }

  // Subscribe to MQTT Message
  public subscribe(topic: string, options?: mqtt.IClientSubscribeOptions) {
    if (!this.client) {
      console.log("MQTT client is not connected");
      return;
    }
    this.client.subscribe(topic, options);
  }
}
