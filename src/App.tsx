import { StompSessionProvider } from "react-stomp-hooks";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <StompSessionProvider
        url={
          import.meta.env.VITE_API_URL || "http://localhost:8080" + "/api/ws"
        }
      >
        <AppRouter />
        <ToastContainer />
      </StompSessionProvider>
    </>
  );
}

export default App;
