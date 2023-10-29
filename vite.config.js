import { defineConfig } from "vite"; 

export default defineConfig({
  base:"./PixelCameraUnit/",
  root: "src",
  build: {
    outDir:"../docs",
    emptyOutDir: true,
    }
})