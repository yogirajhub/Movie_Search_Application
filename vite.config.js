import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Movie_Search_Application/',  // 👈 This fixes asset paths
  plugins: [react()],
})
