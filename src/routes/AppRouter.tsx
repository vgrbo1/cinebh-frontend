import { Route, Routes } from "react-router";
import { About } from "../pages/About";
import { CurrentlyShowing } from "../pages/CurrentlyShowing";
import { Home } from "../pages/Home";
import { Pricing } from "../pages/Pricing";
import { UpcomingMovies } from "../pages/UpcomingMovies";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tickets" element={<Pricing />} />
      <Route path="/currently-showing" element={<CurrentlyShowing />} />
      <Route path="/upcoming-movies" element={<UpcomingMovies />} />
    </Routes>
  );
}

export default AppRouter;
