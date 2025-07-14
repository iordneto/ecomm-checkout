import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  isValid?: boolean;
  isInvalid?: boolean;
}

function Input({ className, type, isValid, isInvalid, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:rounded-b-none",
          (isValid || isInvalid) && "pr-10",
          className
        )}
        {...props}
      />
      {isValid && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <CheckIcon
            className="bg-[#00C87B] text-white rounded-full p-1 stroke-[3.5px]"
            size={20}
          />
        </div>
      )}
      {isInvalid && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <XIcon
            className="bg-destructive text-white rounded-full p-1 stroke-[3.5px]"
            size={20}
          />
        </div>
      )}
    </div>
  );
}

export { Input };
