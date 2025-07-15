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
        './Navbar':'./src/components/navbar.jsx',
        './Sidebar':'./src/components/sidebar.jsx',
        './Store':'./src/store.js'
      },
      shared:['react','react-dom','react-redux','@reduxjs/toolkit']
    })
  ],
  build:{
    target:'esnext'
  }
})
