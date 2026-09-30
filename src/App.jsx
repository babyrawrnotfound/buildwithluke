import { useEffect, useRef, useState } from 'react'
import { approach, capabilities, projects, security } from './data.js'
import { Icon } from './designKit.jsx'
import Design from './Design.jsx'
import './App.css'

const EMAIL = 'muhdluqman3045@gmail.com'
const YEAR = new Date().getFullYear()

const nav = [
  { id: 'work', label: 'Work' },
  { id: 'design', label: 'Design' },
  { id: 'security', label: 'Security' },
  { id: 'approach', label: 'Approach' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

const filters = [
  { id: 'all', label: 'All' },
  { id: 'system', label: 'Systems' },
  { id: 'app', label: 'Apps' },
]

const categoryLabel = { system: 'System', app: 'App' }

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'system'
    } catch {
      return 'system'
    }
  })
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemDark(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const dark = theme === 'dark' || (theme === 'system' && systemDark)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage unavailable (private mode) — theme still applies for this visit
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0c0d10' : '#f5f4ef')
  }, [theme, dark])

  return { dark, toggle: () => setTheme(dark ? 'light' : 'dark') }
}

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = nav.map((item) => document.getElementById(item.id)).filter(Boolean)
    const inBand = new Set()

    // The last section is too short to reach the middle band, so the page
    // bottom always counts as being on it.
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4
      if (atBottom) return setActive(nav[nav.length - 1].id)
      const current = nav.find((item) => inBand.has(item.id))
      setActive(current ? current.id : '')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inBand.add(entry.target.id)
          else inBand.delete(entry.target.id)
        })
        update()
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    elements.forEach((el) => observer.observe(el))

    const onScroll = () => update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return active
}

function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

