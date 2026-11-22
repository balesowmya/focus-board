import { ArrowDownRight, ArrowUpRight, Check, Circle, ListTodo } from 'lucide-react'

const icons = { total: ListTodo, progress: Circle, completed: Check, rate: ArrowUpRight }
export default function StatCard({ label, value, caption, detail, tone, trend }) {
  const Icon = icons[tone] || ListTodo
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18} /></div><div className="stat-copy"><span className="stat-label">{label}</span><div className="stat-value-row"><strong>{value}</strong>{trend && <span className="stat-trend"><ArrowDownRight size={13} /> {trend}</span>}</div><span className="stat-caption">{caption}</span>{detail && <span className="stat-detail">{detail}</span>}</div></article>
}
