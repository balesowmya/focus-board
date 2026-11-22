import { useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, CircleCheck, Sparkles } from 'lucide-react'

const slides = [
  { title: 'Make today count.', subtitle: 'A little focus goes a long way.' },
  { title: 'Small steps, big progress.', subtitle: 'Keep your priorities moving forward.' },
  { title: 'Celebrate the wins.', subtitle: 'Every completed task moves you forward.' },
]

export default function FocusNotes({ task }) {
  const [active, setActive] = useState(0)
  const slide = slides[active]
  const dueDate = task?.dueDate
    ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${task.dueDate}T00:00:00`))
    : 'No due date'
  const change = (delta) => setActive((current) => (current + delta + slides.length) % slides.length)

  return <section className="focus-note" aria-label="Focus Notes carousel">
    <div className="focus-note-main">
      <div className="focus-note-label"><span><Sparkles size={14} /> FOCUS NOTES</span><span className="note-index">0{active + 1} / 03</span></div>
      <h2>{slide.title}</h2>
      <p>{slide.subtitle}</p>
      <div className="carousel-controls">
        <button type="button" aria-label="Previous focus note" onClick={() => change(-1)}><ArrowLeft size={16} /></button>
        <div className="carousel-dots" role="group" aria-label="Select focus note">{slides.map((item, index) => <button key={item.title} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={active === index ? 'true' : undefined} className={active === index ? 'selected' : ''} onClick={() => setActive(index)} />)}</div>
        <button type="button" aria-label="Next focus note" onClick={() => change(1)}><ArrowRight size={16} /></button>
      </div>
    </div>
    <aside className="note-task-preview" aria-label="Next task">
      <span className="preview-label">UP NEXT</span>
      {task ? <><div className="preview-task-top"><span className="preview-category">{task.category}</span><span className={`priority-pill ${task.priority.toLowerCase()}`}><span />{task.priority}</span></div><strong>{task.title}</strong><div className="preview-task-footer"><span><CalendarDays size={13} />{dueDate}</span><span><CircleCheck size={13} />{task.status}</span></div></> : <p>No tasks yet. Add one when you are ready.</p>}
    </aside>
  </section>
}
