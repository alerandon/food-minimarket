"use client";

import { useQuery } from "@tanstack/react-query";
import { storesService } from "@/services/stores.service";

interface UseStoresParams {
  page?: number;
  limit?: number;
  q?: string;
}

export function useStores(params?: UseStoresParams) {
  return useQuery({
    queryKey: ["stores", params?.page, params?.limit, params?.q],
    queryFn: () => storesService.getStores(params),
  });
}
