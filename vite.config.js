import { defineConfig } from "vite"; 

export default defineConfig({
  base:'./PixelCameraUnit/',
  //base:'',
  root: "src",
  build: {
    outDir:"../docs",
    emptyOutDir: true,
    }
})