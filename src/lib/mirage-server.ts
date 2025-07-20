import { Server } from "miragejs";
import { makeServer } from "./mirage";

let server: Server | null = null;

export function startMirage(): Promise<Server | null> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window !== "undefined" && !server) {
        // Automatically detect the environment
        const environment = process.env.NODE_ENV || "development";
        server = makeServer({ environment });

        // Ensure server is fully initialized
        if (server) {
          console.log("Mirage server initialized successfully");
          resolve(server);
        } else {
          reject(new Error("Failed to create Mirage server"));
        }
      } else {
        resolve(server);
      }
    } catch (error) {
      console.error("Error initializing Mirage:", error);
      reject(error);
    }
  });
}

export function stopMirage() {
  if (server) {
    server.shutdown();
    server = null;
  }
}
