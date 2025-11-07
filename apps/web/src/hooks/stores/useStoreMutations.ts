"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storesService } from "@/services/stores.service";
import { CreateStoreDto, UpdateStoreDto, ApiError } from "@/lib/api-types";
import { useToast } from "../ui/useToast";

export function useCreateStore(onSuccessCallback?: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStoreDto) => storesService.createStore(data),
    onSuccess: (newStore) => {
      // Invalidar lista de tiendas para que se actualice
      queryClient.invalidateQueries({ queryKey: ["stores"] });

      toast({
        title: "¡Tienda creada!",
        description: `La tienda "${newStore.name}" se ha creado correctamente.`,
      });

      // Ejecutar callback si existe (para cerrar modal)
      onSuccessCallback?.();
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al crear tienda",
        description: error.message || "No se pudo crear la tienda. Intenta de nuevo.",
      });
    },
  });
}

export function useUpdateStore(onSuccessCallback?: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStoreDto }) =>
      storesService.updateStore(id, data),
    onSuccess: (updatedStore) => {
      // Invalidar lista de tiendas y la tienda específica
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      queryClient.invalidateQueries({ queryKey: ["store", updatedStore.id] });

      toast({
        title: "¡Tienda actualizada!",
        description: `La tienda "${updatedStore.name}" se ha actualizado correctamente.`,
      });

      // Ejecutar callback si existe (para cerrar modal)
      onSuccessCallback?.();
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al actualizar tienda",
        description: error.message || "No se pudo actualizar la tienda. Intenta de nuevo.",
      });
    },
  });
}

export function useDeleteStore() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storesService.deleteStore(id),
    onSuccess: () => {
      // Invalidar lista de tiendas para que se actualice
      queryClient.invalidateQueries({ queryKey: ["stores"] });

      toast({
        title: "¡Tienda eliminada!",
        description: "La tienda se ha eliminado correctamente.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al eliminar tienda",
        description: error.message || "No se pudo eliminar la tienda. Intenta de nuevo.",
      });
    },
  });
}
