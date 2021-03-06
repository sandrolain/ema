import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dynamicImportVars({
      include: [
        "./src/assets/music/*.mp3",
        "./src/assets/sounds/*.mp3"
      ]
    })
  ],
  assetsInclude: ["**/*.mp3"]
})
