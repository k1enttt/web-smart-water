import { PlantGallery } from "@/components/plant-gallery";
import { getPlants } from "@/lib/plants";

export default async function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-cyan-500 gap-y-4">
      <h1>Home Page</h1>
      <PlantGallery />
    </main>
  );
}
