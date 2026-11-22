import { CalendarDays, CheckSquare, ChevronDown, LayoutDashboard, Settings } from 'lucide-react'

export default function Sidebar({ activeView = 'Overview', onNavigate = () => {}, taskCount = 0 }) {
  const items = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My tasks', icon: CheckSquare },
    { label: 'Calendar', icon: CalendarDays },
    { label: 'Settings', icon: Settings },
  ]

  return <><aside className="sidebar">
    <a className="brand" href="#dashboard" aria-label="FocusBoard home"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><span>FocusBoard</span></a>
    <p className="brand-tagline">Your work, in focus.</p>
    <div className="workspace-label">WORKSPACE <ChevronDown size={13} /></div>
    <nav aria-label="Main navigation" className="side-nav">
      {items.map(({ label, icon: Icon }) => <button key={label} type="button" aria-label={label} aria-current={activeView === label ? 'page' : undefined} className={`nav-link ${activeView === label ? 'active' : ''}`} onClick={() => onNavigate(label)}><Icon size={18} /><span>{label}</span>{label === 'My tasks' && <span className="nav-count">{taskCount}</span>}</button>)}
    </nav>
    <div className="sidebar-bottom"><div className="profile"><div className="avatar">JD</div><span className="profile-name"><strong>JD</strong><small>FocusBoard</small></span></div>
    </div>
  </aside>
  <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
    {items.map(({ label, icon: Icon }) => <button key={label} type="button" aria-label={label} aria-current={activeView === label ? 'page' : undefined} className={`mobile-nav-link ${activeView === label ? 'active' : ''}`} onClick={() => onNavigate(label)}><Icon size={19} /><span>{label === 'My tasks' ? 'Tasks' : label}</span></button>)}
  </nav>
  </>
}
