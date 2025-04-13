'use server'
import dotenv from "dotenv";
import { Mongoose } from "mongoose";

import { PlantGallery } from "@/components/plant-gallery";
import { Toaster } from "@/components/ui/toaster";
import dbConnect from "@/lib/dbConnect";
import { getPlantUnits } from "@/lib/plant-unit";
import { PlantUnits } from "@/models/PlantUnit";
import PlantUnitModel from "@/models/PlantUnit";

dotenv.config();

export default async function Home() {
  listenOnPlantUnit();
  const plantList = (await getPlantUnits()) as PlantUnits[];

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

const listenOnPlantUnit = async () => {
  // Listen on change of PlantUnit collection
  const client = await dbConnect();
  try {
    // open a Change Stream on the "messages" collection
    const changeStream = PlantUnitModel.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", (next) => {
      // process any change event
      switch (next.operationType) {
        case "update":
          const change = {
            id: next.documentKey._id || "Id not found",
            automation_watering:
              next.updateDescription.updatedFields.automatic_watering,
          }
          io.emitEvent("automatic_watering", change);
          console.log(change);
      }
    });
  } catch (error) {
    // Ensures that the client will close when you error
    if (client instanceof Mongoose) {
      await client.connection.close();
    }
    console.error(error);
  }
};