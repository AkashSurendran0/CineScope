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
      name:'yourReviewApp',
      filename:'remoteEntry.js',
      exposes:{
        './YourReview':'./src/App.jsx'
      },
      shared:['react', 'react-dom', 'react-router-dom', 'react-redux']
    })
  ],
  build:{
    target:'esnext'
  }
})
