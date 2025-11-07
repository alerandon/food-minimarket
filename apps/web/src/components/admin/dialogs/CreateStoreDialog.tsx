import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StoreForm } from "@/components/admin/forms/StoreForm";
import { StoreFormData } from "@/lib/schemas";

interface CreateStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StoreFormData) => void;
  isLoading: boolean;
}

export function CreateStoreDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateStoreDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Tienda</DialogTitle>
          <DialogDescription>
            Completa los datos para crear una nueva tienda
          </DialogDescription>
        </DialogHeader>
        <StoreForm onSubmit={onSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
