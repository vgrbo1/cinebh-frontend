import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { User } from "../types/model/User";

export function MePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/users/me");
        setUser(res.data);
      } catch (err) {
        setError("Unauthorized or session expired");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 text-customGray2 bg-primary min-h-screen">
      <h1 className="text-2xl mb-4 font-bold">My Account</h1>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </div>
  );
}
