import { useNavigate } from "react-router";
import logo from "../assets/Logo.png";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-primary text-center font-primary px-4">
      <img src={logo} alt="Cinebh logo" className="h-10 mb-6" />
      <h2 className="text-2xl font-bold text-customLightRed mb-2">
        ⚠️ Unauthorized
      </h2>
      <p className="text-customGray2 mb-4">
        You need to be logged in to access this page.
      </p>
      <button
        className="text-secondary underline cursor-pointer"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}
