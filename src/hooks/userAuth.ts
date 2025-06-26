import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import type { LoginRequest, LoginResponse } from "../api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({

    mutationFn: loginUser,
    onSuccess: (response: { token: string }) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
      } else {
        throw new Error("Token is missing in the response");
      }
    },
    onError: (error: Error) => {
      console.error("Login error:", error.message);
    },
  });
};
export const useLogout = () => {
  return () => {
    try {
      localStorage.removeItem("token");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
};
