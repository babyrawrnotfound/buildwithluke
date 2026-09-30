import { useEffect, useRef, useState } from 'react'
import { Icon, Phone } from './designKit.jsx'
import { FivesflShowcase, FmdShowcase, ItsuiteMobileShowcase } from './DesignMore.jsx'
import './Design.css'
import './DesignMore.css'

/* ---------------------------------------------------------------- */
/* IT SUITE — web components                                        */
/* ---------------------------------------------------------------- */

const toastMessages = {
  success: 'Record saved successfully!',
  error: 'Failed to save record.',
  warning: 'Data may be incomplete.',
  info: 'New info available.',
}

function ToastStack({ toasts, onClose }) {
  return (
    <div className="its-toast-stack" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`its-toast ${t.type}`} role="status">
          <div className="its-toast-message">{t.message}</div>
          <button
            type="button"
            className="its-toast-close"
            aria-label="Dismiss notification"
            onClick={() => onClose(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

function ToastDemo({ toast }) {
  return (
    <div className="its-row">
      <button type="button" className="its-btn its-btn-success" onClick={() => toast('success')}>
        <Icon name="check" size={15} /> Success
      </button>
      <button type="button" className="its-btn its-btn-error" onClick={() => toast('error')}>
        <Icon name="error" size={15} /> Error
      </button>
      <button type="button" className="its-btn its-btn-warn" onClick={() => toast('warning')}>
        <Icon name="warn" size={15} /> Warning
      </button>
      <button type="button" className="its-btn its-btn-info" onClick={() => toast('info')}>
        <Icon name="info" size={15} /> Info
      </button>
    </div>
  )
}

function ConfirmModal({ open, onCancel, onConfirm }) {
  const cancelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div
      className="its-backdrop"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="its-modal" role="alertdialog" aria-modal="true" aria-labelledby="its-modal-title">
        <div className="its-modal-head">
          <h4 id="its-modal-title">Delete record</h4>
          <button type="button" className="its-modal-close" aria-label="Close" onClick={onCancel}>
            ×
          </button>
        </div>
        <div className="its-modal-body">
          <div className="its-modal-icon danger">
            <Icon name="trash" size={26} />
          </div>
          <p>
            Delete asset <strong>ITA-0042</strong>? The record is soft-deleted and stays in the
            audit trail.
          </p>
        </div>
        <div className="its-modal-foot">
          <button ref={cancelRef} type="button" className="its-btn its-btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="its-btn its-btn-error" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

const assets = [
  { tag: 'ITA-0042', name: 'ThinkPad T14', type: 'Laptop', branch: 'HQ', status: 'Active' },
  { tag: 'ITA-0107', name: 'OptiPlex 7010', type: 'Desktop', branch: 'Port Klang', status: 'Maintenance' },
  { tag: 'ITA-0118', name: 'LaserJet M404', type: 'Printer', branch: 'HQ', status: 'Active' },
  { tag: 'ITA-0156', name: 'FortiGate 60F', type: 'Firewall', branch: 'Johor', status: 'Active' },
  { tag: 'ITA-0163', name: 'Latitude 5420', type: 'Laptop', branch: 'Penang', status: 'Retired' },
  { tag: 'ITA-0171', name: 'TC22 Scanner', type: 'Handheld', branch: 'Johor', status: 'Maintenance' },
]

const statusBadge = { Active: 'its-badge-ok', Maintenance: 'its-badge-warn', Retired: 'its-badge-muted' }

function TableDemo() {
  const [tab, setTab] = useState('All')
  const tabs = ['All', 'Active', 'Maintenance', 'Retired']
  const rows = tab === 'All' ? assets : assets.filter((a) => a.status === tab)
  const countFor = (t) => (t === 'All' ? assets.length : assets.filter((a) => a.status === t).length)

  return (
    <div className="its-table-card">
      <div className="its-tabs" role="group" aria-label="Filter assets by status">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            className="its-tab"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
          >
            {t}
            <span className="its-tab-count">{countFor(t)}</span>
          </button>
        ))}
      </div>
      <div className="its-table-scroll">
        <table className="its-table">
          <thead>
            <tr>
              <th scope="col">Asset tag</th>
              <th scope="col">Device</th>
              <th scope="col">Type</th>
              <th scope="col">Branch</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.tag}>
                <td className="its-mono">{a.tag}</td>
                <td>{a.name}</td>
                <td>{a.type}</td>
                <td>{a.branch}</td>
                <td>
                  <span className={`its-badge ${statusBadge[a.status]}`}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="its-pag">
        <span>
          Showing {rows.length} of {assets.length}
        </span>
        <div>
          <button type="button" className="its-pag-btn is-active" aria-current="page">1</button>
          <button type="button" className="its-pag-btn">2</button>
          <button type="button" className="its-pag-btn">3</button>
        </div>
      </div>
    </div>
  )
}

