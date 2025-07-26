import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name:'addReviewApp',
      filename:'remoteEntry.js',
      exposes:{
        './AddReview':'./src/App.jsx'
      },
      remotes:{
        sharedComp:'http://localhost:3010/assets/remoteEntry.js'
      },
      shared:['react','react-dom','react-redux','@reduxjs/toolkit', 'react-router-dom']
    })
  ],
  build:{
    target:'esnext'
  }
})
