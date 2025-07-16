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
        homeApp:'http://localhost:3001/assets/remoteEntry.js',
        addReviewApp:'http://localhost:3002/assets/remoteEntry.js',
        yourReviewApp:'http://localhost:3003/assets/remoteEntry.js',
        profileApp:'http://localhost:3004/assets/remoteEntry.js'
      },
      shared:['react','react-redux', 'react-dom','react-router-dom']
    })
  ],
  build:{
    target:'esnext'
  }
})