function TwoFactorDemo({ toast }) {
  const [stage, setStage] = useState('locked')
  const [code, setCode] = useState('')
  const [left, setLeft] = useState(60)

  useEffect(() => {
    if (stage !== 'revealed') return
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          clearInterval(id)
          setStage('locked')
          return 60
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [stage])

  const verify = (e) => {
    e.preventDefault()
    if (code.length !== 6) return
    setCode('')
    setLeft(60)
    setStage('revealed')
    toast('success', 'Verified — credentials unlocked for 60s.')
  }

  const lock = () => {
    setStage('locked')
    setLeft(60)
  }

  return (
    <div className="its-vault">
      <div className="its-vault-row">
        <span className="its-vault-label">Username</span>
        <span className="its-mono">svc-backup</span>
      </div>
      <div className="its-vault-row">
        <span className="its-vault-label">Password</span>
        <span className="its-mono">{stage === 'revealed' ? 'k7#Rv!q2Lm9x' : '••••••••••••'}</span>
      </div>

      {stage === 'locked' && (
        <button type="button" className="its-btn its-btn-info its-btn-block" onClick={() => setStage('code')}>
          <Icon name="shield" size={15} /> Verify 2FA to View
        </button>
      )}

      {stage === 'code' && (
        <form className="its-code" onSubmit={verify}>
          <label htmlFor="its-totp" className="its-vault-label">
            Authenticator code
          </label>
          <div className="its-code-row">
            <input
              id="its-totp"
              className="its-input its-mono"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              autoFocus
            />
            <button type="submit" className="its-btn its-btn-info" disabled={code.length !== 6}>
              Verify
            </button>
          </div>
          <p className="its-hint">Demo — any 6 digits unlock it.</p>
        </form>
      )}

      {stage === 'revealed' && (
        <div className="its-countdown">
          <span className="its-countdown-bar" style={{ '--left': left / 60 }} />
          <span>
            <Icon name="lock" size={14} /> {left}s — auto-locks
          </span>
          <button type="button" className="its-link" onClick={lock}>
            Lock now
          </button>
        </div>
      )}
    </div>
  )
}

function LoadingDemo() {
  const [state, setState] = useState('loaded')

  const reload = () => {
    setState('loading')
    setTimeout(() => setState('loaded'), 1400)
  }

  return (
    <div className="its-load">
      <div className="its-load-head">
        <span className="its-vault-label">Support tickets</span>
        <div className="its-row">
          <button type="button" className="its-btn its-btn-outline its-btn-sm" onClick={reload}>
            <Icon name="refresh" size={14} /> Reload
          </button>
          <button
            type="button"
            className="its-btn its-btn-outline its-btn-sm"
            onClick={() => setState(state === 'empty' ? 'loaded' : 'empty')}
          >
            {state === 'empty' ? 'Show data' : 'Empty state'}
          </button>
        </div>
      </div>

      {state === 'loading' && (
        <div className="its-skel-list" aria-busy="true" aria-label="Loading">
          {[0, 1, 2].map((i) => (
            <div className="its-skel-item" key={i}>
              <span className="its-skel its-skel-avatar" />
              <span className="its-skel-lines">
                <span className="its-skel its-skel-line" />
                <span className="its-skel its-skel-line short" />
              </span>
            </div>
          ))}
        </div>
      )}

      {state === 'loaded' && (
        <ul className="its-ticket-list">
          {[
            ['TCK/0051', 'Printer offline — Port Klang', 'its-badge-warn', 'Open'],
            ['TCK/0049', 'VPN drops after sleep', 'its-badge-info', 'In progress'],
            ['TCK/0046', 'New staff laptop setup', 'its-badge-ok', 'Resolved'],
          ].map(([no, title, cls, label]) => (
            <li key={no}>
              <span className="its-mono its-ticket-no">{no}</span>
              <span className="its-ticket-title">{title}</span>
              <span className={`its-badge ${cls}`}>{label}</span>
            </li>
          ))}
        </ul>
      )}

      {state === 'empty' && (
        <div className="its-empty">
          <span className="its-empty-icon">
            <Icon name="inbox" size={28} />
          </span>
          <strong>No tickets found</strong>
          <p>Nothing matches this filter yet.</p>
          <button type="button" className="its-btn its-btn-info its-btn-sm">
            <Icon name="plus" size={14} /> Add Record
          </button>
        </div>
      )}
    </div>
  )
}

const palette = [
  ['Brand green', '#00523f'],
  ['Hover blue', '#1d4ed8'],
  ['Success', '#16a34a'],
  ['Warning', '#d97706'],
  ['Danger', '#dc2626'],
  ['Info', '#2563eb'],
  ['Text primary', '#0f172a'],
  ['Border', '#e2e8f0'],
]

function PaletteDemo({ toast }) {
  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex)
      toast('info', `Copied ${hex} to clipboard.`)
    } catch {
      toast('warning', 'Clipboard not available here.')
    }
  }

  return (
    <div className="its-palette">
      {palette.map(([name, hex]) => (
        <button key={hex} type="button" className="its-swatch" onClick={() => copy(hex)}>
          <span className="its-swatch-color" style={{ background: hex }} />
          <span className="its-swatch-name">{name}</span>
          <span className="its-mono its-swatch-hex">{hex}</span>
        </button>
      ))}
    </div>
  )
}

