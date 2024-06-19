
import { NavigationButton } from "./navigation-button";
import { cn } from "@/lib/utils";

export const NavigationSidebar = ({className} : {className?: string}) => {
  className = className || "";
  return (
    <div className={cn("min-w-[200px] space-y-10 p-6", className)}>
      <h1>Smart Water</h1>
      <ul className="h-screen w-full space-y-4">
        <li>
          <NavigationButton href="/" label="Trang chủ" />
        </li>
        <li>
          <NavigationButton href="/activity-logs" label="Nhật ký hoạt động" />
        </li>
      </ul>
    </div>
  );
};
