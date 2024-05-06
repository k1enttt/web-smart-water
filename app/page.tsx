import { PlantGallery } from "@/components/plant-gallery";
import { getPlants } from "@/lib/plants";
import { Plant } from "@/schemas";

export default async function Home() {
  const plantList: Plant[] = await getPlants().then((snapshot) => snapshot.val());

  return (
    <main className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
      <PlantGallery plantList={plantList}/>
    </main>
  );
}
