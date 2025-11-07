import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StoreForm } from "@/components/admin/forms/StoreForm";
import { Store } from "@/lib/types";
import { StoreFormData } from "@/lib/schemas";

interface EditStoreDialogProps {
  store: Store | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StoreFormData) => void;
  isLoading: boolean;
}

export function EditStoreDialog({
  store,
  onOpenChange,
  onSubmit,
  isLoading,
}: EditStoreDialogProps) {
  return (
    <Dialog open={!!store} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tienda</DialogTitle>
          <DialogDescription>
            Modifica los datos de la tienda
          </DialogDescription>
        </DialogHeader>
        {store && (
          <StoreForm
            initialData={store}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
