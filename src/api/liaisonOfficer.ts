import apiClient from "../api/index";

export interface ApiResponse {
  success: boolean;
  count: number;
  data: LiaisonOfficer[];
}

export interface LiaisonOfficer {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

/**
 * Fetch all liaison officers
 */
export const getLiaisonOfficers = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>("/liaison-officers");
    return response.data; 
  } catch (error) {
    console.error("Error fetching liaison officers:", error);
    throw error;
  }
};
