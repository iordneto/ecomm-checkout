import { Server } from "miragejs";
import { makeServer } from "./mirage";

let server: Server | null = null;

export function startMirage() {
  if (typeof window !== "undefined" && !server) {
    server = makeServer({ environment: "development" });
  }
  return server;
}

export function stopMirage() {
  if (server) {
    server.shutdown();
    server = null;
  }
}