function Reveal({ children, as: Tag = 'div', className = '', delay = 0, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Content already on screen at load must never start hidden.
    if (reduced || el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { '--delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function SystemPreview() {
  return (
    <div className="mock mock-web" aria-hidden="true">
      <div className="mock-bar">
        <i /><i /><i />
        <span className="mock-url" />
      </div>
      <div className="mock-body">
        <div className="mock-side">
          <span /><span /><span /><span />
        </div>
        <div className="mock-main">
          <div className="mock-tiles">
            <span /><span /><span />
          </div>
          <div className="mock-chart">
            {[42, 64, 38, 78, 56, 88, 70, 95].map((h, i) => (
              <span key={i} style={{ '--h': `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AppPreview() {
  return (
    <div className="mock mock-phone" aria-hidden="true">
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-head" />
        <div className="phone-rows">
          <span /><span /><span /><span />
        </div>
        <div className="phone-tabs">
          <i /><i /><i />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }) {
  return (
    <article
      className={`card ${project.featured ? 'card-featured' : ''}`}
      style={{ '--hue': project.hue }}
    >
      <div className="card-visual">
        {project.category === 'app' ? <AppPreview /> : <SystemPreview />}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="chip">{categoryLabel[project.category]}</span>
          <span>{project.platform}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="card-tagline">{project.tagline}</p>
        <ul className="card-points">
          {project.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="card-foot">
          <ul className="stack-list" aria-label="Built with">
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <button type="button" className="link-btn" onClick={() => onOpen(project.id)}>
            Case study
            <span className="sr-only">: {project.name}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

function CaseStudy({ project, onClose, onPrev, onNext, position }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  useEffect(() => {
    ref.current?.querySelector('.dialog-scroll')?.scrollTo(0, 0)
  }, [project?.id])

  const onBackdrop = (event) => {
    if (event.target === ref.current) onClose()
  }

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={onBackdrop}
      style={project ? { '--hue': project.hue } : undefined}
    >
      {project && (
        <div className="dialog-inner">
          <header className="dialog-head">
            <span className="dialog-count">{position}</span>
            <div className="dialog-nav">
              <button type="button" className="icon-btn" onClick={onPrev} aria-label="Previous project">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
              </button>
              <button type="button" className="icon-btn" onClick={onNext} aria-label="Next project">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5" /></svg>
              </button>
              <button type="button" className="icon-btn" onClick={onClose} aria-label="Close case study">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" /></svg>
              </button>
            </div>
          </header>

          <div className="dialog-scroll">
            <div className="dialog-hero">
              <div className="card-meta">
                <span className="chip">{categoryLabel[project.category]}</span>
                <span>{project.platform}</span>
              </div>
              <h2 id="case-title">{project.name}</h2>
              <p className="dialog-tagline">{project.tagline}</p>
            </div>

            <dl className="facts">
              <div>
                <dt>Built for</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>{project.platform}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(' · ')}</dd>
              </div>
            </dl>

            {project.stats?.length > 0 && (
              <ul className="dialog-stats">
                {project.stats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            )}

            <section className="dialog-section">
              <h3>Overview</h3>
              <p>{project.summary}</p>
            </section>

            <section className="dialog-section">
              <h3>The problem</h3>
              <p>{project.problem}</p>
            </section>

            <section className="dialog-section">
              <h3>What I built</h3>
              <ul className="check-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <section className="dialog-section">
              <h3>Under the hood</h3>
              <ul className="dash-list">
                {project.engineering.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function App() {
  const { dark, toggle } = useTheme()
  const active = useActiveSection()
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [copied, setCopied] = useState(false)

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  const openIndex = visible.findIndex((p) => p.id === openId)
  const openProject = openIndex >= 0 ? visible[openIndex] : null
  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length)

  const step = (dir) => {
    if (openIndex < 0) return
    setOpenId(visible[(openIndex + dir + visible.length) % visible.length].id)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const closeMenu = () => setMenuOpen(false)
  const systems = count('system')
  const apps = count('app')

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className={`topbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="topbar-inner">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">L</span>
            <span className="brand-text">buildwithluke</span>
          </a>

          <nav id="site-nav" className="nav" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {dark ? (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="3" />
                  <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
                </svg>
              )}
            </button>
            <a className="btn btn-primary btn-sm hide-sm" href="#contact">
              Start a project
            </a>
            <button
              type="button"
              className={`menu-btn ${menuOpen ? 'is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="pulse" aria-hidden="true" /> Available for new projects
              </p>
              <h1>
                I build the systems <span className="accent-text">businesses run on.</span>
              </h1>
              <p className="lede">
                Full-stack developer in Malaysia. I design and ship business platforms, mobile apps
                and the Linux infrastructure behind them — from the first database table to the
                production server.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#work">
                  See the work
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Get in touch
                </a>
              </div>
            </div>

            <div className="terminal" aria-label="Summary">
              <div className="terminal-bar" aria-hidden="true">
                <i /><i /><i />
                <span>luke@buildwithluke: ~</span>
              </div>
              <div className="terminal-body">
                <p><span className="prompt">$</span> whoami</p>
                <p className="out">luke — full-stack &amp; systems developer</p>
                <p><span className="prompt">$</span> ls ~/shipped</p>
                <ul className="out ls">
                  {projects.map((p) => (
                    <li key={p.id} style={{ '--hue': p.hue }}>
                      <span className="ls-dot" />
                      {p.name}
                      <em>{categoryLabel[p.category].toLowerCase()}</em>
                    </li>
                  ))}
                </ul>
                <p>
                  <span className="prompt">$</span> <span className="cursor" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>

          <div className="container">
            <ul className="stats">
              <li>
                <strong>{projects.length}</strong>
                <span>Products built</span>
              </li>
              <li>
                <strong>{systems}</strong>
                <span>Business systems</span>
              </li>
              <li>
                <strong>{apps}</strong>
                <span>Apps</span>
              </li>
              <li>
                <strong>Code → server</strong>
                <span>End-to-end ownership</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 id="work-title">Systems and apps I’ve built</h2>
              </div>
              <p className="section-note">
                Most of this work is private client software, so each project is described as a
                case study rather than linked to source.
              </p>
            </Reveal>

            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="filter"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                  <span className="filter-count">{count(f.id)}</span>
                </button>
              ))}
            </div>

            <div className="grid" aria-live="polite">
              {visible.map((project, index) => (
                <Reveal
                  key={project.id}
                  className={project.featured && filter !== 'app' ? 'span-2' : ''}
                  delay={(index % 2) * 80}
                >
                  <ProjectCard project={project} onOpen={setOpenId} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="design" aria-labelledby="design-title">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <p className="eyebrow">Design</p>
                <h2 id="design-title">Interfaces I’ve designed</h2>
              </div>
              <p className="section-note">
                Working recreations of real screens from five of my products — web components,
                a fleet dashboard and three mobile apps. Click, type and filter; they respond like
                the originals.
              </p>
            </Reveal>
            <Design />
          </div>
        </section>

        <section className="section" id="security" aria-labelledby="security-title">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <p className="eyebrow">Security</p>
                <h2 id="security-title">Security I build in</h2>
              </div>
              <p className="section-note">
                These platforms hold credentials, device access and company data, so security is
                part of the first version — not a later patch. Everything here is implemented in the
                projects above.
              </p>
            </Reveal>
            <div className="sec-grid">
              {security.map((area, index) => (
                <Reveal key={area.title} className="sec-card" delay={(index % 4) * 60}>
                  <span className="sec-icon">
                    <Icon name={area.icon} size={20} />
                  </span>
                  <h3>{area.title}</h3>
                  <ul>
                    {area.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <Reveal className="sec-principles">
              {['Secure by default', 'Least privilege', 'Fail closed', 'Verify, don’t assume'].map(
                (p) => (
                  <span key={p}>
                    <Icon name="check" size={16} /> {p}
                  </span>
                ),
              )}
            </Reveal>
          </div>
        </section>

        <section className="section section-alt" id="approach" aria-labelledby="approach-title">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <p className="eyebrow">Approach</p>
                <h2 id="approach-title">How I work</h2>
              </div>
            </Reveal>
            <ol className="steps">
              {approach.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 70}>
                  <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="stack" aria-labelledby="stack-title">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <p className="eyebrow">Stack</p>
                <h2 id="stack-title">What I build with</h2>
              </div>
              <p className="section-note">Everything here is used in the projects above.</p>
            </Reveal>
            <div className="caps">
              {capabilities.map((group, index) => (
                <Reveal key={group.label} className="cap" delay={(index % 3) * 60}>
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-contact" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <Reveal className="cta">
              <p className="eyebrow">
                <span className="pulse" aria-hidden="true" /> Open to projects
              </p>
              <h2 id="contact-title">Have a system that needs building?</h2>
              <p className="cta-lede">
                Internal tools, business platforms, mobile apps or a server to run them on — tell me
                what your team is stuck on.
              </p>
              <div className="cta-actions">
                <a className="btn btn-light" href={`mailto:${EMAIL}`}>
                  Email me
                </a>
                <button type="button" className="copy" onClick={copyEmail}>
                  <span>{EMAIL}</span>
                  <em aria-live="polite">{copied ? 'Copied' : 'Copy'}</em>
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {YEAR} Luke · buildwithluke.com</span>
          <span>Self-hosted on a Linux VPS I set up and run.</span>
        </div>
      </footer>

      <CaseStudy
        project={openProject}
        position={openProject ? `${openIndex + 1} / ${visible.length}` : ''}
        onClose={() => setOpenId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  )
}
