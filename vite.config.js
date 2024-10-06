import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@popperjs/core": "@popperjs/core/dist/umd/popper.min.js",
    },
  },
});
