import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name:'profileApp',
      filename:'remoteEntry.js',
      exposes:{
        './Profile':'./src/App.tsx'
      },
      shared:['react','react-redux','react-dom', 'react-router-dom'],
      remotes:{
        sharedComp:'http://localhost:3010/assets/remoteEntry.js'
      }
    })
  ],
  build:{
    target:'esnext'
  }
})