function DemoCard({ title, note, children, wide = false }) {
  return (
    <div className={`its-card ${wide ? 'is-wide' : ''}`}>
      <div className="its-card-head">
        <h4>{title}</h4>
        <p>{note}</p>
      </div>
      <div className="its-card-body">{children}</div>
    </div>
  )
}

function WebShowcase({ toast }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="its-window">
      <div className="its-window-bar" aria-hidden="true">
        <i /><i /><i />
        <span>IT SUITE · component library</span>
      </div>
      <div className="its-surface">
        <div className="its-grid">
          <DemoCard title="Toast notifications" note="Top-right, auto-dismiss, round close button.">
            <ToastDemo toast={toast} />
          </DemoCard>

          <DemoCard title="Confirm modal" note="Blurred backdrop, Esc to close, focus on Cancel.">
            <button type="button" className="its-btn its-btn-error" onClick={() => setModalOpen(true)}>
              <Icon name="trash" size={15} /> Delete record…
            </button>
          </DemoCard>

          <DemoCard
            wide
            title="Data table"
            note="Green header, striped rows, status badges, tab filters with counts — filtered client-side."
          >
            <TableDemo />
          </DemoCard>

          <DemoCard title="2FA-gated reveal" note="Masked until a TOTP code is entered, auto-locks after 60s.">
            <TwoFactorDemo toast={toast} />
          </DemoCard>

          <DemoCard title="Loading & empty states" note="Skeleton shimmer while fetching; a clear next step when empty.">
            <LoadingDemo />
          </DemoCard>

          <DemoCard wide title="Colour tokens" note="Click a swatch to copy its hex.">
            <PaletteDemo toast={toast} />
          </DemoCard>
        </div>
      </div>

      <ConfirmModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false)
          toast('success', 'Record deleted.')
        }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* ONWMS — mobile screens (Flutter, recreated)                       */
