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

const PlantInfoCard = ({ plant }: { plant: PlantSchema }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="flex-1 p-4 space-y-2">
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
          onLoad={() => {setImageLoaded(true); console.log("Image loaded")}}
        />
      )}
      <CardTitle>{plant.name}</CardTitle>
      <CardDescription>{plant.description}</CardDescription>
      <CardContent className="space-y-1">
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
