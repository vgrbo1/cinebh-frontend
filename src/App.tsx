import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { FullPageLoader } from "./pages/FullPageLoader";

function App() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) return <FullPageLoader />;

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
