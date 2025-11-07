"use client";

import { use, useState } from "react";
import { useStore } from "@/hooks/stores/useStore";
import { useStoreProducts } from "@/hooks/stores/useStoreProducts";
import { useProduct } from "@/hooks/products/useProduct";
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/products/useProductMutations";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AdminBreadcrumbs } from "@/components/admin/navigation/AdminBreadcrumbs";
import { ProductListSkeleton } from "@/components/admin/skeletons/ProductListSkeleton";
import { ProductCard } from "@/components/admin/cards/ProductCard";
import {
  CreateProductDialog,
  EditProductDialog,
  DeleteProductDialog,
} from "@/components/admin/dialogs";
import { ProductFormData } from "@/lib/schemas";

export default function StoreProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: storeId } = use(params);
  const { data: store, isLoading: loadingStore } = useStore(storeId);
  const { data: productsData, isLoading: loadingProducts } = useStoreProducts(
    storeId,
    { page: 1, limit: 100 }
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const { data: editingProduct } = useProduct(editingProductId || "");
  const createProduct = useCreateProduct(storeId, () => setIsCreateOpen(false));
  const updateProduct = useUpdateProduct(storeId, () => setEditingProductId(null));
  const deleteProduct = useDeleteProduct(storeId);

  const handleCreate = (data: ProductFormData) => {
    createProduct.mutate({ ...data, storeId });
  };

  const handleUpdate = (data: ProductFormData) => {
    if (editingProductId) {
      updateProduct.mutate({ id: editingProductId, data });
    }
  };

  const handleDelete = () => {
    if (deletingProductId) {
      deleteProduct.mutate(deletingProductId);
      setDeletingProductId(null);
    }
  };

  if (loadingStore || loadingProducts) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <div className="animate-pulse">
            <div className="h-4 w-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
            <p className="text-muted-foreground mt-2">
              Cargando productos...
            </p>
          </div>
        </div>

        <ProductListSkeleton />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tienda no encontrada</h2>
          <p className="text-muted-foreground mb-4">
            La tienda que buscas no existe o ha sido eliminada.
          </p>
          <Button asChild>
            <Link href="/admin">Volver a Admin</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <AdminBreadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: store.name },
            { label: "Productos" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Productos de {store.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              {store.city} • {store.address}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin">Volver a Admin</Link>
            </Button>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        {productsData?.items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No hay productos registrados</p>
              <p className="text-sm text-muted-foreground mb-4">
                Comienza agregando el primer producto
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear Producto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productsData?.items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={setEditingProductId}
                onDelete={setDeletingProductId}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProductDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        isLoading={createProduct.isPending}
        storeName={store.name}
      />

      <EditProductDialog
        product={editingProduct || null}
        onOpenChange={() => setEditingProductId(null)}
        onSubmit={handleUpdate}
        isLoading={updateProduct.isPending}
      />

      <DeleteProductDialog
        open={!!deletingProductId}
        onOpenChange={() => setDeletingProductId(null)}
        onConfirm={handleDelete}
        isDeleting={deleteProduct.isPending}
      />
    </>
  );
}
