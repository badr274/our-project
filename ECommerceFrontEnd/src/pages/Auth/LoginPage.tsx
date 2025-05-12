import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/kisspng-online-shopping-shopping-cart-logo-e-commerce-market-5ab886d637a728.195706121522042582228.png";
// import { ChangeEvent, FormEvent, useState } from "react";
import { LOGIN_FORM_INPUTS } from "@/data";
import { useLoginMutation } from "@/app/auth/AuthApiSlice";
import { ILogin } from "@/interfaces";
import { Loader2 } from "lucide-react";
import CookieService from "@/services/CookieService";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useGetCartProductsQuery } from "@/app/services/CartSlice";
const LoginPage = () => {
  const token = CookieService.get("token");
  const { refetch } = useGetCartProductsQuery(undefined, {
    skip: !token,
  });

  // States
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<ILogin> = async (loginData) => {
    try {
      const res = await login(loginData).unwrap();
      console.log(res);
      const date = new Date();
      const IN_DAYS = 1;
      const EXPIRES_AT = 1000 * 60 * 60 * 24 * IN_DAYS;
      date.setTime(date.getTime() + EXPIRES_AT);
      const options = { path: "/", expires: date };
      CookieService.set("token", res.token, options);
      toast.success("Logined successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      refetch();
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error.status === 401 || error.status === 422)
      ) {
        toast.error("Email or password is incorrect");
      }
    }
  };

  // Handlers
  // Renders
  const renderLoginForm = LOGIN_FORM_INPUTS.map(
    ({ name, type, placeholder }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            name={name}
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
      <div className="container mx-auto">
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
                <Button variant="link" className="font-medium p-0 m-0 h-fit">
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
