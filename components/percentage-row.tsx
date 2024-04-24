interface PercentageRowProps {
    label: "Humidity" | "Temperature" | "Moisture";
    percentage: number;
}

export const PercentageRow = ({label, percentage} : PercentageRowProps) => {
    return (
        <div className="flex w-full justify-between">
            <div>
                {label}
            </div>
            <div>
                {percentage}
                {label === "Temperature" ? "°C" : "%"}
            </div>
        </div>
    );
}