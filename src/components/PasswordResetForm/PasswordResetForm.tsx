import { forwardRef, useEffect, useState } from "react";
import { StepEmail } from "./StepEmail";
import { StepNewPassword } from "./StepNewPassword";
import { StepVerificationCode } from "./StepVerificationCode";
interface PasswordResetFormProps {
  setHeading: (heading: string) => void;
}
export type PassworResetFormHandle = {
  resetForm: () => void;
};

export const PassworResetForm = forwardRef<
  PassworResetFormHandle,
  PasswordResetFormProps
>(({ setHeading }, ref) => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    if (step === 4) {
      setHeading("Password Reset Successful! 🎉");
    }
  }, [step, setHeading]);

  return (
    <div className="w-full max-w-[400px]">
      {step === 1 && <StepEmail setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <StepVerificationCode email={email} setStep={setStep} setCode={setCode} />}
      {step === 3 && <StepNewPassword setStep={setStep} code={code} />}
    </div>
  );
});
