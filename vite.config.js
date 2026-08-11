import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves this repository from /moyu-wallet/.
  // Local development and the existing Sites deployment continue to use /.
  base: process.env.GITHUB_ACTIONS ? '/moyu-wallet/' : '/',
  publicDir: false,
});
