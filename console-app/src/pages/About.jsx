/**
 * 关于页：产品简介与技术架构说明
 */
export default function About() {
  return (
    <div className="page">
      <h2 className="page-title">关于 Sophon AI</h2>
      <p className="page-desc">
        Sophon AI 是基于 ULM（User Long-term Memory）架构的长期记忆服务，
        把非结构化对话蒸馏为带版本、带时效、可追溯的结构化记忆。
      </p>

      <div className="about-grid">
        <section className="about-card">
          <h3>双时态记忆</h3>
          <p>每条记忆携带有效区间，同属性新事实自动 supersede 旧版本，支持「当时」与「现在」两种视角查询。</p>
        </section>

        <section className="about-card">
          <h3>防幻觉拒答</h3>
          <p>检索证据不足时直接拒答（vigilance=refuse），不编造未记录的信息。</p>
        </section>

        <section className="about-card">
          <h3>混合检索</h3>
          <p>词面重叠与 pgvector 向量语义检索经 RRF 融合，中英文均有良好召回。</p>
        </section>

        <section className="about-card">
          <h3>技术栈</h3>
          <p>FastAPI + PostgreSQL + pgvector，前端 React + Vite。</p>
        </section>
      </div>
    </div>
  )
}
