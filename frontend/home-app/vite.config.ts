import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      remotes:{
        sharedComp:'http://localhost:3010/assets/remoteEntry.js'
      },
      name:'HomeApp',
      filename:'remoteEntry.js',
      exposes:{
        './Home':'./src/App.tsx'
      },
      shared:['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'react-router-dom']
    })
  ],
  build:{
    target:'esnext'
  }
})
