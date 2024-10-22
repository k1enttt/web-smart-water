import PlantCardWrapper from "@/components/plant/plant-card-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { connectToMqtt, subscribeToTopic } from "@/lib/mqtt";
import { getPlants } from "@/lib/plants";

export default async function Home() {
  connectToMqtt("0");
  subscribeToTopic("sensor/DHT11/temperature");
  subscribeToTopic("sensor/DHT11/humidity");
  subscribeToTopic("sensor/BH1750/lux");
  subscribeToTopic("sensor/soil_sensor/soilMoisture");
  subscribeToTopic("sensor/water");
  const plantList = await getPlants();
  return (
    <main className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
      <div className="w-full flex flex-col items-center justify-center gap-y-4">
        {plantList.map((plant) => (
          <PlantCardWrapper key={plant.id} plantId={plant.id} />
        ))}
      </div>
      <Toaster />
    </main>
  );
}
