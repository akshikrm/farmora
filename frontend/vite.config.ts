import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@api": path.resolve(__dirname, "./src/api"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@app-types": path.resolve(__dirname, "./src/types"),
			"@errors": path.resolve(__dirname, "./src/errors"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@store": path.resolve(__dirname, "./src/store")
		},
	},
	plugins: [react(), tailwindcss()],
});
