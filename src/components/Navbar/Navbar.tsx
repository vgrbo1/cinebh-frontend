import { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "../Button/Button";

type NavbarProps = {
  onToggleLogin: () => void;
};

export function Navbar({ onToggleLogin }: NavbarProps) {
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary font-primary text-white text-base">
      <div className="px-24 py-4 flex items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="Cinebh logo" className="h-8 w-auto" />
        </Link>
        <div className="flex-1 flex justify-center space-x-6 text-base">
          <Link to={"/currently-showing"} className="hover:underline">
            Currently Showing
          </Link>
          <Link to={"/upcoming-movies"} className="hover:underline">
            Upcoming Movies
          </Link>
        </div>
        {user ? (
          <div className="relative">
            <Button
              variant="primary"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user?.email.split("@")[0]}
            </Button>
            {showDropdown && (
              <div className="absolute bg-primary right-0 mt-2 w-48 py-2 rounded-md shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 text-white  hover:bg-customDarkCyanBlue cursor-pointer transition duration-150"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button variant="primary" onClick={onToggleLogin}>
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}
