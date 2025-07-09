import { useGSAP } from "@gsap/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useTitle } from "react-use";
import type { RegisterData } from "../../types";
import type { SubmitHandler } from "react-hook-form";

import AuthLogo from "../../components/AuthLogo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/auth.context";
import { RegisterSchema } from "../../helpers/validators";

gsap.registerPlugin(useGSAP);

const SignUpPage = () => {
  const pageTitle = "Create your account";
  const navigate = useNavigate();

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const [inputType, setInputType] = useState("password");

  const { register: registerUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(RegisterSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    setIsLoading(true);
    // Call the register function from auth context
    const registered = await registerUser(data);
    // Redirect to login page after successful registration
    if (registered) navigate("/");
    setIsLoading(false);
  };
  // Memoized animation setup
  useGSAP(() => {
    if (!containerRef.current || !logoRef.current) return;

    const children = Array.from(containerRef.current.children).filter(
      (child) => child !== logoRef.current
    );

    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    }).from(
      children,
      {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.2"
    );

    return () => tl.kill(); // Cleanup on unmount
  }, []);

  // Memoize page title setting
  useTitle(pageTitle);

  return (
    <main className="flex min-h-svh items-center justify-center py-20">
      <div
        ref={containerRef}
        className="flex w-full max-w-[370px] flex-col items-center justify-center"
      >
        <AuthLogo ref={logoRef} />
        <h1 className="text-center text-xl font-bold text-pretty capitalize">{pageTitle}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full" noValidate>
          <fieldset disabled={isLoading} className="grid grid-cols-1 gap-6">
            <legend className="sr-only">Create account form</legend>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
              {errors.username?.message && (
                <p className="text-destructive text-sm">{errors.username.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              {errors.email?.message && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  name="password"
                  type={inputType}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setInputType((prev) => (prev === "password" ? "text" : "password"))
                  }
                >
                  <Icon
                    icon={inputType === "password" ? "lucide:eye" : "lucide:eye-off"}
                    className="text-muted-text size-5"
                  />
                </div>
              </div>
              {errors.password?.message && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  {...register("password_confirm")}
                  id="confirmPassword"
                  name="password_confirm"
                  type={inputType}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <div
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setInputType((prev) => (prev === "password" ? "text" : "password"))
                  }
                >
                  <Icon
                    icon={inputType === "password" ? "lucide:eye" : "lucide:eye-off"}
                    className="text-muted-text size-5"
                  />
                </div>
              </div>
              {errors.password_confirm?.message && (
                <p className="text-destructive text-sm">{errors.password_confirm.message}</p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                disabled={isLoading || !!Object.keys(errors).length}
              >
                {isLoading ? "Creating account..." : "Create an account"}
              </Button>
            </div>
          </fieldset>
        </form>

        <p className="text-muted-foreground mt-10 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-primary hover:underline focus:underline focus:outline-none"
            tabIndex={isLoading ? -1 : 0}
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
