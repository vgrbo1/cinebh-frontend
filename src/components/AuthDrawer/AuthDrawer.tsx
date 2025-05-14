import React from "react";

type AuthView = "login" | "signup" | "reset";

interface AuthDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  view: AuthView;
  setView: (view: AuthView) => void;
}

const AuthDrawer: React.FC<AuthDrawerProps> = ({ isOpen, view, setView }) => {
  return (
    <div
      className={`fixed top-20 right-0 h-full w-lg bg-primary shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    ></div>
  );
};

export default AuthDrawer;
