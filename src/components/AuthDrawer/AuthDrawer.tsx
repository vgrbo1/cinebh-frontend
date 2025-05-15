import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
type AuthView = "login" | "signup" | "reset";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  view: AuthView;
  setView: (view: AuthView) => void;
}

const AuthDrawer: React.FC<AuthDrawerProps> = ({
  isOpen,
  view,
  setView,
  onClose,
}) => {
  const [heading, setHeading] = useState("Welcome Back");
  useEffect(() => {
    const defaultHeadings: Record<AuthView, string> = {
      login: "Welcome Back",
      signup: "Hello",
      reset: "Reset Password",
    };
    setHeading(defaultHeadings[view]);
  }, [view]);

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-full w-full sm:w-lg bg-primary shadow-lg transform transition-transform duration-300 z-50",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        }
      )}
    >
      <div className="w-full h-full flex flex-col items-center text-white px-4 py-8 font-primary">
        <div className="w-full max-w-[400px] mb-8 flex justify-center">
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
      </div>
    </div>
  );
};

export default AuthDrawer;
