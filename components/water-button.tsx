"use client";
import { useState } from "react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { updateManualModeState, updatePlantWaterStatus } from "@/lib/plants";
import { PlantSchema } from "@/schemas";
import { useToast } from "@/components/ui/use-toast";
import { getFullDateString, waitForEnoughWater } from "@/lib/utils";
import { updateActivityLog } from "@/lib/activity-log";

export const WaterButton = ({ plant }: { plant: PlantSchema }) => {
  const [isPending, startTransition] = useTransition();
  const [isWatered, setIsWatered] = useState(plant.water_button_state || false);
  const { toast } = useToast();
  const wateringTimeout = 10000;

  const handleWatering = async () => {
    startTransition(async () => {
      // Update activity log
      await updateActivityLog({
        message: "Bấm nút tưới cây",
        time: new Date().toLocaleString(),
        type: "SUCCESS",
        device_mac: plant.device_mac,
        plant_id: plant.id,
      });

      // The moisture is not available
      if (!plant.moisture) {
        toast({
          title: "Không thể đọc dữ liệu cảm biến độ ẩm đất! 🌧️",
          description: "Vui lòng kiểm tra lại cảm biến độ ẩm đất!",
          variant: "destructive",
        });
        return;
      }

      // The high threshold is not available
      if (!plant.high_threshold) {
        toast({
          title: "Không thể đọc dữ liệu ngưỡng cao của độ ẩm đất!",
          description: "Vui lòng kiểm tra lại!",
          variant: "destructive",
        });
        return;
      }

      // The low threshold is not available
      if (!plant.low_threshold) {
        toast({
          title: "Không thể đọc dữ liệu ngưỡng thấp của độ ẩm đất!",
          description: "Vui lòng kiểm tra lại!",
          variant: "destructive",
        });
        return;
      }

      // The manual mode is turned off
      if (plant.water_mode !== 2) {
        toast({
          title: "Chế độ tưới thủ công đang bị tắt! 🚫",
          description: "Vui lòng bật chế độ tưới thủ công để tiếp tục.",
          variant: "destructive",
        });
        return;
      }

      // The soil moisture is too high
      const now = new Date();
      if (plant.moisture >= plant.high_threshold) {
        toast({
          title: "Độ ẩm đất quá cao! 💦",
          description: getFullDateString(now.toLocaleString()),
          variant: "destructive",
        });
        return;
      }

      // Active the water button
      async function updateState(value: boolean) {
        // Update database
        setIsWatered(value);
        await updatePlantWaterStatus(plant.id, value);
        await updateManualModeState(plant.id, (value) ? 1 : 0);
        console.log("Watering plant...");
      }
      updateState(true);

      // Water the plant for 10s by default
      // If the moisture is enough, stop watering immediately
      let moistureState = await waitForEnoughWater({
        moisture: plant.moisture,
        threshold: (plant.low_threshold + plant.high_threshold) / 2,
        timeout: wateringTimeout,
      });

      // The soil moisture is NOT enough after watering
      if (moistureState == 0) {
        toast({
          title: "Lượng nước tưới chưa đủ! 🌵",
          description: "Độ ẩm đất vẫn còn thấp!",
          variant: "informative",
        });
      }

      // The soil moisture is enough after watering
      if (moistureState == 1) {
        toast({
          title: "Đã tưới cây thành công! 🌿",
          description: "Cây đã được tưới đủ nước!",
          variant: "success",
        });
      }

      updateState(false);
      console.log("Watering done!");

      // Update activity log
      await updateActivityLog({
        message: "Tưới cây thành công",
        time: new Date().toLocaleString(),
        type: "SUCCESS",
        device_mac: plant.device_mac,
        plant_id: plant.id,
      });
    });
  };

  return (
    <Button
      disabled={isPending || plant.water_mode === 1}
      variant={plant.water_button_state ? "secondary" : "default"}
      onClick={handleWatering}
      className=""
    >
      {isWatered
        ? `Đang tưới...`
        : "Tưới cây nào!"}
    </Button>
  );
};
