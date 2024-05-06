import { PlantGallery } from "@/components/plant-gallery";

export default async function Home() {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-start bg-cyan-500 gap-y-4 py-6 overflow-y-auto">
      <PlantGallery />
    </main>
  );
}
