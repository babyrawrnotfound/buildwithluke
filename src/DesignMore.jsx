import { useState } from 'react'
import { Icon, Phone } from './designKit.jsx'

/* Shared phone-screen helpers ---------------------------------------- */

function useSnack() {
  const [snack, setSnack] = useState(null)
  const show = (text, tone = 'ok') => {
    setSnack({ text, tone, id: Date.now() })
    setTimeout(() => setSnack(null), 2600)
  }
  const node = snack ? (
    <div key={snack.id} className={`ph-snack tone-${snack.tone}`} role="status">
      {snack.text}
    </div>
  ) : null
  return [node, show]
}

/* ===================================================================== */
/* IT SUITE — mobile app (Flutter)                                       */
/* ===================================================================== */

function IsmLogin() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [obscure, setObscure] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [snack, show] = useSnack()

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!user.trim()) next.user = 'Username is required'
    if (!pass) next.pass = 'Password is required'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      show('Signed in — demo only')
    }, 1200)
  }

  return (
    <form className="ism-login" onSubmit={submit} noValidate>
      <span className="ism-crest" aria-hidden="true">
        <Icon name="shield" size={36} />
      </span>
      <h5 className="ph-serif-title">Sign in</h5>
      <p className="ph-login-sub">Enter your staff credentials to continue.</p>

      <label className="ph-label" htmlFor="ism-user">Username</label>
      <input
        id="ism-user"
        className={`ph-input ${errors.user ? 'has-error' : ''}`}
        placeholder="Enter username"
        autoComplete="off"
        value={user}
        disabled={loading}
        onChange={(e) => setUser(e.target.value)}
      />
      {errors.user && <span className="ph-error">{errors.user}</span>}

      <label className="ph-label" htmlFor="ism-pass">Password</label>
      <div className="ph-pass">
        <input
          id="ism-pass"
          type={obscure ? 'password' : 'text'}
          className={`ph-input ${errors.pass ? 'has-error' : ''}`}
          placeholder="Enter password"
          autoComplete="off"
          value={pass}
          disabled={loading}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="button"
          className="ph-eye"
          aria-label={obscure ? 'Show password' : 'Hide password'}
          onClick={() => setObscure((o) => !o)}
        >
          <Icon name={obscure ? 'eyeOff' : 'eye'} size={17} />
        </button>
      </div>
      {errors.pass && <span className="ph-error">{errors.pass}</span>}

      <button type="submit" className="ism-btn" disabled={loading}>
        {loading ? <span className="ph-spinner" aria-label="Signing in" /> : 'Sign in'}
      </button>
      <button
        type="button"
        className="ism-bio"
        onClick={() => show('No saved credentials. Sign in with password first.', 'warn')}
      >
        <Icon name="fingerprint" size={18} /> Biometric unlock
      </button>
      {snack}
    </form>
  )
}

const ismStatus = {
  Open: '#000080',
  'In Progress': '#ea580c',
  'On Hold': '#dc2626',
  Resolved: '#00523f',
}

