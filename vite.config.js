import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        services: resolve(__dirname, "services.html"),
        infos: resolve(__dirname, "infos.html"),
        mentions: resolve(__dirname, "mentions-legales.html"),
        confidentialite: resolve(__dirname, "confidentialite.html"),
      },
    },
  },
});
