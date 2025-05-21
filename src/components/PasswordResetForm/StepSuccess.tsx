import { useEffect } from "react";
import { useNavigate } from "react-router";
interface StepSuccessProps {
  setStep: (step: number) => void;
}
export function StepSuccess({ setStep }: StepSuccessProps) {
  const navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation("/");
      setStep(1);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <p className="text-center text-sm text-customGray2 mb-4">
      Please, wait. You will be directed to the homepage.
    </p>
  );
}
