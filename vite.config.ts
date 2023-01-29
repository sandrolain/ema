import { defineConfig } from "vite";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'index.html',
      formats: ['es'],
    }
  },
  plugins: [
    dynamicImportVars({
      include: [
        "./src/assets/music/*.mp3",
        "./src/assets/sounds/*.mp3"
      ]
    })
  ],
  assetsInclude: ["**/*.mp3"]
})
