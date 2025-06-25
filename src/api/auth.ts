import apiClient from "./index";

export interface LoginRequest{
    username:string;
    password:string
}
export interface SignupRequest{
    name:string;
    email:string;
    password:string
}
export interface LoginResponse{
    token:string;
}
export interface SignupResponse{
    message:string;
}
export const loginUser = async(data:LoginRequest):Promise<LoginResponse> =>{
    const response = await apiClient.post<LoginResponse>("auth/login", data);
    return response.data;
}

export const signupUser = async (data: SignupRequest): Promise<SignupResponse>=>{
    const response = await apiClient.post<SignupResponse>("auth/signup", data);
    return response.data;
}