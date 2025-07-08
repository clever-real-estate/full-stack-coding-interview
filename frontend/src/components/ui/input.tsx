import React from "react";
import { tv } from "tailwind-variants";

const inputStyles = tv({
  base: [
    "placeholder:text-muted-text selection:bg-primary selection:text-primary-text dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
});

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={inputStyles({ className })} {...props} />;
}

export { Input };
