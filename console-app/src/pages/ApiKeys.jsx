import { api } from '../api.js'
import { useEffect, useState } from 'react'

/**
 * API Keys 管理页：列出 / 创建 / 吊销密钥
 */
export default function ApiKeys() {
  const [keys, setKeys] = useState([])
  const [name, setName] = useState('')
  const [newKey, setNewKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 拉取密钥列表
  const load = () => {
    api.listKeys().then(setKeys).catch((e) => setError(e.message))
  }
  useEffect(load, [])

  // 创建新密钥，明文仅显示一次
  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.createKey(name || '默认密钥')
      setNewKey(data.api_key)
      setName('')
      load()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 吊销密钥
  const handleRevoke = async (id) => {
    setError('')
    try {
      await api.revokeKey(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">API Keys</h2>
      <p className="page-desc">用于以开发者身份调用记忆接口。明文密钥仅创建时显示一次，请立即保存。</p>

      <form className="key-create" onSubmit={handleCreate}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="密钥名称，如 生产环境"
          maxLength={64}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '创建中…' : '创建 Key'}
        </button>
      </form>

      {newKey && (
        <div className="new-key-box">
          <span>请立即复制保存：</span>
          <code>{newKey}</code>
        </div>
      )}

      {error && <div className="form-error">{error}</div>}

      <table className="key-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>前缀</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k.id}>
              <td>{k.name}</td>
              <td>{k.key_prefix}</td>
              <td>{k.is_active ? '启用中' : '已吊销'}</td>
              <td>{k.created_at ? k.created_at.slice(0, 10) : ''}</td>
              <td>
                {k.is_active && (
                  <button type="button" className="btn-danger" onClick={() => handleRevoke(k.id)}>
                    吊销
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {keys.length === 0 && <p className="empty-tip">暂无 API Key</p>}
    </div>
  )
}
