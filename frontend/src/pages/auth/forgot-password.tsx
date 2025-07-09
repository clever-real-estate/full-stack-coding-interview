import { useGSAP } from "@gsap/react";
import { yupResolver } from "@hookform/resolvers/yup";
import gsap from "gsap";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useTitle } from "react-use";
import type { ForgotPassword } from "../../types";
import type { SubmitHandler } from "react-hook-form";

import AuthLogo from "../../components/AuthLogo";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../context/auth.context";
import { ForgotPasswordSchema } from "../../helpers/validators";

gsap.registerPlugin(useGSAP);

const ForgotPasswordPage = () => {
  const pageTitle = "Forgot Password";
  // Set page title
  useTitle(pageTitle);

  const navigate = useNavigate();

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  // State used to track loading state
  const [isLoading, setIsLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ForgotPassword> = async (data) => {
    setIsLoading(true);
    const sent = await forgotPassword(data);
    if (sent) {
      setIsLoading(false);
      navigate("/", { replace: true });
    }
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

  return (
    <main className="flex min-h-svh items-center justify-center py-20">
      <div
        ref={containerRef}
        className="flex w-full max-w-[330px] flex-col items-center justify-center"
      >
        <AuthLogo ref={logoRef} />
        <h1 className="text-center text-xl font-bold text-pretty capitalize">{pageTitle}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full" noValidate>
          <fieldset disabled={isLoading} className="grid grid-cols-1 gap-6">
            <legend className="sr-only">Forgot Password form</legend>

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

            <div>
              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                disabled={isLoading || !!Object.keys(errors).length}
              >
                {isLoading ? "Sending request..." : "Send request"}
              </Button>
            </div>
          </fieldset>
        </form>

        <p className="text-muted-foreground mt-10 text-center">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-primary hover:underline focus:underline focus:outline-none"
            tabIndex={isLoading ? -1 : 0}
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
