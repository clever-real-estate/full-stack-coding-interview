import { Icon } from "@iconify/react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import * as React from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "focus-visible:border-primary focus-visible:ring-primary/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  variants: {
    variant: {
      default: "bg-primary text-primary-text hover:bg-primary/90",
      destructive:
        "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs",
      outline:
        "bg-background dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
      ghost: "hover:bg-muted/20 dark:hover:bg-muted/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-11 px-4 py-2 has-[>svg]:px-3",
      sm: "h-10 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-11",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp data-slot="button" className={buttonVariants({ variant, size, className })} {...props}>
      {loading && <Icon icon="lucide:loader-circle" className="animate-spin" />}
      <Slottable>{props.children}</Slottable>
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
