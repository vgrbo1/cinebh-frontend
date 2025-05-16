import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import logo from "../assets/Logo.png";
import { verifyEmail } from "../services/authService";
export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const verifyEmailMutatation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      setTimeout(() => navigate("/"), 4000);
    },
  });

  useEffect(() => {
    if (token) {
      verifyEmailMutatation.mutate(token);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-primary text-center font-primary px-4">
      <img src={logo} alt="Cinebh logo" className="h-10 mb-6" />

      {!token && (
        <p className="text-red-500 text-lg">No token provided in the URL.</p>
      )}

      {token && verifyEmailMutatation.status === "pending" && (
        <p className="text-lg text-customGray2">Verifying your email...</p>
      )}

      {verifyEmailMutatation.status === "success" && (
        <div>
          <h2 className="text-2xl font-bold text-customGray2 mb-2">
            ✅ Email Verified!
          </h2>
          <p className="text-customGray2">Redirecting to the homepage...</p>
        </div>
      )}

      {verifyEmailMutatation.status === "error" && (
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            ⚠️ Verification Failed
          </h2>
          <p className="text-customGray2">
            The token is invalid or has expired.
          </p>
        </div>
      )}
    </div>
  );
}
