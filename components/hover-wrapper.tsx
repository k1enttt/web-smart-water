import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { child } from "firebase/database";

export const HoverWrapper = ({ children, message = '' }: { children: React.ReactNode, message: string }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        {message}
      </HoverCardContent>
    </HoverCard>
  );
};
