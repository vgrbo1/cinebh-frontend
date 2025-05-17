import { Button } from "../Button/Button";

interface StepVerificationCodeProps {
  email: string;
  setStep: (step: number) => void;
  setCode: (code: string) => void;
}
export function StepVerificationCode({
  email,
  setStep,
  setCode,
}: StepVerificationCodeProps) {
  const [localPart, domain] = email.split("@");
  const visibleChar = localPart[0];
  const maskedPart = "*".repeat(Math.max(localPart.length - 1, 1));
  email = `${visibleChar}${maskedPart}@${domain}`;
  return (
    <>
      <p className="text-center text-sm text-customGray2 mb-4">
        We have sent code to your email {email}. <br />
        Please, enter the code below to verify.
      </p>
      <form>
        <Button
          variant="secondary"
          type="button"
          className="w-full mt-4"
          onClick={() => setStep(3)}
        >
          Continue
        </Button>
      </form>
    </>
  );
}
