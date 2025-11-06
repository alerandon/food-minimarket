"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import StoreHeader from "@/components/stores/StoreHeader";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useStore } from "@/hooks/useStore";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { ApiError } from "@/lib/api-types";

interface StoreDetailClientProps {
  id: string;
  showOnlyInStock: boolean;
  currentPage: number;
  searchParams?: Record<string, string>;
}

export default function StoreDetailClient({
  id,
  showOnlyInStock,
  currentPage,
  searchParams,
}: StoreDetailClientProps) {
  const { data: store, isLoading: isLoadingStore, error: storeError } = useStore(id);
  const {
    data: allProducts,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useStoreProducts(id, { page: currentPage });

  const isLoading = isLoadingStore || isLoadingProducts;
  const error = storeError || productsError;

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar la tienda
          </h1>
          <p className="text-muted-foreground text-lg">
            {apiError.message || "Ocurrió un error inesperado"}
          </p>
          {apiError.statusCode && (
            <p className="text-sm text-muted-foreground">
              Código de error: {apiError.statusCode}
            </p>
          )}
          {apiError.error && (
            <p className="text-xs text-muted-foreground font-mono">
              {apiError.error}
            </p>
          )}
          <Link href="/stores">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a Tiendas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            Cargando información...
          </span>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Tienda no encontrada</h1>
          <Link href="/stores">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a Tiendas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Usar los datos paginados que vienen del backend
  const products = allProducts?.items || [];
  const hasPrevPage = allProducts?.hasPrev || false;
  const hasNextPage = allProducts?.hasNext || false;
  const totalItems = allProducts?.totalItems || 0;

  // Filtrar solo por disponibilidad si es necesario
  const filteredProducts = products.filter((product) => {
    if (showOnlyInStock && !product.isAvailable) return false;
    return true;
  });

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="space-y-4 md:space-y-6">
        <Link href="/stores">
          <Button className="gap-2" size="sm">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Volver a Tiendas</span>
            <span className="sm:hidden">Volver</span>
          </Button>
        </Link>

        <StoreHeader store={store} />

        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-bold">
              Productos ({filteredProducts.length})
            </h2>
            <ProductFilters showOnlyInStock={showOnlyInStock} />
          </div>

          <ProductGrid products={filteredProducts} />

          {totalItems > 0 && (hasPrevPage || hasNextPage) && (
            <div className="flex justify-center pt-6 md:pt-8 pb-4">
              <Pagination>
                <PaginationContent className="gap-1 md:gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href={createPageURL(currentPage - 1)}
                      className={`${
                        !hasPrevPage ? "pointer-events-none opacity-50" : ""
                      }`}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <span className="px-2 md:px-4 py-2 text-sm md:text-base">
                      Página {currentPage} - {totalItems} productos
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      href={createPageURL(currentPage + 1)}
                      className={`${
                        !hasNextPage
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
