import React from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { AutomaticWateringSwitch } from "@/components/automatic-watering-switch";
import { WaterButton } from "@/components/water-button";
import { PlantSchema } from "@/schemas";
import { HoverWrapper } from "./hover-wrapper";

interface CardWrapperProps {
  children: React.ReactNode;
  plant: PlantSchema;
}

const CardWrapper = ({ children, plant }: CardWrapperProps) => {
  const defaultName = "New plant";

  return (
    <Card className="w-[80%] min-w-[400px] shadow-md">
      <CardHeader>
        <Header label={plant.name || defaultName} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AutomaticWateringSwitch plant={plant} />
      </CardFooter>
      <CardFooter className="w-full flex justify-center">
        {plant.water_mode === 1 && (
          <HoverWrapper message="Bạn phải tắt chế độ tưới tự động thì mới tưới thủ công được.">
            <WaterButton plant={plant} />
          </HoverWrapper>
        )}
        {plant.water_mode !== 1 && <WaterButton plant={plant} />}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
