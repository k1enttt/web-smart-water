"use client";
import { useState } from "react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getFullDateString, waitForEnoughWater } from "@/lib/utils";
import { PlantUnits } from "@/models/PlantUnit";
import { SensorLog } from "@/models/SensorLog";
import { PlantType } from "@/models/PlantType";
// import { updateActivityLog } from "@/lib/activity-log";

export const WaterButton = ({ plant }: { plant: PlantUnits }) => {
  const [isPending, startTransition] = useTransition();
  // const [isWatered, setIsWatered] = useState(plant.water_button_state || false);
  const [isWatered, setIsWatered] = useState(false);
  // isWatering is the state of the water process, if the device is watering, it send to the server the state of the water pump
  const [isWatering, setIsWatering] = useState(false);
  const { toast } = useToast();
  const wateringTimeout = 10000;

  // TODO: Get the sensor logs data from MongoDB and get the lastest data corresponding to the plant ID
  const sensorLog = {
    temperature: 0,
    humidity: 0,
    moisture: 0,
    light: 0,
    timestamp: new Date(),
  } as SensorLog;

  // TODO: Get the plant type from MongoDB and get the one corresponding to the plant ID
  const plantType = {
    name: "Cây cỏ",
    description: "Cây cỏ",
    high_moisture_threshold: 70,
    low_moisture_threshold: 30,
    image_url: "",
  } as PlantType;

  // Update the water button state to Firebase
  async function updateState(value: boolean) {

    // TODO: Send message to topic "watering" on the MQTT server to control the water pump

    setIsWatered(value);
    console.log("Watering plant...");



    return 1;
  }

  // Update activity log to Firebase
  async function recordActivityLog({
    message,
    type,
    device_mac,
    plant_id,
  }: {
    message: string;
    type: "SUCCESS" | "ERROR";
    device_mac: string | undefined;
    plant_id: string | undefined;
  }) {
    const updateTime = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // await updateActivityLog({
    //   message: message,
    //   time: updateTime,
    //   type: type,
    //   device_mac: device_mac || "",
    //   plant_id: plant_id || "",
    // });
  }

  /** Handle the water button click event */
  const handleClick = async () => {
    startTransition(async () => {
      let result;

      recordActivityLog({
        message: "Bấm nút tưới cây",
        type: "SUCCESS",
        device_mac: plant.device_mac,
        plant_id: plant.id,
      });

      // The moisture is not available
      if (!sensorLog.moisture) {
        toast({
          title: "Không thể đọc dữ liệu cảm biến độ ẩm đất! 🌧️",
          description: "Vui lòng kiểm tra lại cảm biến độ ẩm đất!",
          variant: "destructive",
        });
        return;
      }

      // The high threshold is not available
      if (!plantType.high_moisture_threshold) {
        toast({
          title: "Không thể đọc dữ liệu ngưỡng cao của độ ẩm đất!",
          description: "Vui lòng kiểm tra lại!",
          variant: "destructive",
        });
        return;
      }

      // The low threshold is not available
      if (!plantType.low_moisture_threshold) {
        toast({
          title: "Không thể đọc dữ liệu ngưỡng thấp của độ ẩm đất!",
          description: "Vui lòng kiểm tra lại!",
          variant: "destructive",
        });
        return;
      }

      // The manual mode is turned off
      if (plant.automatic_watering) {
        toast({
          title: "Chế độ tưới thủ công đang bị tắt! 🚫",
          description: "Vui lòng bật chế độ tưới thủ công để tiếp tục.",
          variant: "destructive",
        });
        return;
      }

      // The soil moisture is too high
      const now = new Date();
      if (sensorLog.moisture >= plantType.high_moisture_threshold) {
        toast({
          title: "Độ ẩm đất quá cao! 💦",
          description: getFullDateString(now.toLocaleString()),
          variant: "destructive",
        });
        return;
      }

      // Start watering the plant
      result = 0;
      result = await updateState(true);
      if (!result) {
        return;
      }
    });
  };

  /** Exercute the watering process */
  async function water({
    moisture,
    threshold,
    timeout,
  }: {
    moisture: number;
    threshold: number;
    timeout: number;
  }) {
    // Water the plant for 10s by default
    // If the moisture is enough, stop watering immediately
    let moistureState = await waitForEnoughWater({
      moisture: moisture,
      threshold: threshold,
      timeout: timeout,
    });

    // Warning: The soil moisture is NOT enough after watering
    if (moistureState == 0) {
      console.log("The soil moisture is NOT enough after watering!");
      toast({
        title: "Lượng nước tưới chưa đủ! 🌵",
        description: "Độ ẩm đất vẫn còn thấp!",
        variant: "informative",
      });
    }

    // Warning: The soil moisture is enough after watering
    if (moistureState == 1) {
      toast({
        title: "Đã tưới cây thành công! 🌿",
        description: "Cây đã được tưới đủ nước!",
        variant: "success",
      });
    }

    // Stop watering the plant
    let result = 0;
    result = await updateState(false);
    if (!result) return;
    console.log("Watering done!");

    // Update activity log
    recordActivityLog({
      message: "Tưới cây thành công",
      type: "SUCCESS",
      device_mac: plant.device_mac,
      plant_id: plant.id,
    });
  }, []);

  /** Process the watering event */
  // useEffect(() => {
  //   const waterState = plant.manual_mode?.server;
  //   if (waterState === 1) {
  //     if (plant.moisture && plant.low_threshold && plant.high_threshold) {
  //       setIsWatered(true);
  //       water({
  //         moisture: plant.moisture || 0,
  //         threshold: (plant.high_threshold + plant.low_threshold) / 2,
  //         timeout: wateringTimeout,
  //       });
  //     }
  //   }
  // }, [plant.manual_mode?.server]);

  return (
    <Button
      disabled={
        isPending || plant.automatic_watering
      }
      variant={isWatering ? "secondary" : "default"}
      onClick={handleClick}
      className=""
    >
      {isWatered ? `Đang tưới...` : "Tưới cây nào!"}
    </Button>
  );
};
