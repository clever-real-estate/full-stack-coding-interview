import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), viteReact(), tailwindcss()],

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
