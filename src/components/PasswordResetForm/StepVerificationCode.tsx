import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import {
  createRef,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { ERROR_CODES } from "../../constants/errorCodes";
import { sendResetEmail } from "../../services/authService";
import { Button } from "../Button/Button";

interface StepVerificationCodeProps {
  email: string;
  setStep: (step: number) => void;
  setCode: (code: string) => void;
  setVerificationCodeError: (error: string | null) => void;
  verificationCodeError: string | null;
}

export interface StepVerificationCodeHandle {
  resetForm: () => void;
}

export function StepVerificationCode({
  email,
  setStep,
  setCode,
  setVerificationCodeError,
  verificationCodeError,
}: StepVerificationCodeProps) {
  const [localPart, domain] = email.split("@");
  const visibleChar = localPart[0];
  const maskedPart = "*".repeat(Math.max(localPart.length - 1, 1));
  const hiddenEmail = `${visibleChar}${maskedPart}@${domain}`;

  const [codeDigits, setCodeDigits] = useState<string[]>(Array(6).fill(""));
  const [resendTimeout, setResendTimeout] = useState<number>(0);

  const inputRefs = useRef<RefObject<HTMLInputElement | null>[]>(
    Array(6)
      .fill(0)
      .map(() => createRef<HTMLInputElement>())
  );

  useEffect(() => {
    if (resendTimeout <= 0) return;

    const timer = setTimeout(() => {
      setResendTimeout((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimeout]);

  const resendCodeMutation = useMutation({
    mutationFn: () => sendResetEmail(email),
    onSuccess: () => {
      setVerificationCodeError(null);
      setCodeDigits(Array(6).fill(""));
      setCode("");
      setResendTimeout(10);
    },
    onError: (error: any) => {
      if (error.response?.data?.code === ERROR_CODES.RESEND_LIMIT) {
        setVerificationCodeError(error.response.data.message);
      }
    },
  });

  const handleResendCode = () => {
    if (resendTimeout > 0) return;
    resendCodeMutation.mutate();
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newCodeDigits = [...codeDigits];
    newCodeDigits[index] = value;
    setCodeDigits(newCodeDigits);
    setCode(newCodeDigits.join(""));

    if (value && index < 3) {
      inputRefs.current[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.replace(/[^\d]/g, "").slice(0, 6);

    if (pastedNumbers) {
      const newCodeDigits = [...codeDigits];
      for (let i = 0; i < pastedNumbers.length; i++) {
        if (i < 4) newCodeDigits[i] = pastedNumbers[i];
      }
      setCodeDigits(newCodeDigits);
      setCode(newCodeDigits.join(""));

      const nextEmptyIndex = newCodeDigits.findIndex((digit) => !digit);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.current?.focus();
      } else {
        inputRefs.current[3]?.current?.focus();
      }
    }
  };

  return (
    <>
      <p className="text-center text-sm text-customGray2 mb-4">
        We have sent code to your email {hiddenEmail}. <br />
        Please, enter the code below to verify.
      </p>
      <form>
        <div className="flex justify-center gap-4 mb-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={inputRefs.current[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={codeDigits[index]}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-16 bg-customDarkCyanBlue font-bold text-px-40 text-center border border-customGray rounded-2xl focus:outline-none focus:border-4"
            />
          ))}
        </div>
        {verificationCodeError && (
          <p className="text-customLightRed text-sm text-center mt-2 mb-2">
            {verificationCodeError}
          </p>
        )}
        <p className="text-center text-sm text-customDarkGray2 mb-4">
          Didn't receive email?
        </p>
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendTimeout > 0 || resendCodeMutation.isPending}
            className={`text-sm text-customDarkGray2 ${clsx(
              "text-sm text-customDarkGray2",
              {
                "cursor-not-allowed":
                  resendTimeout > 0 || resendCodeMutation.isPending,
                "hover:underline": !(
                  resendTimeout > 0 || resendCodeMutation.isPending
                ),
              }
            )}`}
          >
            {resendTimeout > 0 ? (
              <>
                You can resend email in{" "}
                <span className="text-white">{resendTimeout}</span> seconds
              </>
            ) : resendCodeMutation.isPending ? (
              "Sending..."
            ) : (
              "Resend code"
            )}
          </button>
        </div>
        <Button
          variant="secondary"
          type="button"
          className="w-full mt-4"
          onClick={() => {
            const code = codeDigits.join("");
            if (code.length < 4) {
              setVerificationCodeError("Please enter a valid code.");
              return;
            }
            setVerificationCodeError(null);
            setStep(3);
          }}
        >
          Continue
        </Button>
      </form>
    </>
  );
}
