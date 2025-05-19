import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo.png";
import { AuthView } from "../Layout/Layout";
import { PassworResetForm } from "../PasswordResetForm/PasswordResetForm";
import { SignUpForm, SignUpFormHandle } from "../SignUpForm/SignUpForm";

interface AuthDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  view: AuthView;
  setView: (view: AuthView) => void;
}

export const AuthDrawer: React.FC<AuthDrawerProps> = ({
  isOpen,
  view,
  setView,
  setIsOpen,
}) => {
  const [heading, setHeading] = useState<string>("Welcome Back");
  useEffect(() => {
    const defaultHeadings: Record<AuthView, string> = {
      login: "Welcome Back",
      signup: "Hello",
      reset: "Reset Password",
    };
    setHeading(defaultHeadings[view]);
  }, [view]);

  const signupRef = useRef<SignUpFormHandle>(null);

  const onClose = () => {
    setIsOpen(false);
    if (view === "signup") {
      signupRef.current?.resetForm();
    }
    setView("login");
  };

  return (
    <div
      className={clsx(
        "fixed top-20 right-0 h-full w-full sm:w-lg bg-primary shadow-lg transform transition-transform duration-300 z-50",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        }
      )}
    >
      <div className="w-full h-full flex flex-col items-center text-white px-4 py-8 font-primary">
        <div className="w-full max-w-[400px] mt-8 mb-8 flex justify-center">
          <img src={logo} alt="Cinebh" className="h-8" />
        </div>
        <div className="relative w-full max-w-[400px] mb-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-0 top-1 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-customGray2 text-xl p-2 bg-customDarkCyanBlue rounded-md"
            />
          </button>

          <h2 className="text-2xl font-bold text-customGray2 text-center">
            {heading}
          </h2>
        </div>
        {view === "signup" && (
          <SignUpForm
            setView={setView}
            setHeading={setHeading}
            closeDrawer={onClose}
          />
        )}
        {view === "reset" && <PassworResetForm setHeading={setHeading} />}
      </div>
    </div>
  );
};
