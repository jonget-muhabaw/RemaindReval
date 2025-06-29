import apiClient from "../api/index";

export interface AppDocument {
  id: number;
  title: string;
  description: string | null;
  expiration_date: string;
  status: string;
  liaison_officer_id: number;
  liaisonOfficer: {
    name: string;
    email: string;
  };
  days_left: number;
}
interface DocumentsApiResponse {
  success: boolean;
  count: number;
  data: AppDocument[];
}

export interface DocumentStatsResponse {
  success: boolean;
  stats: DocumentStats;
}
export interface CreateDocumentRequest {
  title: string;
  description?: string;
   expiration_date: string;
   liaison_officer_name: string;
}

export interface CreateDocumentResponse {
  id: string;
  title: string;
  description?: string;
  expirationDate: string;
  liaisonOfficerName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDocumentRequest {
  title: string;
  description?: string;
  expiration_date: string;
  liaison_officer_name: string;
}

export interface UpdateDocumentResponse {
  title: string;
  description?: string;
  expiration_date: string;
  liaison_officer_name: string;
  status: string;
  updatedAt: string;
}

export interface DocumentStats {
  total_documents: number;
  active: number;
  expiring_soon: number;
  expired: number;
}

export interface DeleteDocumentResponse {
  success: boolean;
  message: string;
}

/**
 * Fetch document statistics
 */

export const getDocumentsStatics = async (): Promise<DocumentStats> => {
  try {
    const { data } = await apiClient.get<DocumentStatsResponse>("/documents/stats");

    if (data.success) {
      return data.stats;
    } else {
      throw new Error("Failed to fetch document statistics");
    }
  } catch (error) {
    console.error("Error fetching document statistics:", error);
    throw error; 
  }
};


/**
 * Fetch all documents
 */
export const getDocuments = async (): Promise<AppDocument[]> => {
  try {
    const response = await apiClient.get<DocumentsApiResponse>("/documents");
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};


/**
 * Create a new document
 */
export const createDocument = async (
  data: CreateDocumentRequest
): Promise<CreateDocumentResponse> => {
  const { data: response } = await apiClient.post<CreateDocumentResponse>(
    "/documents/createDocument",
    data
  );
  return response;
};

/**
 * Update an existing document
 */
export const updateDocument = async (
  id: number,
  data: UpdateDocumentRequest
): Promise<UpdateDocumentResponse> => {
  const { data: response } = await apiClient.put<UpdateDocumentResponse>(
    `/documents/${id}`,
    data
  );
  return response;
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  id: number
): Promise<DeleteDocumentResponse> => {
  const { data } = await apiClient.delete<DeleteDocumentResponse>(
    `/documents/${id}`
  );
  return data;
};
