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


export interface CreateDocumentRequest {
  title: string;
  description?: string;
  expirationDate: string;
  liaisonOfficerName: string;
}

export interface CreateDocumentResponse {
  id: number;
  title: string;
  description?: string;
  expirationDate: string;
  liaisonOfficerName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  expirationDate?: string;
  liaisonOfficerName?: string;
}

export interface UpdateDocumentResponse {
  id: number;
  title: string;
  description: string;
  expirationDate: string;
  liaisonOfficerName: string;
  status: string;
  updatedAt: string;
}

export interface DocumentStats {
  totalDocuments: number;
  active: number;
  expiringSoon: number;
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
  const { data } = await apiClient.get<DocumentStats>("/documents/stats");
  return data;
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
    "/documents",
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
