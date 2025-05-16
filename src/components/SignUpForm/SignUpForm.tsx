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
import { signUp } from "../../services/authService";
import { SignUpFormData, signUpSchema } from "../../validation/signUpSchema";
import { Button } from "../Button/Button";
import { FormInput } from "../Input/FormInput";
interface SignUpFormProps {
  setView: (view: "login" | "signup" | "reset") => void;
  setHeading: (heading: string) => void;
  closeDrawer: () => void;
}
export type SignUpFormHandle = {
  resetForm: () => void;
};

export const SignUpForm = forwardRef<SignUpFormHandle, SignUpFormProps>(
  ({ setView, setHeading, closeDrawer }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
      useState<boolean>(false);
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

    useEffect(() => {
      if (!signUpSuccess) {
        setHeading("Hello");
      }
    }, [signUpSuccess, setHeading]);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      reset,
      watch,
    } = useForm<SignUpFormData>({
      resolver: zodResolver(signUpSchema),
    });

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset();
        setSignUpSuccess(false);
      },
    }));

    const email = watch("email");
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const mutation = useMutation<
      void,
      AxiosError<{ code: string }>,
      SignUpFormData
    >({
      mutationFn: signUp,
      onSuccess: () => {
        reset();
        setSignUpSuccess(true);
        setHeading("You're all set! 🎉");
      },
      onError: (error: any) => {
        if (error?.response?.data?.code === ERROR_CODES.ENTITY_EXISTS) {
          setError("email", {
            type: "server",
            message: "Email already exists",
          });
        } else {
          console.error("Unexpected error:", error);
        }
      },
    });

    const onSubmit = (data: SignUpFormData) => {
      mutation.mutate(data);
    };

    return (
      <div className="w-full max-w-[400px]">
        {signUpSuccess ? (
          <>
            <p className="text-center text-sm text-customGray2 mb-4">
              A confirmation email has been sent to your inbox.
              <br />
              Start exploring the latest movies, venues,
              <br />
              and ticket options!
            </p>
            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={() => {
                setView("login");
              }}
            >
              Go to Login
            </Button>
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
            <FormInput
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Retype Password"
              prefixIcon={
                <FontAwesomeIcon
                  icon={faLock}
                  className={clsx("transition ", {
                    "text-customLightRed": errors.confirmPassword,
                    "text-secondary":
                      confirmPassword && !errors.confirmPassword,
                    "text-customDarkCyanBlue":
                      !confirmPassword && !errors.confirmPassword,
                  })}
                />
              }
              suffixIcon={
                showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )
              }
              onSuffixClick={() => setShowConfirmPassword((prev) => !prev)}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <Button variant="secondary" type="submit" className="w-full mt-4">
              Sign Up
            </Button>

            <div className="text-center mt-6 text-base">
              Already have an account?{" "}
              <button
                onClick={() => setView("login")}
                type="button"
                className="underline font-semibold cursor-pointer"
              >
                Log In
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
