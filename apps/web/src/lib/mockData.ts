import { Store, Product } from "./types";

export const mockStores: Store[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Mini Market Central",
    address: "Av. Principal 123",
    city: "Lima",
    phone: "+51 999 999 001",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
    deletedAt: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Tienda La Esquina",
    address: "Jr. Los Olivos 456",
    city: "Arequipa",
    phone: "+51 999 999 002",
    createdAt: "2025-01-16T11:30:00.000Z",
    updatedAt: "2025-01-16T11:30:00.000Z",
    deletedAt: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Bodega Express",
    address: "Calle Real 789",
    city: "Cusco",
    phone: "+51 999 999 003",
    createdAt: "2025-01-17T09:15:00.000Z",
    updatedAt: "2025-01-17T09:15:00.000Z",
    deletedAt: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Supermercado Del Norte",
    address: "Av. Industrial 321",
    city: "Trujillo",
    phone: "+51 999 999 004",
    createdAt: "2025-01-18T14:20:00.000Z",
    updatedAt: "2025-01-18T14:20:00.000Z",
    deletedAt: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Market Fresh",
    address: "Pasaje Los Sauces 654",
    city: "Piura",
    phone: "+51 999 999 005",
    createdAt: "2025-01-19T08:45:00.000Z",
    updatedAt: "2025-01-19T08:45:00.000Z",
    deletedAt: null,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Tienda San Martín",
    address: "Av. San Martín 987",
    city: "Chiclayo",
    phone: "+51 999 999 006",
    createdAt: "2025-01-20T16:00:00.000Z",
    updatedAt: "2025-01-20T16:00:00.000Z",
    deletedAt: null,
  },
];

