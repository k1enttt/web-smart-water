import { PlantGallery } from "@/components/plant-gallery";

export default async function Home() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-cyan-500 gap-y-4 overflow-y-auto py-10">
      <PlantGallery />
    </main>
  );
}
