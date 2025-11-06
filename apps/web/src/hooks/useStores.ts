"use client";

import { useQuery } from "@tanstack/react-query";
import { storesService } from "@/services/stores.service";

interface UseStoresParams {
  page?: number;
  limit?: number;
}

export function useStores(params?: UseStoresParams) {
  return useQuery({
    queryKey: ["stores", params?.page, params?.limit],
    queryFn: () => storesService.getStores(params),
  });
}
