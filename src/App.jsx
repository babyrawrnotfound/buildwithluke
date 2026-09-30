const projects = []

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <h1>Your Name</h1>
        <p className="tagline">Software developer</p>
        <div className="links">
          <a href="https://github.com/babyrawrnotfound" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:muhdluqman3045@gmail.com">Email</a>
        </div>
      </header>

      <section className="section">
        <h2>About</h2>
        <p>
          Write a couple of sentences about yourself here — what you build,
          what you're learning, what you're looking for.
        </p>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <div className="projects">
          {projects.map((p) => (
            <a className="project-card" key={p.name} href={p.link} target="_blank" rel="noreferrer">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Your Name</p>
      </footer>
    </div>
  )
}
