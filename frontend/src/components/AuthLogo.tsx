import React from "react";
import { tv } from "tailwind-variants";

import Logo from "../assets/logo.svg";

const logoStyles = tv({
  base: "mx-auto mb-6 size-[75px]",
});

const AuthLogo = ({ className, ...props }: React.ComponentProps<"img">) => {
  return (
    <img
      src={Logo}
      alt="Clever Photo Gallery Logo"
      className={logoStyles({ className })}
      {...props}
    />
  );
};

export default AuthLogo;
