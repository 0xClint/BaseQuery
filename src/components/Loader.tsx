import React from "react";
import Star3 from "./stars/Star3";
import Star2 from "./stars/Star2";
import Star1 from "./stars/Star1";
import { cn } from "@/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("", className)}>
      <span className="w-full h-full flex-center gap-4">
        <Star1
          className="text-main dark:text-blue-500 animate-[spin_2s_linear_infinite]"
          size={150}
          stroke="black"
          strokeWidth={2}
        />
        <Star2
          className="text-main dark:text-blue-500 animate-[spin_2s_linear_infinite]"
          size={150}
          stroke="black"
          strokeWidth={2}
        />
        <Star3
          className="text-main dark:text-blue-500 animate-[spin_2s_linear_infinite]"
          size={150}
          stroke="black"
          strokeWidth={2}
        />
      </span>
    </div>
  );
}
