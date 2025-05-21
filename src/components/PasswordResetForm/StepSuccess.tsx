import { Button } from "../Button/Button";
interface StepSuccessProps {
  setStep: (step: number) => void;
  setView: (view: "login" | "signup" | "reset") => void;
}
export function StepSuccess({ setStep, setView }: StepSuccessProps) {
  return (
    <>
      <p className="text-center text-sm text-customGray2 mb-4">
        You can now login with your new password.
      </p>
      <Button
        variant="secondary"
        className="w-full mt-4"
        onClick={() => {
          setView("login");
          setStep(1);
        }}
      >
        Go to Login
      </Button>
    </>
  );
}
