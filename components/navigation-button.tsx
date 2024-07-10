'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const NavigationButton = ({
  href,
  label,
  isActive = false
}: {
  href: string;
  label: string;
  isActive?: boolean;
}) => {
  const [buttonState, setButtonState] = useState(isActive);
  return (
    <Button 
      onSelect={() => setButtonState(!buttonState)}
      variant="ghost" 
      className={`w-full p-4` + (buttonState ? "bg-primary text-primary-foreground" : "")}
      asChild
      >
      <Link className="" href={href}>
        <span className="w-full flex items-start">{label}</span>
      </Link>
    </Button>
  );
};
