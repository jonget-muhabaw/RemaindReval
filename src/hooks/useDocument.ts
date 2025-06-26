import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  UpdateDocumentRequest,
  UpdateDocumentResponse,
} from "../api/documents";
import {
  createDocument,
  getDocuments,
  getDocumentsStatics,
  updateDocument,
} from "../api/documents";
import type {
  AppDocument,
  CreateDocumentRequest,
  CreateDocumentResponse,
  DocumentStats,
 
} from "../api/documents";

/**
 * Fetch all documents
 */
export const useDocuments = (): UseQueryResult<AppDocument[], Error> => {
  return useQuery<AppDocument[], Error>({
    queryKey: ["documents"],
    queryFn: getDocuments,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};


/**
 * Fetch document statistics
 */
export const useDocumentStats = (): UseQueryResult<DocumentStats, Error> => {
  return useQuery<DocumentStats, Error>({
    queryKey: ["documentsStats"],
    queryFn: getDocumentsStatics,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

/**
 * Hook to create a new document
 */
export const useCreateDocument = (): UseMutationResult<
  CreateDocumentResponse,
  Error,
  CreateDocumentRequest
> => {
  return useMutation<CreateDocumentResponse, Error, CreateDocumentRequest>({
    mutationFn: (data) => createDocument(data),
  });
};

/**
 * Hook to update an existing document
 */
export const useUpdateDocument = (): UseMutationResult<
  UpdateDocumentResponse,
  Error,
  { id: number; data: UpdateDocumentRequest }
> => {
  return useMutation<UpdateDocumentResponse, Error, { id: number; data: UpdateDocumentRequest }>(
    {
      mutationFn: ({ id, data }) => updateDocument(id, data),
    }
  );
};
