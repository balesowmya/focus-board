import { useMemo, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatCard from './components/StatCard'
import FocusNotes from './components/FocusNotes'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
import { sampleTasks } from './data/sampleTasks'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css'

function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard.tasks', sampleTasks)
  const [statusFilter, setStatusFilter] = useState('All tasks')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [activeView, setActiveView] = useState('Overview')
  const [showAllTasks, setShowAllTasks] = useState(false)
  const formTriggerRef = useRef(null)

  const inProgress = tasks.filter((task) => task.status === 'In progress').length
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0
  const counts = { 'All tasks': tasks.length, 'In progress': inProgress, Completed: completed }
  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesStatus = statusFilter === 'All tasks' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter
    const matchesSearch = task.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
    return matchesStatus && matchesPriority && matchesSearch
  }), [tasks, statusFilter, priorityFilter, search])

  const openCreate = (trigger) => { formTriggerRef.current = trigger; setEditingTask(null); setFormOpen(true) }
  const openEdit = (task, trigger) => { formTriggerRef.current = trigger; setEditingTask(task); setFormOpen(true) }
  const saveTask = (data) => {
    if (editingTask) setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...task, ...data } : task))
    else setTasks((current) => [{ ...data, id: globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}` }, ...current])
    setFormOpen(false); setEditingTask(null)
  }
  const deleteTask = (task) => {
    if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) setTasks((current) => current.filter((item) => item.id !== task.id))
  }
  const updateStatus = (id, status) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task))
  const navigate = (view) => {
    setActiveView(view)
    if (view === 'Calendar') {
      setStatusFilter('All tasks')
      setPriorityFilter('All')
      setSearch('')
      setShowAllTasks(true)
    }
    document.getElementById(view === 'Overview' ? 'dashboard' : 'tasks')?.scrollIntoView({ behavior: 'smooth' })
  }
  const visibleTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 3)

  return <div className="app-shell"><Sidebar activeView={activeView} taskCount={tasks.length} onNavigate={navigate} /><main className="main-area" id="dashboard"><Header onCreateTask={openCreate} onNavigate={navigate} /><div className="dashboard-content">
      <section className="focus-section"><FocusNotes task={tasks.find((task) => task.status !== 'Completed') ?? tasks[0]} /></section>
      <section className="stats-grid" aria-label="Task statistics"><StatCard label="Total tasks" value={tasks.length} caption="Across all projects" tone="total" /><StatCard label="In progress" value={inProgress} caption="Keep the momentum" tone="progress" /><StatCard label="Completed" value={completed} caption="Great work this week" detail={`${completionRate}% complete`} tone="completed" /></section>
      <section className="tasks-section" id="tasks"><div className="tasks-heading"><div><h2>My tasks</h2><p className="tasks-subtitle">Manage and track everything in one place.</p></div><button type="button" className="text-link" onClick={() => { setShowAllTasks((current) => !current); setStatusFilter('All tasks'); setPriorityFilter('All'); setSearch('') }}>{showAllTasks ? 'Show fewer' : 'View all tasks'} <ArrowRight size={15} /></button></div><div className="task-panel"><div className="task-panel-top"><FilterTabs active={statusFilter} onChange={(filter) => { setStatusFilter(filter); setShowAllTasks(true) }} priority={priorityFilter} onPriorityChange={(priority) => { setPriorityFilter(priority); setShowAllTasks(true) }} counts={counts} /><SearchBar value={search} onChange={(value) => { setSearch(value); setShowAllTasks(true) }} /></div><TaskList tasks={visibleTasks} onEdit={openEdit} onDelete={deleteTask} onStatusChange={updateStatus} hasFilters={Boolean(search || priorityFilter !== 'All' || statusFilter !== 'All tasks')} /></div></section>
    </div></main>{formOpen && <TaskForm task={editingTask} returnFocusRef={formTriggerRef} onSave={saveTask} onClose={() => { setFormOpen(false); setEditingTask(null) }} />}</div>
}

export default App
