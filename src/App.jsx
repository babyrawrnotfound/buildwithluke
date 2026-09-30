import { useEffect, useRef, useState } from 'react'
import './App.css'

const skills = [
  'PHP', 'MySQL', 'JavaScript', 'React', 'Node.js',
  'Linux', 'Caddy / Nginx', 'systemd', 'Git', 'CI/CD',
]

const projects = [
  {
    name: 'buildwithluke',
    description: 'This portfolio — React + Vite, self-deployed on a VPS behind Caddy, no managed hosting.',
    link: 'https://github.com/babyrawrnotfound/buildwithluke',
    tags: ['React', 'Vite', 'Self-hosted'],
  },
]

function Reveal({ children, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggle = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme((current) => {
      const effectiveDark = current === 'dark' || (current === 'system' && prefersDark)
      return effectiveDark ? 'light' : 'dark'
    })
  }

  return { theme, toggle }
}

export default function App() {
  const { toggle } = useTheme()

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">
            build<span>with</span>luke
          </a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li className="theme-toggle-item">
              <button className="theme-toggle" onClick={toggle} aria-label="Toggle color theme">
                ◐
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container" id="top">
        <section className="hero">
          <p className="hero-greeting">Hi, I'm Luke</p>
          <h1 className="hero-title">I build and ship software end-to-end.</h1>
          <p className="hero-subtitle">
            Software developer working across PHP/React application code and the
            Linux infrastructure that runs it — from writing the app to configuring
            the server that serves it.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">View projects</a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
        </section>

        <Reveal as="section" className="section">
          <p id="about" className="eyebrow">About</p>
          <h2 className="section-title">What I do</h2>
          <p className="about-text">
            I'm a developer focused on <strong>practical, self-managed systems</strong> —
            building the application and owning the deployment path, rather than
            treating infrastructure as someone else's problem. That means writing the
            code, setting up the server, and making sure the two actually work
            together in production.
          </p>
        </Reveal>

        <Reveal as="section" className="section">
          <p id="skills" className="eyebrow">Skills</p>
          <h2 className="section-title">Tools I work with</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-chip" key={skill}>{skill}</div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="section">
          <p id="projects" className="eyebrow">Projects</p>
          <h2 className="section-title">Selected work</h2>
          {projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((p) => (
                <a className="project-card" key={p.name} href={p.link} target="_blank" rel="noreferrer">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="project-tags">
                    {p.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="projects-empty">More projects coming soon.</div>
          )}
        </Reveal>

        <Reveal as="section" className="section">
          <p id="contact" className="eyebrow">Contact</p>
          <h2 className="section-title">Let's talk</h2>
          <div className="contact-card">
            <p>Open to interesting projects and opportunities — reach out any time.</p>
            <div className="contact-actions">
              <a className="btn btn-primary" href="mailto:muhdluqman3045@gmail.com">Email me</a>
              <a className="btn btn-ghost" href="https://github.com/babyrawrnotfound" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </Reveal>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Luke</span>
          <a href="https://github.com/babyrawrnotfound/buildwithluke" target="_blank" rel="noreferrer">
            View source
          </a>
        </footer>
      </main>
    </>
  )
}
