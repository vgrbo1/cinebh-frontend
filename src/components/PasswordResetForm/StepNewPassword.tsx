import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../../services/authService";
import {
  StepNewPasswordData,
  stepNewPasswordSchema,
} from "../../validation/stepNewPassword";
import { Button } from "../Button/Button";
import { FormInput } from "../Input/FormInput";

interface StepPasswordProps {
  setStep: (step: number) => void;
  code: string;
  setVerificationCodeError: (error: string | null) => void;
}

interface ChangePasswordMutationInput {
  data: StepNewPasswordData;
  code: string;
}
export function StepNewPassword({
  setStep,
  code,
  setVerificationCodeError,
}: StepPasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<StepNewPasswordData>({
    resolver: zodResolver(stepNewPasswordSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const changePasswordMutation = useMutation({
    mutationFn: ({ data, code }: ChangePasswordMutationInput) =>
      changePassword(data.password, code),
    onSuccess: () => {
      reset();
      setStep(4);
    },
    onError: () => {
      setVerificationCodeError("Bad verification code");
      setStep(2);
    },
  });

  const onSubmit = (data: StepNewPasswordData) =>
    changePasswordMutation.mutate({ data, code });

  return (
    <>
      <p className="text-center text-sm text-customGray2 mb-4">
        Please, enter and confirm your new <br /> password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
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
          label="Repeat Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Repeat Password"
          prefixIcon={
            <FontAwesomeIcon
              icon={faLock}
              className={clsx("transition", {
                "text-customLightRed": errors.confirmPassword,
                "text-secondary": confirmPassword && !errors.confirmPassword,
                "text-customDarkCyanBlue":
                  !confirmPassword && !errors.confirmPassword,
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
          onSuffixClick={() => setShowConfirmPassword((prev) => !prev)}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          variant="secondary"
          type="submit"
          className="w-full mt-4"
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending
            ? "Reseting your password..."
            : "Continue"}
        </Button>
      </form>
    </>
  );
}
