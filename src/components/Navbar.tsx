import { Link } from "react-router";
import logo from "../assets/logo.png";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-primary font-primary text-white text-base">
      <div className="px-24 py-4 flex items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="Cinebh logo" className="h-8 w-auto" />
        </Link>
        <div className="flex-1 flex justify-center space-x-6 text-sm">
          <Link to={"/"} className="hover:underline">
            Currently Showing
          </Link>
          <Link to={"/"} className="hover:underline">
            Upcoming Movies
          </Link>
          <Link to={"/"} className="hover:underline">
            Venues
          </Link>
        </div>
        <button className="bg-primary h-12 text-white rounded border border-white px-4 py-2">
          Sign In
        </button>
      </div>
    </nav>
  );
}
