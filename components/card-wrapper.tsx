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
import { HoverWrapper } from "@/components/hover-wrapper";
import { cn } from "@/lib/utils";
import { PlantUnits } from "@/models/PlantUnit";

interface CardWrapperProps {
  children: React.ReactNode;
  plant: PlantUnits;
  className?: string;
}

const CardWrapper = ({ children, plant, className }: CardWrapperProps) => {
  const defaultName = "New plant";
 className = className || "";
  return (
    <Card className={cn("min-w-[400px] shadow-md mx-auto", className)}>
      <CardHeader>
        <Header label={plant.plant_name || defaultName} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AutomaticWateringSwitch plant={plant} />
      </CardFooter>
      <CardFooter className="w-full flex justify-center">
        {plant.automatic_watering && (
          <HoverWrapper message="Bạn phải tắt chế độ tưới tự động thì mới tưới thủ công được.">
            <WaterButton plant={plant} />
          </HoverWrapper>
        )}
        {!plant.automatic_watering && <WaterButton plant={plant} />}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
