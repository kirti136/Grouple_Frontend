import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: "../Grouple_Backend/public",
//     assetsDir: ".",
//     rollupOptions: {
//       input: {
//         main: path.resolve(
//           path.dirname(import.meta.url).replace(/^file:\/\/\//, ""),
//           "index.html"
//         ),
//       },
//     },
//   },
// });
