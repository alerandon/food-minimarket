import StoresPageClient from "@/components/stores/StoresPageClient";

interface StoresPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return <StoresPageClient currentPage={currentPage} searchParams={params} />;
}
