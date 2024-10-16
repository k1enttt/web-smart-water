import { getPlantById } from "@/lib/plants";
import { PlantCard } from "../plant-card";

export default async function PlantCardWrapper({
  plantId,
}: {
  plantId: string | undefined;
}) {
  if (!plantId) return null;

  const plant = await getPlantById(plantId);

  if (!plant) return null;

  return (
    <div>
      <PlantCard plant={plant} />
    </div>
  );
}
