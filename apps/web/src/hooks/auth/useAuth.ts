"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { LoginRequest, ApiError } from "@/lib/api-types";
import { useToast } from "../ui/useToast";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export function useLogin() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: setAuthUser } = useAuthContext();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      setAuthUser(data.user, data.token);

      toast({
        title: "¡Bienvenido!",
        description: `Hola ${data.user.email}, sesión iniciada correctamente.`,
      });

      const returnUrl = searchParams.get("returnUrl") || "/admin";
      router.push(returnUrl);
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al iniciar sesión",
        description:
          error.message ||
          "Credenciales inválidas. Por favor, intenta de nuevo.",
      });
    },
  });
}

export function useLogout() {
  const { toast } = useToast();
  const router = useRouter();
  const { logout: clearAuthUser } = useAuthContext();

  const logout = () => {
    clearAuthUser();
    authService.logout();

    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });

    router.push("/");
  };

  return { logout };
}

export { useAuthContext } from "@/contexts/AuthContext";
