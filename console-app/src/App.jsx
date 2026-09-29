import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import About from './pages/About.jsx'
import ApiKeys from './pages/ApiKeys.jsx'
import Changelog from './pages/Changelog.jsx'
import ConsoleHome from './pages/ConsoleHome.jsx'
import Login from './pages/Login.jsx'
import { getToken } from './api.js'

/**
 * 路由守卫：未登录（无 token）一律重定向到 /login
 */
function RequireAuth({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />
}

// 路由表：/login 公开，其余受保护并套用 Layout
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        {/* 控制台首页 */}
        <Route index element={<ConsoleHome />} />
        {/* API Key 管理 */}
        <Route path="keys" element={<ApiKeys />} />
        {/* 关于 */}
        <Route path="about" element={<About />} />
        {/* 更新日志 */}
        <Route path="changelog" element={<Changelog />} />
      </Route>
      {/* 兜底：未知路径回首页 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
