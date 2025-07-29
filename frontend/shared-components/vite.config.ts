import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name:'sharedComponents',
      filename:'remoteEntry.js',
      exposes:{
        './Navbar':'./src/components/navbar.tsx',
        './Sidebar':'./src/components/sidebar.tsx',
        './Store':'./src/store.ts'
      },
      shared:['react','react-dom','react-redux','@reduxjs/toolkit','react-router-dom']
    })
  ],
  build:{
    target:'esnext'
  }
})
