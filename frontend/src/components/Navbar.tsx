import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";

import { useAuth } from "../context/auth.context";
import { useTheme } from "../hooks/use-theme";
import AuthLogo from "./AuthLogo";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-background/80 sticky top-0 z-10 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:h-[70px] md:px-10">
        <Link to={"/account/photos"}>
          <AuthLogo className="mx-0 mb-0 size-9" />
        </Link>
        <Tooltip id="profile-tooltip" place="bottom" noArrow>
          Click to view profile
        </Tooltip>
        <Tooltip id="photos-tooltip" place="bottom" noArrow>
          Click to view photos
        </Tooltip>
        <Tooltip id="theme-tooltip" place="bottom" noArrow>
          Click to change theme
        </Tooltip>
        <Tooltip id="logout-tooltip" place="bottom" noArrow>
          Click to logout
        </Tooltip>
        <div className="flex items-center gap-2">
          <Button
            data-tooltip-id="photos-tooltip"
            variant="outline"
            size="icon"
            className="size-8"
            asChild
          >
            <Link to={"/account/photos"} className="flex items-center gap-2">
              <Icon icon="lucide:images" className="text-muted-text size-4" />
              <span className="sr-only">Photos</span>
            </Link>
          </Button>
          <Button
            data-tooltip-id="profile-tooltip"
            variant="outline"
            size="icon"
            className="size-8"
            asChild
          >
            <Link to={"/account/"} className="flex items-center gap-2">
              <Icon icon="lucide:user" className="text-muted-text size-4" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <Separator
            orientation="vertical"
            className="hidden data-[orientation=vertical]:h-6 md:block"
          />
          <Button
            data-tooltip-id="theme-tooltip"
            title="Click to change color mode"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Icon icon="lucide:moon" className="text-muted-text size-4" />
            <span className="sr-only">Change Color Mode</span>
          </Button>
          <Button
            data-tooltip-id="logout-tooltip"
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            title="Click to logout"
            variant="outline"
            size="icon"
            className="size-8"
          >
            <Icon icon="lucide:log-out" className="text-muted-text size-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
