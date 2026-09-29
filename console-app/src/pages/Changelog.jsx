// 更新日志数据（按版本倒序）
const RELEASES = [
  {
    version: 'v1.0.0',
    date: '2026-09-29',
    items: [
      'ULM 长期记忆引擎正式发布',
      '支持记忆写入、检索、列出、删除与问答接口',
      '双时态版本链 + vigilance 防幻觉拒答',
      '开发者控制台上线：API Key 管理与问答演示',
    ],
  },
]

/**
 * 更新日志页：展示版本与变更条目
 */
export default function Changelog() {
  return (
    <div className="page">
      <h2 className="page-title">更新日志</h2>
      <p className="page-desc">记录每次版本发布的功能与变更。</p>

      {RELEASES.map((r) => (
        <section key={r.version} className="release">
          <div className="release-head">
            <h3>{r.version}</h3>
            <span className="release-date">{r.date}</span>
          </div>
          <ul className="release-items">
            {r.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
