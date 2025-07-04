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
      setTimeout(() => navigate("/"), 5000);
    },
  });

  useEffect(() => {
    if (token && verifyEmailMutatation.status === "idle") {
      verifyEmailMutatation.mutate(token);
    }
  }, [token, verifyEmailMutatation]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-primary text-center font-primary px-4">
      <img src={logo} alt="Cinebh logo" className="h-10 mb-6" />

      {!token && (
        <p className="text-customLightRed text-lg">
          No token provided in the URL.
        </p>
      )}

      {token && verifyEmailMutatation.status === "pending" && (
        <p className="text-lg text-customGray2">Verifying your email...</p>
      )}

      {verifyEmailMutatation.status === "success" && (
        <div>
          <h2 className="text-2xl font-bold text-customGray2 mb-2">
            ✅ Email Verified!
          </h2>
          <p className="text-customGray2">
            You will be redirected to the homepage in 5 seconds.
          </p>
        </div>
      )}

      {verifyEmailMutatation.status === "error" && (
        <div>
          <h2 className="text-2xl font-bold text-customLightRed mb-2">
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
