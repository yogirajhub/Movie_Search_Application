import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Movie_Search_Application/', // 👈 Must match your GitHub repo name
  plugins: [react()],
})
