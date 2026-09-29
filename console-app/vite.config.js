import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 配置
// - 开发环境把 /v1 与 /health 代理到后端 8080，前端统一用相对路径，避免跨域
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // 双栈监听（127.0.0.1 与 [::1]），避免 localhost 解析差异导致打不开
    port: 5178,
    proxy: {
      // 后端所有接口都挂在 /v1 与 /health 下
      '/v1': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
})
