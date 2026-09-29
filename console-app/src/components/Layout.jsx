import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { api, clearToken } from '../api.js'

// 侧边导航项配置
const NAV_ITEMS = [
  { to: '/', label: '控制台', end: true },
  { to: '/keys', label: 'API Keys', end: false },
  { to: '/about', label: '关于', end: false },
  { to: '/changelog', label: '更新日志', end: false },
]

/**
 * 控制台整体布局：顶部栏（用户信息 + 退出）+ 侧边导航 + 内容区
 */
export default function Layout() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  // 进入布局时拉取当前用户信息
  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => {
        // token 失效时清理并回到登录页
        clearToken()
        navigate('/login')
      })
  }, [navigate])

  // 退出登录：清 token 后回登录页
  const handleLogout = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Sophon Console</div>
        <nav>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <span className="welcome">
            {user ? `你好，${user.display_name || user.email}` : '加载中…'}
          </span>
          <button type="button" className="btn-logout" onClick={handleLogout}>
            退出登录
          </button>
        </header>

        {/* 子路由内容渲染处 */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
