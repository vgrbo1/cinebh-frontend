import { Link } from "react-router";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1A1A1A] to-secondary text-white font-primary text-center px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <img src={logo} alt="Cinebh logo" className="h-6 w-auto" />
        <div className="space-x-3 text-xs font-bold">
          <Link to="/about" className="hover:underline">
            ABOUT
          </Link>
          <span className="text-white">|</span>
          <Link to="/tickets" className="hover:underline">
            TICKETS
          </Link>
        </div>
        <p className="text-sm text-white font-normal">
          Copyright @Cinebh. Built with love in Sarajevo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
