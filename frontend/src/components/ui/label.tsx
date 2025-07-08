import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { tv } from "tailwind-variants";

const labelStyles = tv({
  base: [
    "text-text flex cursor-pointer items-center gap-2 text-sm leading-none font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ],
});

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root data-slot="label" className={labelStyles({ className })} {...props} />
  );
}

export { Label };
