import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import { useTitle } from "react-use";
import type { ChangePasswordData } from "../../types";
import type { SubmitHandler } from "react-hook-form";

import PageHeader from "../../components/PageHeader";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/auth.context";
import { ChangePasswordSchema } from "../../helpers/validators";

const PasswordUpdatePage = () => {
  const pageTitle = "Update Password";
  useTitle(pageTitle);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword } = useAuth();
  const [inputType, setInputType] = useState("password");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
    setIsLoading(true);
    const updated = await changePassword(data);
    // reset form fields
    if (updated) reset();
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
          <legend className="sr-only">Update your password</legend>

          <div className="flex flex-col gap-2">
            <Label htmlFor="old_password">Current Password</Label>

            <div className="relative">
              <Input
                {...register("old_password")}
                id="old_password"
                name="old_password"
                type={inputType}
                placeholder="••••••••"
                required
              />
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setInputType((prev) => (prev === "password" ? "text" : "password"))}
              >
                <Icon
                  icon={inputType === "password" ? "lucide:eye" : "lucide:eye-off"}
                  className="text-muted-text size-5"
                />
              </div>
            </div>
            {errors.old_password?.message && (
              <p className="text-destructive text-sm">{errors.old_password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="new_password">New Password</Label>

            <div className="relative">
              <Input
                {...register("new_password")}
                id="new_password"
                name="new_password"
                type={inputType}
                placeholder="••••••••"
                required
              />
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() => setInputType((prev) => (prev === "password" ? "text" : "password"))}
              >
                <Icon
                  icon={inputType === "password" ? "lucide:eye" : "lucide:eye-off"}
                  className="text-muted-text size-5"
                />
              </div>
            </div>
            {errors.new_password?.message && (
              <p className="text-destructive text-sm">{errors.new_password.message}</p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              disabled={isLoading || !!Object.keys(errors).length}
            >
              {isLoading ? "Updating password..." : "Update password"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PasswordUpdatePage;
