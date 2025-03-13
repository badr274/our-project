// import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/kisspng-online-shopping-shopping-cart-logo-e-commerce-market-5ab886d637a728.195706121522042582228.png";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_FORM_INPUTS } from "@/data";
import { ChangeEvent, useState } from "react";
import CookieService from "@/services/CookieService";
import { ISignup } from "@/interfaces";
import { useSignupMutation } from "@/app/auth/AuthApiSlice";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation";

const SignupPage = () => {
  const defaultSignupData = {
    username: "",
    email: "",
    password: "",
  };
  // States
  const navigate = useNavigate();
  const [signUpData, setSignupData] = useState<ISignup>(defaultSignupData);
  const [signUp, { isLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit: SubmitHandler<ISignup> = async () => {
    try {
      const response = await signUp(signUpData).unwrap();
      const date = new Date();
      const IN_DAYS = 3;
      const EXPIRES_AT = 1000 * 60 * 60 * 24 * IN_DAYS;

      date.setTime(date.getTime() + EXPIRES_AT);
      const options = { path: "/", expires: date };
      CookieService.set("token", response.token, options);
      navigate(-1);
    } catch (err) {
      console.error("Signup Failed:", err);
    }
  };

  // Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };
  // Renders
  const renderSignupForm = SIGNUP_FORM_INPUTS.map(
    ({ name, type, placeholder }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            name={name}
            onChange={handleInputChange}
          />
          {errors[name] && (
            <p className="text-red-500 text-sm">{errors[name]?.message}</p>
          )}
        </div>
      );
    }
  );
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <Link to={"/"}>
                <img
                  src={logoImage}
                  alt={"logo image"}
                  className="mb-7 h-10 w-auto"
                />
              </Link>
              <p className="mb-2 text-2xl font-bold">Sign Up</p>
              <p className="text-muted-foreground">Sign Up for free</p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                {renderSignupForm}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <Button variant="outline" className="w-full">
                  {/* <FcGoogle className="mr-2 size-5" /> */}
                  Sign up with Google
                </Button>
              </form>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Already have an account?</p>
                <Link to={"/login"} className="font-medium text-primary">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
