import { defineConfig } from 'vite';

export default defineConfig({
  // 生成过程中的色键底图留在 public 目录作为可追溯源文件，但不打包到网页。
  publicDir: false
});
