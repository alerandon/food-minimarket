"use client";

import { useQuery } from "@tanstack/react-query";
import { storesService } from "@/services/stores.service";

interface UseStoreProductsParams {
  page?: number;
  limit?: number;
}

export function useStoreProducts(
  storeId: string,
  params?: UseStoreProductsParams
) {
  return useQuery({
    queryKey: ["store-products", storeId, params?.page, params?.limit],
    queryFn: () => storesService.getStoreProducts(storeId, params),
    enabled: !!storeId,
  });
}
