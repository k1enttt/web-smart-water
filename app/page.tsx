import { PlantGallery } from "@/components/plant-gallery";
import { Toaster } from "@/components/ui/toaster";
import { getPlants } from "@/lib/plants";
import { PlantSchema } from "@/schemas";

export default async function Home() {
  // const plantList = await getPlants();

  const plantList: PlantSchema[] = [];
  return (
    <main className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
      <PlantGallery plantList={plantList} />
      <Toaster />
    </main>
  );
}
