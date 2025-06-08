/// <reference types="vite/client" />

import { defineConfig } from "vite";
// @ts-ignore
import react from "@vitejs/plugin-react-swc";
// @ts-ignore
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));