import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import preserveDirectives from "rollup-plugin-preserve-directives";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        hooks: resolve(__dirname, "src/hooks/index.ts"),
        components: resolve(__dirname, "src/components/index.ts"),
        "components/server": resolve(__dirname, "src/components/server.ts"),
        "store/selectors": resolve(__dirname, "src/store/selectors.ts"),
      },
      formats: ["es"],
      // fileName: (format, entryName) => `${entryName}.js`,
    },
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: true,
      },
      plugins: [preserveDirectives()],
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    dts({
      outDir: "dist",
      include: ["src"],
      exclude: ["node_modules", "dist"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
