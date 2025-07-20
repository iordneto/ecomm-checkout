import { createServer, Factory, Model } from "miragejs";

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
}

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      product: Model,
      address: Model,
      shippingOption: Model,
    },

    factories: {
      product: Factory.extend({
        name(i: number) {
          return `Product #${i + 1}`;
        },
        price() {
          return Math.floor(Math.random() * 100000) + 10000;
        },
        image() {
          return "https://placehold.co/51x64/png";
        },
        quantity() {
          return 1;
        },
      }),
    },

    seeds(server) {
      /* PRODUCTS */
      server.create("product", {
        id: "1",
        name: "Product #1",
        price: 10000,
        image: "https://placehold.co/51x64/png",
        quantity: 1,
      });

      server.create("product", {
        id: "2",
        name: "Product #2",
        price: 15000,
        image: "https://placehold.co/51x64/png",
        quantity: 1,
      });

      /* SHIPPING OPTIONS */
      server.create("shippingOption", {
        id: "1",
        title: "Pickup at MUNDALUA Castle",
        description: "Miguel Perrela Avenue, 455 - Castle",
        price: 0,
        deliveryTime: "Immediate",
        isSelected: true,
      });

      server.create("shippingOption", {
        id: "2",
        title: "Express Shipping",
        description: "Delivery in 3 business days",
        price: 1000,
        deliveryTime: "3 business days",
      });

      server.create("shippingOption", {
        id: "3",
        title: "Standard Shipping",
        description: "Delivery in 5 business days",
        price: 500,
        deliveryTime: "5 business days",
      });

      server.create("shippingOption", {
        id: "4",
        title: "Next Day Delivery",
        description: "Delivery in 1 business day",
        price: 2000,
        deliveryTime: "1 business day",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/cart", () => {
        const products = this.schema.all("product");
        const subtotal = products.models.reduce(
          (sum: number, product) =>
            sum + product.attrs.price * product.attrs.quantity,
          0
        );

        const shippingPrice = 5000;

        return {
          products: products.models,
          subtotal,
          shipping: shippingPrice,
          total: subtotal + shippingPrice,
        };
      });

      /* GET ADDRESS */
      this.get("/address/:zipCode", (schema, request) => {
        const { zipCode } = request.params;

        const addresses: Record<string, Partial<Address>> = {
          "01310100": {
            country: "United States",
            state: "CA",
            city: "Los Angeles",
            neighborhood: "Downtown",
            street: "Main Street",
          },
          "20040020": {
            country: "United States",
            state: "NY",
            city: "New York",
            neighborhood: "Manhattan",
            street: "Broadway",
          },
          "30112000": {
            country: "United States",
            state: "TX",
            city: "Houston",
            neighborhood: "Downtown",
            street: "Main Street",
          },
          "88048644": {
            country: "United States",
            state: "FL",
            city: "Miami",
            neighborhood: "South Beach",
            street: "Ocean Drive",
          },
        };

        console.log("zipcode", zipCode);

        const addressData = addresses[zipCode] || {
          country: "United States",
          state: "CA",
          city: "Los Angeles",
          neighborhood: "Downtown",
          street: "Main Street",
        };

        return {
          zipCode,
          ...addressData,
          status: 200,
        };
      });

      /* GET SHIPPING OPTIONS */
      this.get("/shipping", () => {
        const shippingOptions = this.schema.all("shippingOption").models;

        return shippingOptions;
      });

      /* CALCULATE CART */
      this.post("/cart/calculate", (schema, request) => {
        const { shippingOptionId } = JSON.parse(request.requestBody);
        const products = this.schema.all("product");
        const shippingOption = this.schema.find(
          "shippingOption",
          shippingOptionId
        );

        const subtotal = products.models.reduce(
          (sum: number, product) =>
            sum + product.attrs.price * product.attrs.quantity,
          0
        );

        const shippingPrice = 50000;

        return {
          products: products.models,
          subtotal,
          shipping: shippingPrice,
          total: subtotal + shippingPrice,
          shippingOption: shippingOption || null,
        };
      });

      /* PASSTHROUGH */
      this.passthrough();
    },
  });

  return server;
}
