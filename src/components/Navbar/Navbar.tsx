import { Link } from "react-router";
import logo from "../../assets/logo.png";

type NavbarProps = {
  onToggleLogin: () => void;
};

export function Navbar({ onToggleLogin }: NavbarProps) {
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
        <button
          onClick={onToggleLogin}
          className="bg-primary h-12 text-white rounded-lg border font-semibold border-white px-5 py-3"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}
