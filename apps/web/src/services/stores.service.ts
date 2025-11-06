import { ApiService } from "./api.service";
import {
  StoresResponse,
  StoreResponse,
  StoreProductsResponse,
  ApiResponse,
} from "@/lib/api-types";

export const storesService = {
  async getStores(params?: { page?: number; limit?: number }): Promise<StoresResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const url = `/api/stores${queryString ? `?${queryString}` : ""}`;

    const response = await ApiService.get<ApiResponse<StoresResponse>>(url);
    return response.data;
  },

  async getStoreById(id: string): Promise<StoreResponse> {
    const response = await ApiService.get<ApiResponse<StoreResponse>>(`/api/stores/${id}`);
    return response.data;
  },

  async getStoreProducts(
    id: string,
    params?: { page?: number; limit?: number }
  ): Promise<StoreProductsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const url = `/api/stores/${id}/products${queryString ? `?${queryString}` : ""}`;

    const response = await ApiService.get<ApiResponse<StoreProductsResponse>>(url);
    return response.data;
  },
};
