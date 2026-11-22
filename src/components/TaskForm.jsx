import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const blank = { title: '', description: '', category: 'Others', status: 'To do', priority: 'Medium', dueDate: '' }
const categories = ['Others', 'Design', 'Development', 'Content', 'Product', 'Marketing', 'Operations', 'Research']

export default function TaskForm({ task, onSave, onClose, returnFocusRef }) {
  const [form, setForm] = useState(() => task ? { ...blank, ...task } : blank)
  const [error, setError] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    const opener = returnFocusRef?.current
    dialogRef.current?.querySelector('input[name="title"]')?.focus()
    return () => {
      if (opener?.isConnected) opener.focus()
    }
  }, [returnFocusRef])

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
      event.preventDefault()
      first.focus()
    }
  }

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    if (event.target.name === 'title' && error) setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('Enter a task title before saving.')
      return
    }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section ref={dialogRef} className="task-dialog" role="dialog" aria-modal="true" aria-labelledby="form-title" onKeyDown={handleDialogKeyDown}>
      <div className="dialog-header">
        <div><h2 id="form-title">{task ? 'Edit task' : 'Create New Task'}</h2><p>Add your task details to stay on top of your work.</p></div>
        <button type="button" className="dialog-close" aria-label="Close form" onClick={onClose}><X size={17} /></button>
      </div>
      <form onSubmit={submit} noValidate>
        <label className="form-field full"><span>Task Title <b>*</b></span><input autoFocus required name="title" value={form.title} onChange={update} placeholder="e.g. Update pricing page" aria-describedby={error ? 'title-error' : 'title-hint'} aria-invalid={Boolean(error)} /><small id="title-hint" className="field-hint">Required field</small>{error && <small id="title-error" className="field-error" role="alert">{error}</small>}</label>
        <label className="form-field full"><span>Description</span><textarea name="description" rows="2" value={form.description} onChange={update} placeholder="Add notes about this task..." /></label>
        <div className="form-grid">
          <label className="form-field"><span>Category</span><select name="category" value={form.category} onChange={update}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="form-field"><span>Priority</span><select name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <label className="form-field"><span>Status</span><select name="status" value={form.status} onChange={update}><option>To do</option><option>In progress</option><option>Completed</option></select></label>
          <label className="form-field"><span>Due Date</span><input type="date" name="dueDate" value={form.dueDate || ''} onChange={update} /></label>
        </div>
        <div className="form-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{task ? 'Save Task' : 'Create task'}</button></div>
      </form>
    </section>
  </div>
}
