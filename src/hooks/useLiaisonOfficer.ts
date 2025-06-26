import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getLiaisonOfficers } from "../api/liaisonOfficer";
import type {ApiResponse} from "../api/liaisonOfficer";

/**
 * Custom hook to fetch liaison officers
 */
export const useLiaisonOfficers = (): UseQueryResult<ApiResponse, Error> => {
  return useQuery<ApiResponse, Error>({
    queryKey: ["liaisonOfficers"], 
    queryFn: getLiaisonOfficers, 
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
  });
};
