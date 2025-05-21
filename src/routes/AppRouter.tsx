import { Route, Routes } from "react-router";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { About } from "../pages/About";
import { CurrentlyShowing } from "../pages/CurrentlyShowing";
import { Home } from "../pages/Home";
import { MePage } from "../pages/MePage";
import { Pricing } from "../pages/Pricing";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { UpcomingMovies } from "../pages/UpcomingMovies";
import { VerifyEmailPage } from "../pages/VerifyEmailPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tickets" element={<Pricing />} />
      <Route path="/currently-showing" element={<CurrentlyShowing />} />
      <Route path="/upcoming-movies" element={<UpcomingMovies />} />
      <Route path="/email/confirm" element={<VerifyEmailPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <MePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
