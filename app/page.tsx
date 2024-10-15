import PlantCardWrapper from "@/components/plant/plant-card-wrapper";
import { Toaster } from "@/components/ui/toaster";
import { getPlants } from "@/lib/plants";
import { PlantSchema } from "@/schemas";

export default async function Home() {
  const plantList: PlantSchema[] = await getPlants()
    .then((snapshot) => snapshot.val())
    .catch((error) => {
      console.error(error);
      return [];
    });

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
