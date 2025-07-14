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
