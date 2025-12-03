import { Navigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { FullPageLoader } from "../../pages/FullPageLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isHydrated } = useAuthStore();

  if (!isHydrated) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
