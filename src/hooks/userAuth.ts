import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getRoles, loginUser, signupUser, UserRole } from "../api/auth";
import type { LoginRequest, LoginResponse, Role, RoleRequest, SignupRequest, SignupResponse } from "../api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({

    mutationFn: loginUser,
    onSuccess: (response: any) => {
      console.log("Login response received:", response);
      try {
        if (response.token) {
          localStorage.setItem("token", response.token);
          console.log("Token saved:", response.token);
    
          if (response.role?.name) {
            localStorage.setItem("role", response.role.name);
            console.log("Role saved:", response.role.name);
          } else {
            console.warn("Role or role name is missing in the response:", response.role);
          }
        } else {
          throw new Error("Token is missing in the response");
        }
      } catch (e) {
        console.error("Error processing login response:", e);
      }
    }
    
    
  });
};
export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupUser,
    onSuccess: (response) => {
      console.log("User signed up successfully:", response);
    },
    onError: (error: Error) => {
      console.error("Signup error:", error.message);
    },
  });
};
export const useRole = () => {
  return useMutation<Role, Error, RoleRequest>({
    mutationFn: UserRole,
    onSuccess: (response) => {
      console.log("User created successfully:", response);
    },
    onError: (error: Error) => {
      console.error("Creating User error:", error.message);
    },
  });
};
/**
 * Fetch all Roles
 */
export const useRoles = (): UseQueryResult<Role[], Error> => {
  return useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: getRoles, 
    staleTime: 5 * 60 * 1000,
    retry: 2, 
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
