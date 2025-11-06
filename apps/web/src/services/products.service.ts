import { ApiService } from "./api.service";
import { ProductResponse, ApiResponse } from "@/lib/api-types";

export const productsService = {
  async getProductById(id: string): Promise<ProductResponse> {
    const response = await ApiService.get<ApiResponse<ProductResponse>>(
      `/api/products/${id}`
    );
    return response.data;
  },
};
