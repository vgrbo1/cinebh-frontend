import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { ERROR_CODES } from "../../constants/errorCodes";
import { sendResetEmail } from "../../services/authService";
import {
  StepEmailData,
  stepEmailSchema,
} from "../../validation/stepEmailSchema";
import { Button } from "../Button/Button";
import { FormInput } from "../Input/FormInput";

interface StepEmailProps {
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
}

export function StepEmail({ setStep, setEmail }: StepEmailProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm<StepEmailData>({
    resolver: zodResolver(stepEmailSchema),
  });

  const email = watch("email");
  const sendResetEmailMutation = useMutation({
    mutationFn: (data: StepEmailData) => sendResetEmail(data.email),
    onSuccess: () => {
      setEmail(email);
      reset();
      setStep(2);
    },
    onError: (error: any) => {
      if (error.response?.data?.code === ERROR_CODES.RESEND_LIMIT) {
        setError("email", {
          type: "server",
          message: error.response.data.message,
        });
      }
    },
  });

  const onSubmit = (data: StepEmailData) => sendResetEmailMutation.mutate(data);

  return (
    <>
      <p className="text-center text-sm text-customGray2 mb-4">
        Provide your account's email for which <br />
        you want to reset your password.
      </p>
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
        <Button variant="secondary" type="submit" className="w-full mt-4">
          Continue
        </Button>
      </form>
    </>
  );
}
