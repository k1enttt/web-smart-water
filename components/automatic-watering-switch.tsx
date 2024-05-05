import { Switch } from "@/components/ui/switch"

export const AutomaticWateringSwitch = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <div>
                Automatic watering
            </div>
            <Switch />
        </div>
    )
}