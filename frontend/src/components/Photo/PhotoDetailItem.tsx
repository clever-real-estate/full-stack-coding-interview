import React from "react";
import { tv } from "tailwind-variants";

const styles = tv({
  base: "p-4 text-sm sm:grid sm:grid-cols-[120px_minmax(0,_1fr)] sm:gap-4 sm:px-0",
});
const PhotoDetailItem = ({
  label,
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  label: string;
  value: string | number | React.ReactNode;
}) => {
  return (
    <div className={styles({ className })} {...props}>
      <dt className="font-semibold">{label}</dt>
      <dd className="text-text/70 mt-1 text-sm sm:mt-0">{value}</dd>
    </div>
  );
};

export default PhotoDetailItem;
