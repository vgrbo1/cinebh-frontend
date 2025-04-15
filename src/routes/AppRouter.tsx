import { Route, Routes } from "react-router";
import { About } from "../pages/About";
import { CurrentlyShowing } from "../pages/CurrentlyShowing";
import { Home } from "../pages/Home";
import { Pricing } from "../pages/Pricing";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tickets" element={<Pricing />} />
      <Route path="/currently-showing" element={<CurrentlyShowing />} />
    </Routes>
  );
}

export default AppRouter;
