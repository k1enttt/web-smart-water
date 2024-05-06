
import { NavigationButton } from "./navigation-button";

export const NavigationSidebar = () => {
  return (
    <div className="min-w-[250px] space-y-10 p-6">
      <h1>Smart Water</h1>
      <ul className="h-screen w-full space-y-4">
        <li>
          <NavigationButton href="/" label="Home" />
        </li>
        <li>
          <NavigationButton href="/" label="Plants" />
        </li>
      </ul>
    </div>
  );
};