function IsmHome() {
  const modules = [
    ['ticket', 'Tickets'],
    ['qr', 'Assets'],
    ['key', 'Vault'],
    ['chat', 'Chat'],
    ['calendar', 'Leave'],
    ['clock', 'Duty'],
  ]
  return (
    <div className="ism-home">
      <div className="ism-head">
        <span className="ism-avatar" aria-hidden="true">LK</span>
        <span className="ism-greet">
          <small>Good morning</small>
          <strong>Luke</strong>
        </span>
        <span className="ism-round" aria-hidden="true">
          <Icon name="bell" size={16} />
          <i className="ism-dot" />
        </span>
      </div>

      <div className="ism-duty">
        <span className="ism-duty-icon"><Icon name="sun" size={18} /></span>
        <span>
          <small>Currently on duty</small>
          <strong>Day shift · Aiman, Mei Ling</strong>
        </span>
      </div>

      <p className="ism-section">My Tickets</p>
      <div className="ism-counts">
        {[
          ['Open', 3],
          ['In Progress', 2],
          ['On Hold', 1],
          ['Resolved', 14],
        ].map(([label, n]) => (
          <span key={label} style={{ '--c': ismStatus[label] }}>
            <b>{n}</b>
            {label}
          </span>
        ))}
      </div>

      <p className="ism-section">Modules</p>
      <div className="ism-modules">
        {modules.map(([icon, label]) => (
          <span key={label}>
            <i><Icon name={icon} size={18} /></i>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

const ismTickets = [
  { no: 'TCK/0051', title: 'Printer offline at branch', status: 'Open', time: '10 min ago' },
  { no: 'TCK/0049', title: 'VPN drops after sleep', status: 'In Progress', time: '1 h ago' },
  { no: 'TCK/0047', title: 'Replace scanner battery', status: 'On Hold', time: 'Yesterday' },
  { no: 'TCK/0046', title: 'New staff laptop setup', status: 'Resolved', time: 'Mon' },
  { no: 'TCK/0044', title: 'Email not syncing on phone', status: 'Open', time: 'Mon' },
]

function IsmTickets() {
  const [filter, setFilter] = useState('All')
  const list = filter === 'All' ? ismTickets : ismTickets.filter((t) => t.status === filter)
  return (
    <div className="ism-tickets">
      <h5 className="ph-app-title">My Tickets</h5>
      <div className="ph-chips" role="group" aria-label="Filter tickets">
        {['All', 'Open', 'In Progress', 'On Hold', 'Resolved'].map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="ism-ticket-list">
        {list.map((t) => (
          <div key={t.no} className="ism-ticket" style={{ '--c': ismStatus[t.status] }}>
            <div>
              <small>{t.no} · {t.time}</small>
              <strong>{t.title}</strong>
            </div>
            <span className="ism-status">{t.status}</span>
          </div>
        ))}
      </div>
      <span className="ism-fab" aria-hidden="true">
        <Icon name="plus" size={16} /> New Ticket
      </span>
    </div>
  )
}

export function ItsuiteMobileShowcase() {
  return (
    <div className="wms-stage">
      <Phone label="Sign in — validation, loading and biometric sign-in" dark>
        <IsmLogin />
      </Phone>
      <Phone label="Home — who is on duty and your ticket counts">
        <IsmHome />
      </Phone>
      <Phone label="Tickets — status filter chips work">
        <IsmTickets />
      </Phone>
    </div>
  )
}

/* ===================================================================== */
/* Fleet Management Dashboard — web                                      */
/* ===================================================================== */

const fleetCards = [
  { key: 'all', label: 'Total Fleet', value: 48, icon: 'truck', color: '#2563eb' },
  { key: 'On Road', label: 'On Road', value: 31, icon: 'road', color: '#000080' },
  { key: 'Off Road', label: 'Off Road', value: 9, icon: 'warn', color: '#d97706' },
  { key: 'Idle', label: 'Idle', value: 8, icon: 'pause', color: '#7c3aed' },
]

const fleet = [
  { plate: 'BKA 4521', type: 'Prime Mover', driver: 'Hafiz R.', area: 'Port Klang', status: 'On Road' },
  { plate: 'JQT 8830', type: 'Rigid Truck', driver: 'Kumar S.', area: 'Johor Bahru', status: 'On Road' },
  { plate: 'VGH 2207', type: 'Prime Mover', driver: '—', area: 'Workshop', status: 'Off Road' },
  { plate: 'WVC 6614', type: 'Van', driver: 'Aina Z.', area: 'Shah Alam', status: 'On Road' },
  { plate: 'PKB 1190', type: 'Rigid Truck', driver: '—', area: 'Penang depot', status: 'Idle' },
  { plate: 'JRM 3378', type: 'Prime Mover', driver: '—', area: 'Workshop', status: 'Off Road' },
  { plate: 'BNM 7745', type: 'Van', driver: '—', area: 'HQ yard', status: 'Idle' },
]

const compliance = [
  ['Road Tax', 'file', 44, 3, 1],
  ['APAD Permit', 'key', 41, 4, 3],
  ['PUSPAKOM', 'search', 45, 2, 1],
  ['Vehicle Insurance', 'shield', 46, 1, 1],
  ['ROV', 'file', 47, 1, 0],
  ['Customs Bonded', 'box', 18, 0, 0],
]

function Ring({ pct, color, icon, label, ok, total }) {
  const r = 26
  const c = 2 * Math.PI * r
  return (
    <div className="fmd-ring">
      <div className="fmd-ring-chart">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r={r} className="fmd-ring-track" />
          <circle
            cx="32"
            cy="32"
            r={r}
            className="fmd-ring-value"
            style={{ stroke: color, strokeDasharray: `${(pct / 100) * c} ${c}` }}
          />
        </svg>
        <span style={{ color }}><Icon name={icon} size={18} /></span>
      </div>
      <div>
        <div className="fmd-ring-label">{label}</div>
        <div className="fmd-ring-num">
          {ok}<small>/{total} function</small>
        </div>
        <div className="fmd-ring-pct" style={{ color }}>{pct}%</div>
      </div>
    </div>
  )
}

export function FmdShowcase() {
  const [filter, setFilter] = useState('all')
  const rows = filter === 'all' ? fleet : fleet.filter((v) => v.status === filter)
  const active = fleetCards.find((c) => c.key === filter)
  const soon = compliance.reduce((s, r) => s + r[3], 0)
  const expired = compliance.reduce((s, r) => s + r[4], 0)

  return (
    <div className="its-window fmd">
      <div className="its-window-bar" aria-hidden="true">
        <i /><i /><i />
        <span>Fleet Management Dashboard</span>
      </div>
      <div className="fmd-surface">
        <div className="fmd-stats">
          {fleetCards.map((c) => (
            <button
              key={c.key}
              type="button"
              className="fmd-stat"
              style={{ '--qa-c': c.color }}
              aria-pressed={filter === c.key}
              onClick={() => setFilter(c.key)}
            >
              <span className="fmd-stat-icon"><Icon name={c.icon} size={20} /></span>
              <span>
                <small>{c.label}</small>
                <strong>{c.value}</strong>
              </span>
            </button>
          ))}
        </div>

        <div className="fmd-grid">
          <section className="fmd-card">
            <p className="fmd-card-title">
              <i><Icon name="shield" size={15} /></i> Compliance Summary
            </p>
            <div className="fmd-alerts">
              <div className="fmd-alert is-warn">
                <strong>{soon}</strong>
                <span>Expiring soon</span>
              </div>
              <div className="fmd-alert is-danger">
                <strong>{expired}</strong>
                <span>Expired</span>
              </div>
            </div>
            <div className="fmd-comp-list">
              {compliance.map(([name, icon, valid, s, e]) => (
                <div key={name} className="fmd-comp-row">
                  <i><Icon name={icon} size={15} /></i>
                  <span className="fmd-comp-name">{name}</span>
                  <span className="fmd-pill is-valid" title="Valid">{valid}</span>
                  <span className="fmd-pill is-soon" title="Expiring soon">{s}</span>
                  <span className="fmd-pill is-expired" title="Expired">{e}</span>
                </div>
              ))}
            </div>
            <div className="fmd-legend">
              <span><i className="is-valid" /> Valid</span>
              <span><i className="is-soon" /> Expiring soon</span>
              <span><i className="is-expired" /> Expired</span>
            </div>
          </section>

          <section className="fmd-card">
            <p className="fmd-card-title">
              <i><Icon name="chip" size={15} /></i> System &amp; Device Status
            </p>
            <div className="fmd-rings">
              <Ring pct={94} color="#16a34a" icon="pin" label="GPS Status" ok={45} total={48} />
              <Ring pct={88} color="#2563eb" icon="fuel" label="Fuel Sensor" ok={42} total={48} />
              <Ring pct={96} color="#7c3aed" icon="lock" label="E-Lock" ok={46} total={48} />
            </div>
          </section>
        </div>

        <section className="fmd-card">
          <p className="fmd-card-title">
            <i><Icon name="truck" size={15} /></i> Fleet Listing
            <em>{active.label} — showing {rows.length} of {active.value}</em>
          </p>
          <div className="its-table-scroll">
            <table className="fmd-table">
              <thead>
                <tr>
                  <th scope="col">Plate</th>
                  <th scope="col">Type</th>
                  <th scope="col">Driver</th>
                  <th scope="col">Location</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((v) => (
                  <tr key={v.plate}>
                    <td className="its-mono">{v.plate}</td>
                    <td>{v.type}</td>
                    <td>{v.driver}</td>
                    <td>{v.area}</td>
                    <td>
                      <span
                        className="fmd-status"
                        style={{ '--qa-c': fleetCards.find((c) => c.key === v.status).color }}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ===================================================================== */
/* FiveSFL — warehouse scanner app (Flutter)                             */
/* ===================================================================== */

function FsLogin() {
  const [staff, setStaff] = useState('')
  const [pass, setPass] = useState('')
  const [obscure, setObscure] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [snack, show] = useSnack()

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!staff) next.staff = 'Please enter your Staff No'
    if (!pass) next.pass = 'Please enter your Password'
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      show('Welcome back — demo only')
    }, 1300)
  }

  return (
    <form className="fs-login" onSubmit={submit} noValidate>
      <span className="fs-logo" aria-hidden="true"><Icon name="box" size={52} /></span>
      <span className="fs-pill">WAREHOUSE MANAGEMENT SYSTEM</span>

      <label className="fs-label" htmlFor="fs-staff">Staff No</label>
      <div className={`fs-field ${errors.staff ? 'has-error' : ''}`}>
        <Icon name="user" size={17} />
        <input
          id="fs-staff"
          placeholder="Enter Your Staff No"
          autoComplete="off"
          value={staff}
          disabled={loading}
          onChange={(e) => setStaff(e.target.value.replace(/\s/g, '').toUpperCase())}
        />
      </div>
      {errors.staff && <span className="ph-error">{errors.staff}</span>}

      <label className="fs-label" htmlFor="fs-pass">Password</label>
      <div className={`fs-field ${errors.pass ? 'has-error' : ''}`}>
        <Icon name="lock" size={17} />
        <input
          id="fs-pass"
          type={obscure ? 'password' : 'text'}
          placeholder="Enter Your Password"
          autoComplete="off"
          value={pass}
          disabled={loading}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="button"
          className="fs-eye"
          aria-label={obscure ? 'Show password' : 'Hide password'}
          onClick={() => setObscure((o) => !o)}
        >
          <Icon name={obscure ? 'eyeOff' : 'eye'} size={17} />
        </button>
      </div>
      {errors.pass && <span className="ph-error">{errors.pass}</span>}

      <button type="submit" className="fs-btn" disabled={loading}>
        {loading ? 'Signing you in…' : 'Log In'}
      </button>
      {snack}
    </form>
  )
}

const fsStages = [
  ['Draft', 'inbox', '#3b82f6'],
  ['Pending Store', 'clock', '#f59e0b'],
  ['Stored', 'layers', '#10b981'],
  ['Pending Picking', 'hand', '#8b5cf6'],
  ['Picked', 'check', '#059669'],
  ['Pending Outgoing', 'outbox', '#ef4444'],
  ['Out', 'truck', '#1e3a8a'],
]

const fsBase = [6, 11, 184, 9, 27, 5, 312]

function FsDashboard() {
  const [dark, setDark] = useState(false)
  const [values, setValues] = useState(fsBase)
  const [spinning, setSpinning] = useState(false)

  const refresh = () => {
    setSpinning(true)
    setTimeout(() => {
      setValues(fsBase.map((v) => Math.max(0, v + Math.round((Math.random() - 0.4) * 4))))
      setSpinning(false)
    }, 700)
  }

  return (
    <div className={`fs-dash ${dark ? 'is-dark' : ''}`}>
      <div className="fs-head">
        <span className="fs-avatar" aria-hidden="true">LK</span>
        <span className="fs-greet">
          <small>Welcome Back</small>
          <strong>Luke</strong>
        </span>
        <button
          type="button"
          className="fs-round"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setDark((d) => !d)}
        >
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
      </div>

      <div className="fs-title-row">
        <strong>System Statistics</strong>
        <button
          type="button"
          className={`fs-round ${spinning ? 'is-spinning' : ''}`}
          aria-label="Refresh statistics"
          onClick={refresh}
        >
          <Icon name="refresh" size={15} />
        </button>
      </div>

      <div className="fs-stats">
        {fsStages.map(([label, icon, color], i) => (
          <div key={label} className="fs-stat" style={{ '--c': color }}>
            <div className="fs-stat-head">
              <i><Icon name={icon} size={13} /></i>
              <span>{label}</span>
            </div>
            <div className="fs-stat-box">
              <strong>{values[i]}</strong>
              <em>Total</em>
            </div>
          </div>
        ))}
      </div>

      <nav className="fs-nav" aria-hidden="true">
        {[
          ['home', 'Home'],
          ['inbox', 'In'],
          ['layers', 'Store'],
          ['hand', 'Pick'],
          ['truck', 'Out'],
        ].map(([icon, label], i) => (
          <span key={label} className={i === 0 ? 'is-active' : ''}>
            <Icon name={icon} size={17} />
            {label}
          </span>
        ))}
      </nav>
    </div>
  )
}

const fsSteps = ['Scan item', 'Scan position', 'Confirm']

function FsScanStore() {
  const [step, setStep] = useState(0)
  const [snack, show] = useSnack()

  const trigger = () => {
    if (step < 2) setStep((s) => s + 1)
  }

  const confirm = () => {
    show('Stored to position A-04-02')
    setStep(0)
  }

  return (
    <div className="fs-scan">
      <h5 className="ph-app-title">Scan to Store</h5>
      <ol className="fs-steps">
        {fsSteps.map((s, i) => (
          <li key={s} className={i < step ? 'is-done' : i === step ? 'is-current' : ''}>
            <i>{i < step ? '✓' : i + 1}</i>
            {s}
          </li>
        ))}
      </ol>

      <div className={`fs-scanbox ${step === 0 ? 'is-waiting' : ''}`}>
        <Icon name="scan" size={30} />
        <span>
          {step === 0 ? 'Press the scanner trigger to scan an item' : 'Item scanned'}
        </span>
      </div>

      <dl className="fs-scan-data">
        <div>
          <dt>Item</dt>
          <dd>{step >= 1 ? 'SKU 8801-2291 · Carton 3/12' : '—'}</dd>
        </div>
        <div>
          <dt>Position</dt>
          <dd>{step >= 2 ? 'A-04-02 (rack A, level 4)' : '—'}</dd>
        </div>
      </dl>

      {step < 2 ? (
        <button type="button" className="fs-trigger" onClick={trigger}>
          <Icon name="scan" size={16} /> Simulate scanner trigger
        </button>
      ) : (
        <button type="button" className="fs-trigger is-confirm" onClick={confirm}>
          <Icon name="check" size={16} /> Confirm store
        </button>
      )}
      {snack}
    </div>
  )
}

export function FivesflShowcase() {
  return (
    <div className="wms-stage">
      <Phone label="Log In — whitespace is stripped, staff no. auto-uppercased" dark>
        <FsLogin />
      </Phone>
      <Phone label="Dashboard — refresh and dark mode toggle work">
        <FsDashboard />
      </Phone>
      <Phone label="Scan to Store — step through a put-away">
        <FsScanStore />
      </Phone>
    </div>
  )
}