/* ---------------------------------------------------------------- */

function LoginScreen() {
  const [staff, setStaff] = useState('')
  const [password, setPassword] = useState('')
  const [obscure, setObscure] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [signedIn, setSignedIn] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!staff.trim()) next.staff = 'Staff number is required'
    if (!password) next.password = 'Password is required'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSignedIn(true)
      setTimeout(() => setSignedIn(false), 2600)
    }, 1300)
  }

  return (
    <form className="wms-login" onSubmit={submit} noValidate>
      <span className="wms-crest" aria-hidden="true">
        <Icon name="box" size={40} />
      </span>
      <h5 className="wms-login-title">Sign in</h5>
      <p className="wms-login-sub">Enter your staff credentials to continue.</p>

      <label className="wms-login-label" htmlFor="wms-staff">Staff No.</label>
      <input
        id="wms-staff"
        className={`wms-login-input ${errors.staff ? 'has-error' : ''}`}
        placeholder="e.g. SL-00148"
        autoComplete="off"
        value={staff}
        disabled={loading}
        onChange={(e) => setStaff(e.target.value.toUpperCase())}
      />
      {errors.staff && <span className="wms-login-error">{errors.staff}</span>}

      <label className="wms-login-label" htmlFor="wms-pass">Password</label>
      <div className="wms-login-pass">
        <input
          id="wms-pass"
          type={obscure ? 'password' : 'text'}
          className={`wms-login-input ${errors.password ? 'has-error' : ''}`}
          placeholder="Enter password"
          autoComplete="off"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="wms-eye"
          aria-label={obscure ? 'Show password' : 'Hide password'}
          onClick={() => setObscure((o) => !o)}
        >
          <Icon name={obscure ? 'eyeOff' : 'eye'} size={17} />
        </button>
      </div>
      {errors.password && <span className="wms-login-error">{errors.password}</span>}

      <span className="wms-forgot">Forgot password?</span>

      <button type="submit" className="wms-login-btn" disabled={loading}>
        {loading ? <span className="wms-spinner" aria-label="Signing in" /> : 'Sign in'}
      </button>

      {signedIn && <div className="wms-snack">Signed in — demo only</div>}
    </form>
  )
}

function DashboardScreen() {
  const ops = [
    { label: 'Physical Receiving', value: 4, icon: 'inbox', tone: 'navy' },
    { label: 'Physical Moves', value: 7, icon: 'swap', tone: 'orange' },
    { label: 'Physical Issue', value: 3, icon: 'outbox', tone: 'amber' },
    { label: 'Verify Issue', value: 2, icon: 'verified', tone: 'sky' },
  ]
  return (
    <div className="wms-dash">
      <div className="wms-dash-head">
        <span className="wms-avatar" aria-hidden="true">LK</span>
        <span className="wms-dash-greet">
          <small>Welcome</small>
          <strong>Luke</strong>
        </span>
        <span className="wms-round-btn" aria-hidden="true">
          <Icon name="search" size={17} />
        </span>
      </div>

      <div className="wms-hero">
        <small>YOUR DAY</small>
        <p>
          <strong>12</strong> done today
        </p>
        <div className="wms-hero-pills">
          <span><b>5</b>Receive</span>
          <span><b>4</b>Locate</span>
          <span><b>3</b>Issue</span>
        </div>
      </div>

      <p className="wms-section">Operations</p>
      <div className="wms-stats">
        {ops.map((op) => (
          <div key={op.label} className={`wms-stat tone-${op.tone}`}>
            <span className="wms-stat-icon">
              <Icon name={op.icon} size={17} />
            </span>
            <strong>{op.value}</strong>
            <small>{op.label}</small>
          </div>
        ))}
      </div>

      <nav className="wms-nav" aria-hidden="true">
        {[
          ['home', 'Home'],
          ['inbox', 'Receive'],
          ['swap', 'Locate'],
          ['outbox', 'Issue'],
          ['user', 'Account'],
        ].map(([icon, label], i) => (
          <span key={label} className={i === 0 ? 'is-active' : ''}>
            <Icon name={icon} size={18} />
            {label}
          </span>
        ))}
      </nav>
    </div>
  )
}

