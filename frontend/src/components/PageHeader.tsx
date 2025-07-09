import React from "react";
import { tv } from "tailwind-variants";

const styles = tv({
  base: "text-xl font-bold",
});
const PageHeader = ({ children, className }: React.ComponentProps<"h1">) => {
  return <h1 className={styles({ className })}>{children}</h1>;
};

export default PageHeader;
