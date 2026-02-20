import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/bloomher/',   // ← change 'bloomher' to your exact GitHub repo name
})
