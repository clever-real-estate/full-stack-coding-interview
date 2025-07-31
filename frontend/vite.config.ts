/// <reference types="vitest" />
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), viteReact(), tailwindcss()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
    reporters: ["verbose", "html"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: [],
    },
  },

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
