import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </ProtectedRoute>
  );
}
