"use client";

import { useState } from "react";
import { useAuthContext } from "@/hooks/auth/useAuth";
import { useStores } from "@/hooks/stores/useStores";
import { useCreateStore, useUpdateStore, useDeleteStore } from "@/hooks/stores/useStoreMutations";
import { Plus, Store as StoreIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { AdminBreadcrumbs } from "@/components/admin/navigation/AdminBreadcrumbs";
import { StoreListSkeleton } from "@/components/admin/skeletons/StoreListSkeleton";
import { StoreCard } from "@/components/admin/cards/StoreCard";
import {
  CreateStoreDialog,
  EditStoreDialog,
  DeleteStoreDialog,
} from "@/components/admin/dialogs";
import { Store } from "@/lib/types";
import { StoreFormData } from "@/lib/schemas";

export default function AdminPage() {
  const { user } = useAuthContext();
  const { data, isLoading } = useStores({ page: 1, limit: 100 });
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [deletingStoreId, setDeletingStoreId] = useState<string | null>(null);

  const createStore = useCreateStore(() => setIsCreateOpen(false));
  const updateStore = useUpdateStore(() => setEditingStore(null));
  const deleteStore = useDeleteStore();

  const handleCreate = (data: StoreFormData) => {
    createStore.mutate(data);
  };

  const handleUpdate = (data: StoreFormData) => {
    if (editingStore) {
      updateStore.mutate({ id: editingStore.id, data });
    }
  };

  const handleDelete = () => {
    if (deletingStoreId) {
      deleteStore.mutate(deletingStoreId);
      setDeletingStoreId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <AdminBreadcrumbs
          items={[{ label: "Admin", href: "/admin" }]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground mt-2">
              Bienvenido, {user?.email}
            </p>
          </div>
        </div>

        <StoreListSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <AdminBreadcrumbs
          items={[{ label: "Admin", href: "/admin" }]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground mt-2">
              Bienvenido, {user?.email}
            </p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Tienda
          </Button>
        </div>

        {data?.items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <StoreIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No hay tiendas registradas</p>
              <p className="text-sm text-muted-foreground mb-4">
                Comienza creando tu primera tienda
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear Tienda
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.items.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onEdit={setEditingStore}
                onDelete={setDeletingStoreId}
              />
            ))}
          </div>
        )}
      </div>

      <CreateStoreDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        isLoading={createStore.isPending}
      />

      <EditStoreDialog
        store={editingStore}
        onOpenChange={() => setEditingStore(null)}
        onSubmit={handleUpdate}
        isLoading={updateStore.isPending}
      />

      <DeleteStoreDialog
        open={!!deletingStoreId}
        onOpenChange={() => setDeletingStoreId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
