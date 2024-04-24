import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Poppins({
    weight: "600",
    subsets: ["latin"],
});

export const Header = ({ label} : { label: string}) => {
    return (
        <div className={cn(
            "w-full flex items-center justify-center", 
            font.className
        )}>
            {label}
        </div>
    );
}