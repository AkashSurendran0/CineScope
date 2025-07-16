import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name:'Auth-app',
      filename:'remoteEntry.js',
      exposes:{
        './LoginPage':'./src/App.jsx'
      },
      shared:['react','react-redux', 'react-router-dom']
    })
  ],
  build:{
    target:'esnext'
  }
})
