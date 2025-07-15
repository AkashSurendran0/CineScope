import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes:{
        authApp:'http://localhost:3000/assets/remoteEntry.js',
        homeApp:'http://localhost:3001/assets/remoteEntry.js'
      },
      shared:['react','react-redux', 'react-dom']
    })
  ],
  build:{
    target:'esnext'
  }
})
