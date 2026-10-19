import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Icon } from './designKit.jsx'
import './CoreLuke.css'

const LIVE = 'https://core.buildwithluke.com/'

const stages = ['New', 'Cooking', 'Ready', 'Served']

const kitchenSeed = [
  { id: 'KT-1042', items: 'Nasi Lemak Ayam ×2', station: 'Wok', stage: 'New', wait: '4m' },
  { id: 'KT-1045', items: 'Mee Goreng ×1', station: 'Wok', stage: 'New', wait: '2m' },
  { id: 'KT-1043', items: 'Roti Canai ×3', station: 'Grill', stage: 'Cooking', wait: '11m' },
  { id: 'KT-1046', items: 'Nasi Goreng Pattaya', station: 'Grill', stage: 'Cooking', wait: '7m' },
  { id: 'KT-1044', items: 'Teh Tarik ×2', station: 'Drinks', stage: 'Ready', wait: '1m' },
]

const workspaces = [
  {
    id: 'commerce',
    label: 'Commerce',
    icon: 'grid',
    page: 'Orders',
    sub: 'B2B accounts · currency RM',
    kpis: [
      { label: 'Total profit', value: 'RM 446.7K', delta: '24.4%', up: true },
      { label: 'Orders', value: '1,284', delta: '8.4%', up: true },
      { label: 'Avg. order', value: 'RM 364.80', delta: '0.6%', up: false },
    ],
    cols: ['Order', 'Customer', 'Detail', 'Total', 'Status'],
    rows: [
      ['ORD-24890', 'Bluepeak Electronics', '12 lines', 'RM 4,280', 'Open'],
      ['ORD-24874', 'Northwind Retail', 'Gate 4 · Kinetic', 'RM 1,940', 'Packed'],
      ['ORD-24866', 'Meridian Parts', 'Bank transfer', 'RM 6,120', 'Paid'],
      ['ORD-24871', 'Harbor Logistics', 'Card •••• 1881', 'RM 860', 'Failed'],
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: 'truck',
    page: 'Shipments',
    sub: 'Air, sea and road · USD for freight',
    kpis: [
      { label: 'In transit', value: '18', delta: '3 today', up: true },
      { label: 'Customs hold', value: '2', delta: 'Red lane', up: false },
      { label: 'On-time', value: '96%', delta: '1.2%', up: true },
    ],
    cols: ['AWB', 'Lane', 'Cargo', 'ETA', 'Status'],
    rows: [
      ['AWB 618-2291', 'KUL → SIN', 'General · 420 kg', 'Today 18:40', 'In transit'],
      ['SLXU 4820193', 'Port Klang', '40HC · FCL', 'Thu', 'At port'],
      ['CFS-0918', 'Penang CFS', 'LCL · 14 cartons', 'Fri', 'Pending'],
      ['TRDU 7781024', 'Reefer yard', '40RF · 2°C', 'Wed', 'Hold'],
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'file',
    page: 'Journal',
    sub: 'Double entry · period open',
    kpis: [
      { label: 'Debits', value: 'RM 24,310', delta: 'Balanced', up: true },
      { label: 'Credits', value: 'RM 24,310', delta: 'Balanced', up: true },
      { label: 'Unposted', value: '3', delta: 'Needs approval', up: false },
    ],
    cols: ['Entry', 'Account', 'Memo', 'Amount', 'Status'],
    rows: [
      ['JE-2041', '1100 Cash', 'Payout •••• 4021', 'RM 24,310', 'Posted'],
      ['JE-2042', '4000 Sales', 'ORD-24866', 'RM 6,120', 'Posted'],
      ['JE-2048', '2100 Tax', 'SST output', 'RM 418', 'Draft'],
      ['JE-2050', '6200 Freight', 'SkyBridge Cargo', 'USD 7,462', 'Pending'],
    ],
  },
]

const tone = {
  Open: 'info',
  Packed: 'info',
  Paid: 'ok',
  Posted: 'ok',
  'In transit': 'ok',
  'At port': 'info',
  Pending: 'warn',
  Draft: 'warn',
  Failed: 'bad',
  Hold: 'bad',
}

function statusClass(value) {
  return `cl-status is-${tone[value] || 'info'}`
}

export function CoreLukeShowcase() {
  const searchId = useId()
  const paletteRef = useRef(null)
  const [dark, setDark] = useState(false)
  const [workspaceId, setWorkspaceId] = useState('commerce')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [palette, setPalette] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [tickets, setTickets] = useState(kitchenSeed)

  const workspace = workspaces.find((item) => item.id === workspaceId) || workspaces[0]
  const isKitchen = workspaceId === 'kitchen'

  const statuses = useMemo(() => {
    if (isKitchen) return ['All', ...stages]
    return ['All', ...new Set(workspace.rows.map((row) => row[4]))]
  }, [isKitchen, workspace])

  const rows = workspace.rows.filter((row) => {
    const hay = row.join(' ').toLowerCase()
    const matchesQuery = hay.includes(query.trim().toLowerCase())
    const matchesStatus = status === 'All' || row[4] === status
    return matchesQuery && matchesStatus
  })

  const visibleTickets = tickets.filter((ticket) => {
    const hay = `${ticket.id} ${ticket.items} ${ticket.station}`.toLowerCase()
    const matchesQuery = hay.includes(query.trim().toLowerCase())
    const matchesStatus = status === 'All' || ticket.stage === status
    return matchesQuery && matchesStatus
  })

  const paletteItems = useMemo(() => {
    const items = [
      ...workspaces.map((item) => ({ id: item.id, label: item.label, hint: 'Workspace', icon: item.icon })),
      { id: 'kitchen', label: 'Kitchen', hint: 'POS → pass', icon: 'bell' },
    ]
    const q = paletteQuery.trim().toLowerCase()
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items
  }, [paletteQuery])

  const openWorkspace = (id) => {
    setWorkspaceId(id)
    setQuery('')
    setStatus('All')
    setPalette(false)
    setPaletteQuery('')
  }

  const bump = (id) => {
    setTickets((list) =>
      list.map((ticket) => {
        if (ticket.id !== id) return ticket
        const next = stages[Math.min(stages.indexOf(ticket.stage) + 1, stages.length - 1)]
        return { ...ticket, stage: next, wait: next === 'Served' ? 'done' : 'just now' }
      }),
    )
  }

  useEffect(() => {
    if (!palette) return
    const onKey = (event) => {
      if (event.key === 'Escape') setPalette(false)
    }
    window.addEventListener('keydown', onKey)
    paletteRef.current?.querySelector('input')?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [palette])

  return (
    <div className="cl-wrap">
      <div className={`cl ${dark ? 'is-dark' : ''}`}>
        <div className="cl-bar" aria-hidden="true">
          <i /><i /><i />
          <span>core.buildwithluke.com</span>
        </div>

        <div className="cl-shell">
          <aside className="cl-side">
            <div className="cl-brand">
              <span className="cl-mark" aria-hidden="true">C</span>
              <span>
                <strong>CoreLuke</strong>
                <small>Luqman Hakim</small>
              </span>
            </div>
            <p className="cl-side-label">Workspace</p>
            <nav aria-label="CoreLuke workspaces">
              {workspaces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="cl-nav"
                  aria-current={workspaceId === item.id ? 'page' : undefined}
                  onClick={() => openWorkspace(item.id)}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                className="cl-nav"
                aria-current={isKitchen ? 'page' : undefined}
                onClick={() => openWorkspace('kitchen')}
              >
                <Icon name="bell" size={16} />
                Kitchen
              </button>
            </nav>
          </aside>

          <div className="cl-main">
            <header className="cl-top">
              <label className="cl-search" htmlFor={searchId}>
                <Icon name="search" size={15} />
                <input
                  id={searchId}
                  value={query}
                  placeholder={isKitchen ? 'Search tickets' : `Search ${workspace.page.toLowerCase()}`}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
              <button type="button" className="cl-kbd" onClick={() => setPalette(true)}>
                Quick action <kbd>Ctrl K</kbd>
              </button>
              <button
                type="button"
                className="cl-icon"
                aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
                onClick={() => setDark((value) => !value)}
              >
                <Icon name={dark ? 'sun' : 'moon'} size={16} />
              </button>
              <span className="cl-avatar" aria-hidden="true">LH</span>
            </header>

            <div className="cl-page">
              <div className="cl-head">
                <div>
                  <p className="cl-crumb">CoreLuke / {isKitchen ? 'F&B' : workspace.label}</p>
                  <h3>{isKitchen ? 'Kitchen display' : workspace.page}</h3>
                  <p>{isKitchen ? 'Tickets bumped from the POS. Same records, next station.' : workspace.sub}</p>
                </div>
                <a href={LIVE} target="_blank" rel="noreferrer">
                  Open library
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>

              {!isKitchen && (
                <ul className="cl-kpis">
                  {workspace.kpis.map((kpi) => (
                    <li key={kpi.label}>
                      <span>{kpi.label}</span>
                      <strong>{kpi.value}</strong>
                      <em className={kpi.up ? 'is-up' : 'is-down'}>
                        {kpi.up ? '↑' : '↓'} {kpi.delta}
                      </em>
                    </li>
                  ))}
                </ul>
              )}

              {isKitchen && (
                <ul className="cl-kpis">
                  {stages.map((stage) => (
                    <li key={stage}>
                      <span>{stage}</span>
                      <strong>{tickets.filter((ticket) => ticket.stage === stage).length}</strong>
                      <em>on the pass</em>
                    </li>
                  ))}
                </ul>
              )}

              <div className="cl-filters" role="group" aria-label="Filter by status">
                {statuses.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={status === item}
                    onClick={() => setStatus(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {isKitchen ? (
                <div className="cl-board">
                  {(status === 'All' ? stages : [status]).map((stage) => (
                    <section key={stage}>
                      <h4>
                        {stage}
                        <span>{visibleTickets.filter((ticket) => ticket.stage === stage).length}</span>
                      </h4>
                      {visibleTickets
                        .filter((ticket) => ticket.stage === stage)
                        .map((ticket) => (
                          <article key={ticket.id}>
                            <strong>{ticket.id}</strong>
                            <p>{ticket.items}</p>
                            <small>{ticket.station} · {ticket.wait}</small>
                            {stage !== 'Served' && (
                              <button type="button" onClick={() => bump(ticket.id)}>
                                Bump to pass
                              </button>
                            )}
                          </article>
                        ))}
                    </section>
                  ))}
                </div>
              ) : (
                <div className="cl-table-wrap">
                  <table className="cl-table">
                    <thead>
                      <tr>
                        {workspace.cols.map((col) => (
                          <th key={col} scope="col">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 && (
                        <tr>
                          <td className="cl-empty" colSpan={5}>Nothing matches that filter.</td>
                        </tr>
                      )}
                      {rows.map((row) => (
                        <tr key={row[0]}>
                          <td className="cl-mono">{row[0]}</td>
                          <td>{row[1]}</td>
                          <td>{row[2]}</td>
                          <td className="cl-mono">{row[3]}</td>
                          <td><span className={statusClass(row[4])}>{row[4]}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {palette && (
          <div className="cl-scrim" onClick={() => setPalette(false)}>
            <div
              ref={paletteRef}
              className="cl-palette"
              role="dialog"
              aria-modal="true"
              aria-label="Quick action"
              onClick={(event) => event.stopPropagation()}
            >
              <label>
                <Icon name="search" size={15} />
                <input
                  value={paletteQuery}
                  placeholder="Jump to a workspace"
                  onChange={(event) => setPaletteQuery(event.target.value)}
                />
              </label>
              <ul>
                {paletteItems.length === 0 && <li className="cl-palette-empty">No matches</li>}
                {paletteItems.map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => openWorkspace(item.id)}>
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                      <em>{item.hint}</em>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <p className="cl-note">
        A working slice of the CoreLuke shell — workspace switch, theme, search, status filters
        and the kitchen bump. The full library, with 30 workspaces, is at{' '}
        <a href={LIVE} target="_blank" rel="noreferrer">
          core.buildwithluke.com
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  )
}
