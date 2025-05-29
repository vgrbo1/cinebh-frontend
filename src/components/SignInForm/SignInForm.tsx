import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { ERROR_CODES } from "../../constants/errorCodes";
import { signIn } from "../../services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import { User } from "../../types/model/User";
import { SignInFormData, signInSchema } from "../../validation/signInSchema";
import { Button } from "../Button/Button";
import { FormInput } from "../Input/FormInput";
interface SignInFormProps {
  setView: (view: "login" | "signup" | "reset") => void;
  setHeading: (heading: string) => void;
  closeDrawer: () => void;
}

export type SignInFormHandle = {
  resetForm: () => void;
};

export const SignInForm = forwardRef<SignInFormHandle, SignInFormProps>(
  ({ setView, setHeading, closeDrawer }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
      if (!loginSuccess) {
        setHeading("Welcome Back");
      }
    }, [loginSuccess, setHeading]);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      reset,
      watch,
    } = useForm<SignInFormData>({
      resolver: zodResolver(signInSchema),
    });

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset();
        setLoginSuccess(false);
        setRememberMe(false);
      },
    }));

    const email = watch("email");
    const password = watch("password");

    const signInMutation = useMutation<
      User,
      AxiosError<{ code: string; message: string }>,
      SignInFormData
    >({
      mutationFn: (data: SignInFormData) =>
        signIn(data.email, data.password, rememberMe),
      onSuccess: (user) => {
        reset();
        setLoginSuccess(true);
        setHeading("Sign In Successful! 🎉");
        useAuthStore.getState().setUser(user);
      },
      onError: (error: any) => {
        if (error?.response?.data?.code === ERROR_CODES.EMAIL_NOT_VERIFIED) {
          setError("email", {
            type: "server",
            message: error.response.data.message,
          });
        } else if (
          error?.response?.data?.code === ERROR_CODES.INVALID_CREDENTIALS
        ) {
          setError("password", {
            type: "server",
            message: "Email or Password that you've entered is incorrect.",
          });
          setError("email", {
            type: "server",
            message: " ",
          });
        } else {
          console.error("Unexpected error:", error);
        }
      },
    });

    const onSubmit = (data: SignInFormData) => {
      signInMutation.mutate(data);
    };

    useEffect(() => {
      if (loginSuccess) {
        const timer = setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [loginSuccess]);

    return (
      <div className="w-full max-w-[400px]">
        {loginSuccess ? (
          <>
            <p className="text-center text-sm text-customGray2 mb-4">
              Please, wait. You will be directed to the homepage.
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Email"
              type="email"
              placeholder="Email Address"
              prefixIcon={
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={clsx("transition", {
                    "text-customLightRed": errors.email,
                    "text-secondary": email && !errors.email,
                    "text-customDarkCyanBlue": !email && !errors.email,
                  })}
                />
              }
              error={errors.email?.message}
              {...register("email")}
            />
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              prefixIcon={
                <FontAwesomeIcon
                  icon={faLock}
                  className={clsx("transition", {
                    "text-customLightRed": errors.password,
                    "text-secondary": password && !errors.password,
                    "text-customDarkCyanBlue": !password && !errors.password,
                  })}
                />
              }
              suffixIcon={
                showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )
              }
              onSuffixClick={() => setShowPassword((prev) => !prev)}
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex justify-between items-center font-semibold mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 h-5 bg-transparent w-5 accent-secondary cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-base text-customDarkGray2 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setView("reset")}
                className="text-base text-customDarkGray2 font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              variant="secondary"
              type="submit"
              className="w-full mt-4"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center mt-6 text-base">
              Don't have an account yet?{" "}
              <button
                onClick={() => setView("signup")}
                type="button"
                className="underline font-semibold cursor-pointer"
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center my-6 text-sm">
              <div className="flex-grow border-t border-customDarkGray2"></div>
              <span className="mx-4">or</span>
              <div className="flex-grow border-t border-customDarkGray2"></div>
            </div>

            <div className="text-center text-base font-semibold">
              <button
                type="button"
                className="underline cursor-pointer"
                onClick={closeDrawer}
              >
                Continue without Signing In
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
);
