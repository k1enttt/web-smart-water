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

interface CardWrapperProps {
  children: React.ReactNode;
  plant: PlantSchema;
  className?: string;
}

const CardWrapper = ({ children, plant, className }: CardWrapperProps) => {
  const defaultName = "New plant";
 className = className || "";
  return (
    <Card className={cn("min-w-[400px] shadow-md mx-auto", className)}>
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
