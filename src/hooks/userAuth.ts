import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import type { LoginRequest, LoginResponse } from "../api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await loginUser(data);
      if (response.token) {
        localStorage.setItem("token", response.token);
      } else {
        throw new Error("Token is missing in the response");
      }
      return response;
    },
    onError: (error: Error) => {
      console.error("Login error:", error.message);
    },
  });
};
