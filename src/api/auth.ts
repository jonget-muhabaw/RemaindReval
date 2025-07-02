import apiClient from "./index";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoggedinUser {
  id: string;
  name: string;
  username: string;
}

export interface SignupRequest {
  name: string;
  username: string;
  password: string;
  roleName: string;
}

export interface RoleRequest {
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Users {
  success: boolean;
  count: number;
  data: Datum[];
}

export interface Datum {
  id: string;
  name: string;
  username: string;
  password: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  role: Role;
}


export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: Role;
}

export interface SignupResponse {
  message: string;
}
export interface UpdateUserRequest {
  name?: string;
  username?: string;
  password?: string;
  roleName?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  data: User;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to login. Please try again."
    );
  }
};

export const signupUser = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  try {
    const response = await apiClient.post<SignupResponse>("auth/signup", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to signup. Please try again."
    );
  }
};

export const UserRole = async (data: RoleRequest): Promise<Role> => {
  try {
    const response = await apiClient.post<Role>("/roles", data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to create a user. Please try again."
    );
  }
};

/**
 * Fetch all users
 */
export const getUsers = async (): Promise<Users> => {
  try {
    const response = await apiClient.get<Users>("/auth/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch logged-in user
 */
export const getLoggedinUser = async (): Promise<LoggedinUser> => {
  try {
    const response = await apiClient.get<LoggedinUser>("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch Roles
 */
export const getRoles = async (): Promise<Role[]> => {
  try {
    const response = await apiClient.get<Role[]>("/roles");
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

/**
 * Update a user
 * @param id The ID of the user to update
 * @param data The partial user data to update
 */
export const updateUser = async (
  id: string,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  try {
    const response = await apiClient.put<UpdateUserResponse>(
      `/auth/users/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to update user. Please try again."
    );
  }
};

/**
 * Delete a user
 * @param id The ID of the user to delete
 */
export const deleteUser = async (id: string): Promise<DeleteUserResponse> => {
  try {
    const response = await apiClient.delete<DeleteUserResponse>(
      `/auth/users/${id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to delete user. Please try again."
    );
  }
};
