"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services/products.service";
import { CreateProductDto, UpdateProductDto, ApiError } from "@/lib/api-types";
import { useToast } from "../ui/useToast";

export function useCreateProduct(storeId: string, onSuccessCallback?: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => productsService.createProduct(data),
    onSuccess: (newProduct) => {
      // Invalidar productos de la tienda
      queryClient.invalidateQueries({ queryKey: ["store-products", storeId] });

      toast({
        title: "¡Producto creado!",
        description: `El producto "${newProduct.name}" se ha creado correctamente.`,
      });

      // Ejecutar callback si existe (para cerrar modal)
      onSuccessCallback?.();
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al crear producto",
        description: error.message || "No se pudo crear el producto. Intenta de nuevo.",
      });
    },
  });
}

export function useUpdateProduct(storeId: string, onSuccessCallback?: () => void) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
      productsService.updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      // Invalidar productos de la tienda y el producto específico
      queryClient.invalidateQueries({ queryKey: ["store-products", storeId] });
      queryClient.invalidateQueries({ queryKey: ["product", updatedProduct.id] });

      toast({
        title: "¡Producto actualizado!",
        description: `El producto "${updatedProduct.name}" se ha actualizado correctamente.`,
      });

      // Ejecutar callback si existe (para cerrar modal)
      onSuccessCallback?.();
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al actualizar producto",
        description: error.message || "No se pudo actualizar el producto. Intenta de nuevo.",
      });
    },
  });
}

export function useDeleteProduct(storeId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onSuccess: () => {
      // Invalidar productos de la tienda
      queryClient.invalidateQueries({ queryKey: ["store-products", storeId] });

      toast({
        title: "¡Producto eliminado!",
        description: "El producto se ha eliminado correctamente.",
      });
    },
    onError: (error: ApiError) => {
      toast({
        variant: "destructive",
        title: "Error al eliminar producto",
        description: error.message || "No se pudo eliminar el producto. Intenta de nuevo.",
      });
    },
  });
}
