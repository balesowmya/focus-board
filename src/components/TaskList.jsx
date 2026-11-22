import { ClipboardList } from 'lucide-react'
import TaskCard from './TaskCard'
export default function TaskList({ tasks, onEdit, onDelete, onStatusChange, hasFilters }) {
  if (!tasks.length) return <div className="empty-state"><span><ClipboardList size={23} /></span><h3>{hasFilters ? 'No tasks match your filters' : 'A clear space to begin'}</h3><p>{hasFilters ? 'Try a different search or filter.' : 'Create your first task and get your day moving.'}</p></div>
  return <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />)}</div>
}
