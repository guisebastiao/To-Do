import { ButtonHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ButtonCheckProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isComplete: boolean;
}

export const ButtonCheck = ({ isComplete, ...props }: ButtonCheckProps) => {
  return (
    <button
      {...props}
      className="w-5 h-5 aspect-square rounded-full cursor-pointer"
    >
      <div
        className={twMerge(
          "w-full h-full flex items-center justify-center rounded-full transition-all duration-300",
          isComplete
            ? "border-2 border-blue-600 bg-blue-600 "
            : "border-2 border-zinc-600"
        )}
      >
        <Check
          className={twMerge(
            "size-3 stroke-[4px] transition-all duration-300",
            isComplete ? "stroke-background" : "stroke-zinc-600"
          )}
        />
      </div>
    </button>
  );
};
