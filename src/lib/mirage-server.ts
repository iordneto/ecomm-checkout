import { Server } from "miragejs";
import { makeServer } from "./mirage";

let server: Server | null = null;

export function startMirage() {
  if (typeof window !== "undefined" && !server) {
    // Detectar o ambiente automaticamente
    const environment = process.env.NODE_ENV || "development";
    server = makeServer({ environment });
  }
  return server;
}

export function stopMirage() {
  if (server) {
    server.shutdown();
    server = null;
  }
}
