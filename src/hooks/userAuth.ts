import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { deleteUser, getLoggedinUser, getRoles, getUsers, loginUser, signupUser, updateUser, UserRole } from "../api/auth";
import type { DeleteUserResponse, LoggedinUser, LoginRequest, LoginResponse, Role, RoleRequest, SignupRequest, SignupResponse, UpdateUserRequest, UpdateUserResponse, Users } from "../api/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({

    mutationFn: loginUser,
    onSuccess: (response: LoginResponse) => {
      console.log("Login response received:", response);
      try {
        if (response.token) {
          localStorage.setItem("token", response.token);
          console.log("Token saved:", response.token);
    
          const roleName = response.user?.role?.name;
          if (roleName) {
            localStorage.setItem("role", roleName);
            console.log("Role saved:", roleName);
          } else {
            console.warn("Role or role name is missing in the response:", response.user?.role);
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
 * Fetch loggedin user
 */
export const useLoggedinUser = (): UseQueryResult<LoggedinUser, Error> => {
  return useQuery<LoggedinUser, Error>({
    queryKey: ["roles"],
    queryFn: getLoggedinUser,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 2,
  });
};
/**
 * Fetch all Users
 */
export const useUsers = (): UseQueryResult<Users, Error> => {
  return useQuery<Users, Error>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUserResponse,
    Error,
    { id: string; data: UpdateUserRequest }
  >({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalidate users query to refetch data after update
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalidate users query to refetch data after delete
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
