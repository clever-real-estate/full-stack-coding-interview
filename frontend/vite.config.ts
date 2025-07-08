import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), AutoImport({ dts: true, imports: ["react"] }), tailwindcss(), svgr()],
});
