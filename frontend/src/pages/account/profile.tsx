import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import { useTitle } from "react-use";

import PageHeader from "../../components/PageHeader";
import PhotoDetailItem from "../../components/Photo/PhotoDetailItem";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/auth.context";

const ProfilePage = () => {
  const pageTitle = "Profile";
  useTitle(pageTitle);
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            data-tooltip-id="go-back-to-all-photos"
            onClick={() => navigate(-1)}
            className="size-7"
            variant="outline"
            size="icon"
          >
            <Icon icon="lucide:arrow-left" className="text-muted-text size-4" />
            <span className="sr-only">Go back</span>
          </Button>
          <Tooltip place="bottom" noArrow id="go-back-to-all-photos">
            Go back
          </Tooltip>
          <PageHeader>{pageTitle}</PageHeader>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="h-8 text-sm font-normal">
            <Link to="/account/update">
              <span>Update Profile</span>
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="h-8 text-sm font-normal">
            <Link to="/account/update-password">
              <span>Update Password</span>
            </Link>
          </Button>
        </div>
      </div>
      <dl className="mt-10 flex w-full max-w-lg flex-col divide-y md:ml-10">
        <PhotoDetailItem label="First name" value={user?.first_name} />
        <PhotoDetailItem label="Last name" value={user?.last_name} />
        <PhotoDetailItem label="Email" value={user?.email} />
        <PhotoDetailItem label="Username" value={user?.username} />
      </dl>
    </div>
  );
};

export default ProfilePage;
