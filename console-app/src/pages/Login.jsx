import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api, setToken } from '../api.js'

/**
 * 登录页：邮箱 + 密码，登录成功存 token 并进入控制台
 */
export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(email.trim(), password)
      setToken(data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Sophon AI 控制台</h1>
        <p className="login-subtitle">登录以管理 API Key 与长期记忆</p>

        <label className="field">
          <span>邮箱</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="field">
          <span>密码</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="至少 8 位"
            required
          />
        </label>

        {error && <div className="form-error">{error}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '登录中…' : '登 录'}
        </button>

        <p className="login-hint">演示账号 demo@sophonai.cn / sophon-demo-2026</p>
      </form>
    </div>
  )
}
