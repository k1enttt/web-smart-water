"use client";
import Image from "next/image";
import { useState } from "react";
import { PlantSchema } from "@/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PlantInfoCard = (
  { 
    plant, 
    className
  }:{ 
    plant: PlantSchema, 
    className? :string 
  }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className={cn("p-4 space-y-2", className)}>
      {plant.image && (
        <Image
          src={plant.image}
          alt={plant.name || "Plant image"}
          height={300}
          width={600}
          priority={true}
          className={`object-cover rounded-lg h-[300px] ${
            imageLoaded ? "remove-blur" : "blur"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <CardTitle>{plant.name}</CardTitle>
      <CardDescription>{plant.description}</CardDescription>
      <CardContent className="space-y-1 p-0 m-0">
        <div className="flex justify-between items-center">
          <div>ID</div>
          <div>{plant.id}</div>
        </div>
        <div className="flex justify-between items-center">
          <div>Ngưỡng thấp (độ ẩm đất)</div>
          <div>{plant.low_threshold}</div>
        </div>
        <div className="flex justify-between items-center">
          <div>Ngưỡng cao (độ ẩm đất)</div>
          <div>{plant.high_threshold}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantInfoCard;
