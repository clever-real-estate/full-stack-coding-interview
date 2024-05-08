import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
