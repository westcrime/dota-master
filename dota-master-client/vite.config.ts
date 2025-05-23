import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000",
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
