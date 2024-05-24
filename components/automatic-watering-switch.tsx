import { Switch } from "@/components/ui/switch"
import { dbRef, updateAutomaticSwitchState } from "@/lib/plants";
import { Plant } from "@/schemas";
import { child, off, onValue } from "firebase/database";
import { useEffect, useState, useTransition } from "react";

export const AutomaticWateringSwitch = (plant: Plant) => {
    const [isPending, startTransition] = useTransition();
    const [buttonState, setButtonState] = useState(plant.is_automatic || false);
    const handleSwitch = async () => {
        const updatedState = !buttonState;
        setButtonState(updatedState);
        // Update database
        startTransition(async () => {
            await updateAutomaticSwitchState(plant.id, updatedState);
        });
    };
    useEffect(() => {
        const plantsRef = child(dbRef, `plants/${plant.id}/is_automatic`);
        onValue(plantsRef, (snapshot) => {
            const data = snapshot.val() as boolean;
            setButtonState(data);
        });
        return () => off(plantsRef);
    }, [buttonState]);

    return (
        <div className="w-full flex items-center px-16 space-x-6">
            <div>
                Automatic watering
            </div>
            <Switch 
                checked={buttonState}
                onCheckedChange={handleSwitch}/>
        </div>
    )
}