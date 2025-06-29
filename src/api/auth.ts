import apiClient from "./index";

export interface LoginRequest{
    username:string;
    password:string
}
export interface SignupRequest {
  name: string;
  username: string;
  password: string;
  roleName: string;
}
export interface RoleRequest{
  name:string
}
export interface Role {
  id: number;
  name: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  username: string;
  role: Role;
  token: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface SignupResponse{
    message:string;
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
export const UserRole = async(
  data:RoleRequest

):Promise<Role> =>{
  try {
    const response = await apiClient.post<Role>("/roles", data);
    return response.data
  } catch (error:any) {
    throw new Error(
      error.response?.data?.message || "Failed to create a user. Please try again."
    )
  }
}
  
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
