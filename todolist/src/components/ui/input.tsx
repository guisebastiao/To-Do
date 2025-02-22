import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [changeType, setChangeType] = React.useState("password");

    const toggleVisibility = () => {
      setChangeType((prevType) => {
        return prevType === "password" ? "text" : "password";
      });
    };

    if (type === "password") {
      return (
        <div className="relative">
          <button
            type="button"
            className="absolute top-0 right-0 px-2 h-8 flex items-center justify-center cursor-pointer"
            onClick={toggleVisibility}
          >
            {changeType === "password" ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
          <input
            type={changeType}
            className={cn(
              "flex h-8 w-full rounded-md border border-input bg-transparent pl-3 pr-8 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-sm",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
