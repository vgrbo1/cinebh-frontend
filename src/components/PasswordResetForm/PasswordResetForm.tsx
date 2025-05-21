import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { StepEmail } from "./StepEmail";
import { StepNewPassword } from "./StepNewPassword";
import { StepSuccess } from "./StepSuccess";
import { StepVerificationCode } from "./StepVerificationCode";
interface PasswordResetFormProps {
  setHeading: (heading: string) => void;
}

export type PasswordResetHandle = {
  resetForm: () => void;
};

export const PassworResetForm = forwardRef<
  PasswordResetHandle,
  PasswordResetFormProps
>(({ setHeading }, ref) => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("email@example.com");
  const [code, setCode] = useState<string>("");
  const [verificationCodeError, setVerificationCodeError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (step === 4) {
      setHeading("Password Reset Successful! 🎉");
    } else {
      setHeading("Reset Password");
    }
  }, [step, setHeading]);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setStep(1);
      setEmail("email@example.com");
      setCode("");
      setVerificationCodeError(null);
    },
  }));

  return (
    <div className="w-full max-w-[400px]">
      {step === 1 && <StepEmail setStep={setStep} setEmail={setEmail} />}
      {step === 2 && (
        <StepVerificationCode
          email={email}
          setStep={setStep}
          setCode={setCode}
          setVerificationCodeError={setVerificationCodeError}
          verificationCodeError={verificationCodeError}
        />
      )}
      {step === 3 && (
        <StepNewPassword
          setStep={setStep}
          code={code}
          setVerificationCodeError={setVerificationCodeError}
        />
      )}
      {step === 4 && <StepSuccess setStep={setStep} />}
    </div>
  );
});
