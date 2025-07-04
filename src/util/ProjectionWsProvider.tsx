import { Outlet } from "react-router";
import { StompSessionProvider } from "react-stomp-hooks";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
export function ProjectionWsProvider() {
  return (
    <StompSessionProvider url={`${API_BASE}/api/ws`}>
      <Outlet />
    </StompSessionProvider>
  );
}
