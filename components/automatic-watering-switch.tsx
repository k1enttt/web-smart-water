import { Switch } from "@/components/ui/switch"

export const AutomaticWateringSwitch = () => {
    return (
        <div className="w-full flex items-center px-16 space-x-6">
            <div>
                Automatic watering
            </div>
            <Switch />
        </div>
    )
}