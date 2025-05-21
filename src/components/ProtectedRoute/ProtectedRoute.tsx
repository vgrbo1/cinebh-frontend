import { Navigate } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
