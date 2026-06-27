import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { compression } from "vite-plugin-compression2";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    compression({ algorithms: ["gzip", "brotliCompress"], exclude: [/\.(br|gz)$/] }),
  ],
  build: {
    cssMinify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        services: resolve(__dirname, "services.html"),
        infos: resolve(__dirname, "infos.html"),
        mentions: resolve(__dirname, "mentions-legales.html"),
        confidentialite: resolve(__dirname, "confidentialite.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});
