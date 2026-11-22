import { useEffect, useRef, useState } from 'react'
import { Plus, Settings, UserRound } from 'lucide-react'

export default function Header({ onCreateTask, onNavigate }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!profileOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [profileOpen])

  const closeProfile = () => setProfileOpen(false)

  return <>
    <header className="topbar">
      <div className="desktop-breadcrumb"><span>Workspace</span><span>/</span><strong>Overview</strong></div>
      <a className="mobile-brand" href="#dashboard"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>FocusBoard</a>
      <div className="profile-menu-wrap" ref={profileRef}>
        <button ref={triggerRef} className="header-avatar profile-trigger" type="button" aria-label="Open profile menu for Jamie Davis" aria-expanded={profileOpen} aria-controls="profile-dropdown" onClick={() => setProfileOpen((open) => !open)}>JD</button>
        {profileOpen && <div className="profile-dropdown" id="profile-dropdown" aria-label="Profile options">
          <div className="profile-dropdown-user"><span className="profile-dropdown-avatar">JD</span><span><strong>Jamie Davis</strong><small>FocusBoard account</small></span></div>
          <div className="profile-dropdown-options">
            <button type="button" aria-current="page" onClick={() => { closeProfile(); triggerRef.current?.focus() }}><UserRound size={16} />Profile</button>
            <button type="button" onClick={() => { closeProfile(); onNavigate?.('Settings') }}><Settings size={16} />Settings</button>
          </div>
        </div>}
      </div>
    </header>
    <section className="dashboard-intro">
      <div><h1>Your work, in focus.</h1><p>Plan your day, stay organized, and celebrate small wins.</p></div>
      <button className="button button-primary desktop-create" type="button" onClick={(event) => onCreateTask(event.currentTarget)}><Plus size={17} /> New task</button>
      <button className="floating-create" type="button" aria-label="Create new task" onClick={(event) => onCreateTask(event.currentTarget)}><Plus size={23} /></button>
    </section>
  </>
}
