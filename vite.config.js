import { defineConfig } from 'vite';
import { svgstore } from "./src/vite_plugins/svgstore";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgstore()]
})
