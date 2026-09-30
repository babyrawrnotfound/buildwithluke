const paths = {
  check: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-3.5 9 2.5 2.5 4.5-5',
  error: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-3 6 6 6m0-6-6 6',
  warn: 'M12 4 2.5 20h19L12 4Zm0 6v4m0 3h.01',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 8v5m0-8h.01',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6m4-6v6',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  shield: 'M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4',
  eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  eyeOff:
    'M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3 3.6M6.4 7.5A17 17 0 0 0 2 12s3.5 6 10 6a9.7 9.7 0 0 0 4.3-1M9.9 9.9a3 3 0 0 0 4.2 4.2',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4',
  inbox: 'M3 13h5l2 3h4l2-3h5M3 13l2.5-8h13l2.5 8v6H3v-6Z',
  swap: 'M7 7h13m0 0-4-4m4 4-4 4M17 17H4m0 0 4-4m-4 4 4 4',
  outbox: 'M12 15V4m0 0L8 8m4-4 4 4M4 14v6h16v-6',
  verified: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-3.5 9 2.5 2.5 4.5-5',
  home: 'M4 11 12 4l8 7v9h-5v-6h-6v6H4v-9Z',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM5 20a7 7 0 0 1 14 0',
  box: 'M12 3 4 7v10l8 4 8-4V7l-8-4Zm-8 4 8 4 8-4m-8 4v10',
  plus: 'M12 5v14M5 12h14',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.6M20 5v6h-6',
  filter: 'M4 5h16l-6 7v6l-4 2v-8L4 5Z',
  fingerprint:
    'M12 11v4M8.5 9.5a4 4 0 0 1 7 2.5v2.5M6 12a6 6 0 0 1 11-3.3M7 16.5c.6-1.2 1-2.6 1-4.5M16 19c.4-1.3.6-2.7.6-4M12 19.5c.4-.9.6-2 .6-3.5',
  face: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M9 10v1M15 10v1M12 10v3h-1M9.5 16c1.5 1 3.5 1 5 0',
  ticket: 'M3 8V6h18v2a2 2 0 0 0 0 4v6H3v-6a2 2 0 0 0 0-4ZM14 6v12',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2',
  chat: 'M4 5h16v11H9l-5 4V5Z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2ZM10 20a2 2 0 0 0 4 0',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  truck:
    'M3 6h11v10H3zM14 9h4l3 3v4h-7M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  pin: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Zm0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  fuel: 'M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M4 20h11M5 10h9M14 8l3 2v7a1.5 1.5 0 0 0 3 0V9l-2-2',
  road: 'M8 3 5 21M16 3l3 18M12 4v3M12 11v3M12 18v2',
  pause: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM10 9v6m4-6v6',
  layers: 'M12 4 3 9l9 5 9-5-9-5ZM3 14l9 5 9-5',
  hand: 'M8 12V5a1.5 1.5 0 0 1 3 0v6m0-1V4a1.5 1.5 0 0 1 3 0v6m0-2a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-1a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.3-2L8 14',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  scan: 'M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3M7 9v6M10 9v6M13 9v6M16 9v6',
  arrowRight: 'M5 12h14m-5-5 5 5-5 5',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  chip: 'M8 8h8v8H8zM4 10h2m-2 4h2m12-4h2m-2 4h2M10 4v2m4-2v2m-4 12v2m4-2v2',
  file: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6',
  bug: 'M8 8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0V8ZM12 12v6M4 12h4M16 12h4M5 7l3 2M19 7l-3 2M5 18l3-2M19 18l-3-2',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5v4l3 2',
  key: 'M14.5 4a5.5 5.5 0 1 1-4.9 8H4v3h3v2h3v-3.1A5.5 5.5 0 0 1 14.5 4Zm1.5 4.5h.01',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14',
}

export function Icon({ name, size = 18, className = '' }) {
  return (
    <svg
      className={`ds-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export function Phone({ label, children, dark = false }) {
  return (
    <figure className="wms-phone-wrap">
      <div className={`wms-phone ${dark ? 'is-dark' : ''}`}>
        <div className="wms-status" aria-hidden="true">
          <span>9:41</span>
          <span className="wms-status-icons">
            <i /><i /><i />
          </span>
        </div>
        <div className="wms-screen">{children}</div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  )
}
