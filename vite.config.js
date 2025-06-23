import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const REPO_NAME = 'SS14-doc-editor'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  build: {
    outDir: 'dist'
  }
})
