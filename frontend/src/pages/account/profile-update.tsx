import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import { useTitle } from "react-use";
import type { User } from "../../types";
import type { SubmitHandler } from "react-hook-form";

import PageHeader from "../../components/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/auth.context";
import { UpdateProfileSchema } from "../../helpers/validators";

const ProfileUpdatePage = () => {
  const pageTitle = "Update Profile";
  // Set page title
  useTitle(pageTitle);
  // Set up state for loading and user
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ first_name: string; last_name: string }>({
    defaultValues: user || {},
    resolver: yupResolver(UpdateProfileSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<Partial<User>> = async (data) => {
    setIsLoading(true);
    // Call the updateProfile function from auth context
    await updateProfile(data);
    // If update is successful, redirect to account photos

    setIsLoading(false);
  };

  return (
    <div className="py-10">
      <div className="mb-10 flex items-center gap-3">
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full md:max-w-sm" noValidate>
        <fieldset disabled={isLoading} className="grid grid-cols-1 gap-6">
          <legend className="sr-only">Update your profile</legend>
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              {...register("first_name")}
              id="firstName"
              name="first_name"
              type="text"
              placeholder="Jane"
              required
            />
            {errors.first_name?.message && (
              <p className="text-destructive text-sm">{errors.first_name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              {...register("last_name")}
              id="lastName"
              name="last_name"
              type="text"
              placeholder="Doe"
              required
            />
            {errors.last_name?.message && (
              <p className="text-destructive text-sm">{errors.last_name.message}</p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              disabled={isLoading || !!Object.keys(errors).length}
            >
              {isLoading ? "Updating profile..." : "Update profile"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
