import { ApiService } from "./api.service";
import {
  LoginRequest,
  LoginResponse,
  ApiResponse,
} from "@/lib/api-types";

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await ApiService.post<ApiResponse<LoginResponse>>(
      "/api/auth/login",
      credentials
    );

    // Guardar el token automáticamente
    if (response.data.access_token) {
      ApiService.setAuthToken(response.data.access_token);
    }

    return response.data;
  },

  logout(): void {
    ApiService.removeAuthToken();
  },
};
