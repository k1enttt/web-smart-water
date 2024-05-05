import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NavigationButton = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  return (
    <Button variant="ghost" className="w-full p-4" asChild>
      <Link className="" href={href}>
        <span className="w-full flex items-start">{label}</span>
      </Link>
    </Button>
  );
};
