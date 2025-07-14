// Tipos para a API
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Address {
  zipCode: string;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  status: number;
}

export interface ShippingOption {
  id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime?: string;
}

export interface CartSummary {
  products: Product[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingOption?: ShippingOption;
}

// Função para buscar dados do carrinho
export async function fetchCart(): Promise<CartSummary> {
  const response = await fetch("/api/cart");
  if (!response.ok) {
    throw new Error("Erro ao buscar dados do carrinho");
  }
  return response.json();
}

// Função para buscar endereço por CEP

// Função para buscar opções de frete
export async function fetchShippingOptions(
  zipCode?: string
): Promise<ShippingOption[]> {
  const url = zipCode ? `/api/shipping?zipCode=${zipCode}` : "/api/shipping";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar opções de frete");
  }
  return response.json();
}

// Função para calcular total com frete
export async function calculateCartTotal(
  shippingOptionId: string
): Promise<CartSummary> {
  const response = await fetch("/api/cart/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shippingOptionId }),
  });
  if (!response.ok) {
    throw new Error("Erro ao calcular total");
  }
  return response.json();
}
