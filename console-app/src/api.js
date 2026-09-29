// ============================================================
// API 客户端：封装后端请求，统一鉴权与错误处理
// - 登录态：JWT 存 localStorage
// - 通过 Vite 代理访问 /v1，避免跨域
// ============================================================

const TOKEN_KEY = 'sophon_token'

// 读取/写入登录令牌
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY))
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * 通用请求：自动带 Authorization: Bearer <token>
 * @param {string} path 如 /v1/auth/login
 * @param {object} options { method, body, token? }  token 可覆盖默认
 */
export async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const useToken = token ?? getToken()
  if (useToken) headers.Authorization = `Bearer ${useToken}`

  const res = await fetch(path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  // 204 无内容
  if (res.status === 204) return null

  let data = null
  const text = await res.text()
  try { data = text ? JSON.parse(text) : null } catch { data = text }

  if (!res.ok) {
    // 统一错误信息提取（FastAPI 的 detail 可能是字符串或数组）
    let msg = `请求失败（${res.status}）`
    if (data) {
      if (typeof data.detail === 'string') msg = data.detail
      else if (Array.isArray(data.detail) && data.detail[0]) msg = data.detail[0].msg || msg
      else if (data.error) msg = data.error
      else if (data.message) msg = data.message
    }
    const err = new Error(msg)
    err.status = res.status
    throw err
  }
  return data
}

// 便捷方法
export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),

  // 认证
  login: (email, password) => request('/v1/auth/login', { method: 'POST', body: { email, password } }),
  register: (email, password, displayName) =>
    request('/v1/auth/register', { method: 'POST', body: { email, password, display_name: displayName } }),
  me: () => request('/v1/auth/me'),

  // API Key
  listKeys: () => request('/v1/api-keys'),
  createKey: (name) => request('/v1/api-keys', { method: 'POST', body: { name } }),
  revokeKey: (id) => request(`/v1/api-keys/${id}`, { method: 'DELETE' }),

  // 记忆
  addMemory: (data) => request('/v1/memory/add', { method: 'POST', body: data }),
  searchMemory: (data) => request('/v1/memory/search', { method: 'POST', body: data }),
  listMemory: (data) => request('/v1/memory/list', { method: 'POST', body: data }),
  deleteMemory: (id) => request(`/v1/memory/${id}`, { method: 'DELETE' }),
  answer: (data) => request('/v1/memory/answer', { method: 'POST', body: data }),

  // 健康检查（无需鉴权）
  health: () => request('/health'),
}
