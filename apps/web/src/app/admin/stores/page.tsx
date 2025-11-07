"use client";

import { useState } from "react";
import { useStores } from "@/hooks/stores/useStores";
import { useCreateStore, useUpdateStore, useDeleteStore } from "@/hooks/stores/useStoreMutations";
import Link from "next/link";
import { Plus, Store as StoreIcon, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";
import { StoreListSkeleton } from "@/components/admin/StoreListSkeleton";
import { StoreForm } from "@/components/admin/StoreForm";
import { Store } from "@/lib/types";
import { StoreFormData } from "@/lib/schemas";

export default function AdminStoresPage() {
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
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Tiendas" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Tiendas</h1>
            <p className="text-muted-foreground mt-2">
              Administra todas las tiendas del marketplace
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
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Tiendas" },
          ]}
        />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Tiendas</h1>
            <p className="text-muted-foreground mt-2">
              Administra todas las tiendas del marketplace
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
              <Card key={store.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{store.name}</CardTitle>
                  <CardDescription>{store.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{store.address}</p>
                    <p className="text-muted-foreground">{store.phone}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setEditingStore(store)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button asChild variant="secondary" className="flex-1">
                      <Link href={`/admin/stores/${store.id}/products`}>
                        Productos
                      </Link>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-destructive hover:text-destructive"
                    onClick={() => setDeletingStoreId(store.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal para crear tienda */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Tienda</DialogTitle>
            <DialogDescription>
              Completa los datos para crear una nueva tienda
            </DialogDescription>
          </DialogHeader>
          <StoreForm
            onSubmit={handleCreate}
            isLoading={createStore.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Modal para editar tienda */}
      <Dialog open={!!editingStore} onOpenChange={() => setEditingStore(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Tienda</DialogTitle>
            <DialogDescription>
              Modifica los datos de la tienda
            </DialogDescription>
          </DialogHeader>
          {editingStore && (
            <StoreForm
              initialData={editingStore}
              onSubmit={handleUpdate}
              isLoading={updateStore.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* AlertDialog para confirmar eliminación */}
      <AlertDialog open={!!deletingStoreId} onOpenChange={() => setDeletingStoreId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará la tienda y todos sus productos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
