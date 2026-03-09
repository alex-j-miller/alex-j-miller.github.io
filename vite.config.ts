import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(() => {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const owner = process.env.GITHUB_REPOSITORY_OWNER
  const isUserSiteRepo =
    !!repo && !!owner && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`

  const base = process.env.VITE_BASE_PATH ?? (repo && !isUserSiteRepo ? `/${repo}/` : '/')

  return {
    plugins: [react(), tailwindcss()],
    base,
  }
})