const receipts = [
  { no: 'RIQS/2026/0142', supplier: 'Northgate Supplies', items: 18, status: 'Draft' },
  { no: 'RIQS/2026/0139', supplier: 'Harbor Logistics', items: 42, status: 'Waiting to verify' },
  { no: 'RIQS/2026/0137', supplier: 'Meridian Parts Co.', items: 9, status: 'Received' },
  { no: 'RIQS/2026/0131', supplier: 'Kestrel Trading', items: 27, status: 'Received' },
]

const receiptTone = { Draft: 'navy', 'Waiting to verify': 'orange', Received: 'green' }

function ReceivingScreen() {
  const [scope, setScope] = useState('All')
  const [query, setQuery] = useState('')
  const list = receipts.filter(
    (r) =>
      (scope === 'All' || r.status === 'Draft') &&
      (r.no + r.supplier).toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="wms-recv">
      <h5 className="wms-recv-title">Receiving</h5>
      <div className="wms-seg" role="group" aria-label="Scope">
        {['All', 'Mine'].map((s) => (
          <button key={s} type="button" aria-pressed={scope === s} onClick={() => setScope(s)}>
            {s}
          </button>
        ))}
      </div>
      <label className="wms-search">
        <Icon name="search" size={15} />
        <input
          placeholder="Search invoice / supplier"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search invoice or supplier"
        />
      </label>

      <div className="wms-recv-list">
        {list.length === 0 && <p className="wms-recv-empty">No receive records</p>}
        {list.map((r) => (
          <div key={r.no} className="wms-recv-item">
            <div>
              <strong>{r.no}</strong>
              <small>{r.supplier} · {r.items} items</small>
            </div>
            <span className={`wms-chip tone-${receiptTone[r.status]}`}>{r.status}</span>
          </div>
        ))}
      </div>

      <span className="wms-fab" aria-hidden="true">
        <Icon name="plus" size={17} /> Create new
      </span>
    </div>
  )
}

function MobileShowcase() {
  return (
    <div className="wms-stage">
      <Phone label="Sign in — try submitting it empty, then with any values" dark>
        <LoginScreen />
      </Phone>
      <Phone label="Dashboard — the day at a glance">
        <DashboardScreen />
      </Phone>
      <Phone label="Receiving — filter and search work">
        <ReceivingScreen />
      </Phone>
    </div>
  )
}

/* ---------------------------------------------------------------- */

export default function Design() {
  const [view, setView] = useState('web')
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const closeToast = (id) => setToasts((list) => list.filter((t) => t.id !== id))

  const toast = (type, message) => {
    const id = ++nextId.current
    setToasts((list) => [...list.slice(-3), { id, type, message: message || toastMessages[type] }])
    setTimeout(() => closeToast(id), 3200)
  }

  const views = [
    { id: 'web', name: 'IT SUITE', kind: 'Web components' },
    { id: 'itsuite-mobile', name: 'IT SUITE', kind: 'Mobile app' },
    { id: 'fmd', name: 'Fleet', kind: 'Web dashboard' },
    { id: 'warehouse', name: 'Warehouse', kind: 'Mobile app' },
    { id: 'fivesfl', name: 'FiveSFL', kind: 'Scanner app' },
  ]

  return (
    <div className="ds">
      <div className="ds-switch" role="group" aria-label="Choose a product">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
          >
            {v.name} <span>{v.kind}</span>
          </button>
        ))}
      </div>

      {view === 'web' && <WebShowcase toast={toast} />}
      {view === 'itsuite-mobile' && <ItsuiteMobileShowcase />}
      {view === 'fmd' && <FmdShowcase />}
      {view === 'warehouse' && <MobileShowcase />}
      {view === 'fivesfl' && <FivesflShowcase />}

      <ToastStack toasts={toasts} onClose={closeToast} />
    </div>
  )
}
