"use client";

import { Suspense } from "react";
import StoreSearch from "@/components/stores/StoreSearch";
import StoreGrid from "@/components/stores/StoreGrid";
import { useStores } from "@/hooks/useStores";
import { ApiError } from "@/lib/api-types";
import { Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StoresPageClientProps {
  currentPage: number;
  searchParams?: Record<string, string>;
}

export default function StoresPageClient({
  currentPage,
  searchParams,
}: StoresPageClientProps) {
  const { data: stores, isLoading, error } = useStores({ page: currentPage });

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (error) {
    const apiError = error as unknown as ApiError;
    return (
      <div className="container py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">
            Error al cargar las tiendas
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
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 md:py-8 space-y-6 md:space-y-8">
      <div className="text-center space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold px-2">Explora Nuestras Tiendas</h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
          Encuentra las mejores tiendas cerca de ti y descubre sus productos
        </p>
      </div>

      <div className="flex justify-center">
        <Suspense fallback={<div>Cargando...</div>}>
          <StoreSearch />
        </Suspense>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8 md:py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground text-sm md:text-base">
            Cargando tiendas...
          </span>
        </div>
      ) : (
        <>
          <StoreGrid stores={stores?.items || []} />

          {/* Paginación */}
          {stores && stores.totalItems > 0 && (stores.hasPrev || stores.hasNext) && (
            <div className="flex justify-center pt-6 md:pt-8 pb-4">
              <Pagination>
                <PaginationContent className="gap-1 md:gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href={createPageURL(currentPage - 1)}
                      className={`${
                        !stores.hasPrev ? "pointer-events-none opacity-50" : ""
                      }`}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <span className="px-2 md:px-4 py-2 text-sm md:text-base">
                      Página {currentPage} - {stores.totalItems} tiendas
                    </span>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      href={createPageURL(currentPage + 1)}
                      className={`${
                        !stores.hasNext ? "pointer-events-none opacity-50" : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
