import { StompSessionProvider } from "react-stomp-hooks";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";
  return (
    <>
      <StompSessionProvider url={`${API_BASE}/api/ws`}>
        <AppRouter />
        <ToastContainer />
      </StompSessionProvider>
    </>
  );
}

export default App;
