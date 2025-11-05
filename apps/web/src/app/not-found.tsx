import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">
          ¡Ups! Página no encontrada
        </p>
        <Link
          href="/stores"
          className="inline-block text-primary hover:text-primary/90 underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
