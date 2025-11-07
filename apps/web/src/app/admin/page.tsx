"use client";

import { useAuthContext } from "@/hooks/auth/useAuth";
import Link from "next/link";
import { Store, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminBreadcrumbs } from "@/components/admin/AdminBreadcrumbs";

export default function AdminPage() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-6">
      <AdminBreadcrumbs
        items={[{ label: "Admin", href: "/admin" }]}
      />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido, {user?.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Tiendas</CardTitle>
            <Store className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Gestiona todas las tiendas del marketplace
            </CardDescription>
            <Button asChild className="w-full">
              <Link href="/admin/stores">
                Administrar Tiendas
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Productos</CardTitle>
            <Package className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Administra los productos de cada tienda
            </CardDescription>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/stores">
                Ver Tiendas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Instrucciones</CardTitle>
          <CardDescription>
            Cómo usar el panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            • Para gestionar tiendas, haz clic en &quot;Administrar Tiendas&quot;
          </p>
          <p className="text-sm text-muted-foreground">
            • Dentro de cada tienda podrás ver y administrar sus productos
          </p>
          <p className="text-sm text-muted-foreground">
            • Puedes volver a la página principal haciendo clic en &quot;Tiendas&quot; en la barra de navegación
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
