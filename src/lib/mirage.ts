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
          return `Produto #${i + 1}`;
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
        name: "Produto #1",
        price: 100000,
        image: "https://placehold.co/51x64/png",
        quantity: 1,
      });

      server.create("product", {
        id: "2",
        name: "Produto #2",
        price: 15000,
        image: "https://placehold.co/51x64/png",
        quantity: 1,
      });

      /* SHIPPING OPTIONS */
      server.create("shippingOption", {
        id: "1",
        title: "Pedido a ser retirado em MUNDALUA Castelo",
        description: "Avenida Miguel Perrela, 455 - Castelo",
        price: 0,
        deliveryTime: "Imediato",
        isSelected: true,
      });

      server.create("shippingOption", {
        id: "2",
        title: "Sedex",
        description: "Entrega em 3 dias úteis",
        price: 1000,
        deliveryTime: "3 dias úteis",
      });

      server.create("shippingOption", {
        id: "3",
        title: "PAC",
        description: "Entrega em 5 dias úteis",
        price: 500,
        deliveryTime: "5 dias úteis",
      });

      server.create("shippingOption", {
        id: "4",
        title: "Entrega Expressa",
        description: "Entrega em 1 dia útil",
        price: 2000,
        deliveryTime: "1 dia útil",
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

        return {
          products: products.models,
          subtotal,
          shipping: 0,
          total: subtotal,
        };
      });

      /* GET ADDRESS */
      this.get("/address/:zipCode", (schema, request) => {
        const { zipCode } = request.params;

        const addresses: Record<string, Partial<Address>> = {
          "01310100": {
            country: "Brasil",
            state: "SP",
            city: "São Paulo",
            neighborhood: "Bela Vista",
            street: "Avenida Paulista",
          },
          "20040020": {
            country: "Brasil",
            state: "RJ",
            city: "Rio de Janeiro",
            neighborhood: "Centro",
            street: "Avenida Rio Branco",
          },
          "30112000": {
            country: "Brasil",
            state: "MG",
            city: "Belo Horizonte",
            neighborhood: "Centro",
            street: "Avenida Afonso Pena",
          },
          "88048644": {
            country: "Brasil",
            state: "SC",
            city: "Florianópolis",
            neighborhood: "Jardim das Flores",
            street: "Rua das Flores",
          },
        };

        console.log("zipcode", zipCode);

        const addressData = addresses[zipCode] || {
          country: "Brasil",
          state: "SP",
          city: "São Paulo",
          neighborhood: "Jardim Paulista",
          street: "Avenida Paulista",
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
