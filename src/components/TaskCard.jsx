import { useRef, useState } from 'react'
import { CalendarDays, Check, ChevronDown, Clock3, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

const statusClass = (status) => status.toLowerCase().replaceAll(' ', '-')

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const actionButtonRef = useRef(null)
  const due = task.dueDate ? new Date(`${task.dueDate}T00:00:00`) : null
  const overdue = due && due < new Date(new Date().setHours(0, 0, 0, 0)) && task.status !== 'Completed'
  const formattedDue = due ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(due) : 'No due date'

  return <article className={`task-card ${task.status === 'Completed' ? 'is-complete' : ''}`}>
    <button type="button" className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`} onClick={() => onStatusChange(task.id, task.status === 'Completed' ? 'To do' : 'Completed')} aria-label={task.status === 'Completed' ? `Mark ${task.title} as to do` : `Mark ${task.title} complete`}>{task.status === 'Completed' && <Check size={13} />}</button>
    <div className="task-main">
      <div className="task-heading"><h3>{task.title}</h3><span className="task-category">{task.category}</span></div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-meta"><span className={`status-pill ${statusClass(task.status)}`}><i />{task.status}</span><span className={`priority-pill ${task.priority.toLowerCase()}`}><span />{task.priority}</span><span className={`due-date ${overdue ? 'overdue' : ''}`}><CalendarDays size={14} />{formattedDue}{overdue && <b>Overdue</b>}</span></div>
    </div>
    <div className="task-actions">
      <label className="status-control"><Clock3 size={14} /><span className="sr-only">Update status for {task.title}</span><select value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}><option>To do</option><option>In progress</option><option>Completed</option></select><ChevronDown size={13} /></label>
      <div className="task-action-menu"><button ref={actionButtonRef} type="button" className="icon-button" aria-label={`Actions for ${task.title}`} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><MoreHorizontal size={18} /></button>{menuOpen && <div className="task-menu" role="menu"><button type="button" role="menuitem" onClick={() => { setMenuOpen(false); onEdit(task, actionButtonRef.current) }}><Pencil size={14} />Edit</button><button type="button" role="menuitem" className="delete-action" onClick={() => { setMenuOpen(false); onDelete(task) }}><Trash2 size={14} />Delete</button></div>}</div>
    </div>
  </article>
}
