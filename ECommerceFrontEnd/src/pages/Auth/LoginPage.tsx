import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/kisspng-online-shopping-shopping-cart-logo-e-commerce-market-5ab886d637a728.195706121522042582228.png";
import { ChangeEvent, useState } from "react";
import { LOGIN_FORM_INPUTS } from "@/data";
import { useLoginMutation } from "@/app/auth/AuthApiSlice";
import { ILogin } from "@/interfaces";
import { Loader2 } from "lucide-react";
import CookieService from "@/services/CookieService";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginPage = () => {
  const defaultLoginData = {
    email: "",
    password: "",
  };
  // States
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<ILogin>(defaultLoginData);
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<ILogin> = async () => {
    try {
      const response = await login(loginData).unwrap();
      console.log(response);
      const date = new Date();

      const IN_DAYS = 3;
      const EXPIRES_AT = 1000 * 60 * 60 * 24 * IN_DAYS;

      date.setTime(date.getTime() + EXPIRES_AT);
      const options = { path: "/", expires: date };
      CookieService.set("token", response.token, options);
      navigate(-1);
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };
  // Handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  // Renders
  const renderLoginForm = LOGIN_FORM_INPUTS.map(
    ({ name, type, placeholder }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name as keyof ILogin)}
            name={name}
            onChange={handleInputChange}
          />
          {errors[name as keyof ILogin] && (
            <p className="text-red-500 text-sm">
              {errors[name as keyof ILogin]?.message}
            </p>
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
              <Link to="/">
                <img
                  src={logoImage}
                  alt={"logo"}
                  className="mb-7 h-10 w-auto"
                />
              </Link>
              <p className="mb-2 text-2xl font-bold">Login Here!</p>
              <p className="text-muted-foreground">Welcome back</p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                {renderLoginForm}
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-muted-foreground"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
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
                    "Log in"
                  )}
                </Button>
              </form>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Don't have an account?</p>
                <Link to="/register" className="font-medium text-primary">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