export const mockProducts: Product[] = [
  // Products for Mini Market Central
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    name: "Leche Entera 1L",
    description: "Leche fresca entera en envase tetrapack",
    price: "5.50",
    sku: "LEC-1L-001",
    stock: 30,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2025-01-15T10:30:00.000Z",
    updatedAt: "2025-01-15T10:30:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440002",
    name: "Pan Integral 500g",
    description: "Pan integral de trigo con semillas",
    price: "8.00",
    sku: "PAN-INT-002",
    stock: 15,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2025-01-15T10:35:00.000Z",
    updatedAt: "2025-01-15T10:35:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440003",
    name: "Arroz Extra 1kg",
    description: "Arroz blanco extra largo de primera calidad",
    price: "4.20",
    sku: "ARR-1KG-003",
    stock: 0,
    isAvailable: false,
    storeId: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2025-01-15T10:40:00.000Z",
    updatedAt: "2025-01-15T10:40:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440004",
    name: "Huevos Frescos x12",
    description: "Docena de huevos frescos de granja",
    price: "12.50",
    sku: "HUE-12U-004",
    stock: 25,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2025-01-15T10:45:00.000Z",
    updatedAt: "2025-01-15T10:45:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440005",
    name: "Aceite Vegetal 1L",
    description: "Aceite vegetal puro de primera calidad",
    price: "9.80",
    sku: "ACE-1L-005",
    stock: 18,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440001",
    createdAt: "2025-01-15T10:50:00.000Z",
    updatedAt: "2025-01-15T10:50:00.000Z",
  },
  // Products for Tienda La Esquina
  {
    id: "660e8400-e29b-41d4-a716-446655440006",
    name: "Yogurt Natural 1L",
    description: "Yogurt natural sin azúcar añadida",
    price: "7.50",
    sku: "YOG-1L-006",
    stock: 20,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: "2025-01-16T11:45:00.000Z",
    updatedAt: "2025-01-16T11:45:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440007",
    name: "Café Molido 250g",
    description: "Café molido 100% puro de altura",
    price: "15.00",
    sku: "CAF-250G-007",
    stock: 12,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: "2025-01-16T11:50:00.000Z",
    updatedAt: "2025-01-16T11:50:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440008",
    name: "Azúcar Blanca 1kg",
    description: "Azúcar refinada de caña",
    price: "3.80",
    sku: "AZU-1KG-008",
    stock: 0,
    isAvailable: false,
    storeId: "550e8400-e29b-41d4-a716-446655440002",
    createdAt: "2025-01-16T11:55:00.000Z",
    updatedAt: "2025-01-16T11:55:00.000Z",
  },
  // Products for Bodega Express
  {
    id: "660e8400-e29b-41d4-a716-446655440009",
    name: "Galletas Integrales 200g",
    description: "Galletas de avena y miel",
    price: "6.50",
    sku: "GAL-200G-009",
    stock: 35,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440003",
    createdAt: "2025-01-17T09:30:00.000Z",
    updatedAt: "2025-01-17T09:30:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440010",
    name: "Mantequilla 250g",
    description: "Mantequilla con sal",
    price: "10.00",
    sku: "MAN-250G-010",
    stock: 22,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440003",
    createdAt: "2025-01-17T09:35:00.000Z",
    updatedAt: "2025-01-17T09:35:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440011",
    name: "Fideos Spaghetti 500g",
    description: "Pasta larga de sémola de trigo",
    price: "4.50",
    sku: "FID-500G-011",
    stock: 40,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440003",
    createdAt: "2025-01-17T09:40:00.000Z",
    updatedAt: "2025-01-17T09:40:00.000Z",
  },
  // Products for Supermercado Del Norte
  {
    id: "660e8400-e29b-41d4-a716-446655440012",
    name: "Atún en Lata 170g",
    description: "Atún en aceite vegetal",
    price: "5.80",
    sku: "ATU-170G-012",
    stock: 28,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440004",
    createdAt: "2025-01-18T14:35:00.000Z",
    updatedAt: "2025-01-18T14:35:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440013",
    name: "Sal de Mesa 1kg",
    description: "Sal yodada de mesa",
    price: "2.50",
    sku: "SAL-1KG-013",
    stock: 50,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440004",
    createdAt: "2025-01-18T14:40:00.000Z",
    updatedAt: "2025-01-18T14:40:00.000Z",
  },
  // Products for Market Fresh
  {
    id: "660e8400-e29b-41d4-a716-446655440014",
    name: "Queso Fresco 500g",
    description: "Queso fresco artesanal",
    price: "18.00",
    sku: "QUE-500G-014",
    stock: 10,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2025-01-19T09:00:00.000Z",
    updatedAt: "2025-01-19T09:00:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440015",
    name: "Mermelada Fresa 300g",
    description: "Mermelada de fresa natural",
    price: "8.50",
    sku: "MER-300G-015",
    stock: 0,
    isAvailable: false,
    storeId: "550e8400-e29b-41d4-a716-446655440005",
    createdAt: "2025-01-19T09:05:00.000Z",
    updatedAt: "2025-01-19T09:05:00.000Z",
  },
  // Products for Tienda San Martín
  {
    id: "660e8400-e29b-41d4-a716-446655440016",
    name: "Detergente en Polvo 500g",
    description: "Detergente multiusos para ropa",
    price: "12.00",
    sku: "DET-500G-016",
    stock: 18,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440006",
    createdAt: "2025-01-20T16:15:00.000Z",
    updatedAt: "2025-01-20T16:15:00.000Z",
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440017",
    name: "Papel Higiénico x4",
    description: "Papel higiénico suave doble hoja",
    price: "7.00",
    sku: "PAP-4U-017",
    stock: 32,
    isAvailable: true,
    storeId: "550e8400-e29b-41d4-a716-446655440006",
    createdAt: "2025-01-20T16:20:00.000Z",
    updatedAt: "2025-01-20T16:20:00.000Z",
  },
];

export const getStoreById = (id: string): Store | undefined => {
  return mockStores.find((store) => store.id === id);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const getProductsByStoreId = (storeId: string): Product[] => {
  return mockProducts.filter((product) => product.storeId === storeId);
};

export const searchStores = (query: string): Store[] => {
  if (!query.trim()) return mockStores;
  
  const lowerQuery = query.toLowerCase().trim();
  return mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(lowerQuery) ||
      store.city.toLowerCase().includes(lowerQuery) ||
      store.address.toLowerCase().includes(lowerQuery)
  );
};
