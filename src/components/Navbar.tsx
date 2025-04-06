import { Link } from "react-router";
import logo from "../assets/logo.png";
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-primary font-primary text-white">
      <div className="relative px-14 py-3 flex items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="Cinebh logo" className="h-6 w-auto" />
        </Link>
        <div className="flex-1 flex justify-center space-x-3 text-sm">
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
        <button className="bg-primary text-whit text-sm rounded border border-white px-4 py-2">
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
