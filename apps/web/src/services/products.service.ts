import { ApiService } from "./api.service";
import {
  ProductResponse,
  ApiResponse,
  CreateProductDto,
  UpdateProductDto,
} from "@/lib/api-types";

export const productsService = {
  async getProductById(id: string): Promise<ProductResponse> {
    const response = await ApiService.get<ApiResponse<ProductResponse>>(
      `/api/products/${id}`
    );
    return response.data;
  },

  async createProduct(data: CreateProductDto): Promise<ProductResponse> {
    const response = await ApiService.post<ApiResponse<ProductResponse>>(
      `/api/stores/${data.storeId}/products`,
      data
    );
    return response.data;
  },

  async updateProduct(
    id: string,
    data: UpdateProductDto & { storeId: string }
  ): Promise<ProductResponse> {
    const response = await ApiService.put<ApiResponse<ProductResponse>>(
      `/api/stores/${data.storeId}/products/${id}`,
      data
    );
    return response.data;
  },

  async deleteProduct(id: string, storeId: string): Promise<void> {
    await ApiService.delete(`/api/stores/${storeId}/products/${id}`);
  },
};
