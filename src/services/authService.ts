import { SignUpFormData } from "../validation/signUpSchema";
import axiosInstance from "./axiosInstance";

export const signUp = async (data: SignUpFormData) => {
  const response = await axiosInstance.post("/api/public/auth/register", {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axiosInstance.post("/api/public/auth/email/confirm", {
    emailVerificationToken: token,
  });
  return response.data;
};

export const sendResetEmail = async (email: string) => {
  const response = await axiosInstance.post(
    "/api/public/auth/password/reset/send",
    {
      email,
    }
  );
  return response.data;
};

