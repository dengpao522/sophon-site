import { useState } from 'react'

import { api } from '../api.js'

/**
 * 控制台首页：快速问答演示 + 最近记忆概览
 */
export default function ConsoleHome() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 发起问答：后端检索记忆并生成回答
  const handleAsk = async (e) => {
    e.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    setError('')
    setAnswer(null)
    try {
      // 控制台问答固定用 demo 业务用户标识
      const data = await api.answer({ user_id: 'user_001', question: question.trim() })
      setAnswer(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">控制台</h2>
      <p className="page-desc">基于 ULM 长期记忆的问答演示：提问会先检索记忆，证据不足时拒答。</p>

      <form className="ask-box" onSubmit={handleAsk}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：公司总部现在在哪里？"
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '思考中…' : '提问'}
        </button>
      </form>

      {error && <div className="form-error">{error}</div>}

      {answer && (
        <div className="answer-panel">
          <div className="answer-text">{answer.answer}</div>
          <div className="answer-meta">
            可信判定：
            <span className={'badge ' + answer.vigilance}>{answer.vigilance}</span>
            <span className="hit-count">命中记忆 {answer.results.length} 条</span>
          </div>

          {answer.results.length > 0 && (
            <ul className="hit-list">
              {answer.results.map((m) => (
                <li key={m.memory_id}>
                  <span className="hit-content">{m.content}</span>
                  <span className="hit-score">{m.score}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
