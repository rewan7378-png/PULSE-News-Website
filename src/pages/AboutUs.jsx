import "../AboutUs.css";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      <nav className="about-navbar">

        <button
          className="about-logo"
          onClick={() => navigate("/")}
        >
          PULSE
        </button>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </nav>

      <main className="about-content">

        <p className="about-label">
          ABOUT PULSE
        </p>

        <h1>
          Stay informed.
          <br />
          Stay ahead.
        </h1>

        <p className="about-intro">
          PULSE is a modern news platform designed to keep you
          connected with the latest stories and important events
          happening around the world.
        </p>

        <section className="about-cards">

          <div className="about-card">
            <div className="about-icon">📰</div>

            <h2>Latest News</h2>

            <p>
              Discover the latest headlines and important stories
              from different categories around the world.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🔎</div>

            <h2>Easy Search</h2>

            <p>
              Search for the news you care about and quickly find
              relevant stories.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🔖</div>

            <h2>Save Stories</h2>

            <p>
              Save interesting news stories and come back to them
              whenever you want.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🤖</div>

            <h2>AI Assistant</h2>

            <p>
              Get quick answers and insights about news stories
              with our AI-powered assistant.
            </p>
          </div>

        </section>

        <section className="about-tech">

          <h2>Built With</h2>

          <div className="tech-list">
            <span>React</span>
            <span>JavaScript</span>
            <span>NewsData API</span>
            <span>CSS</span>
          </div>

        </section>
        <section className="contact-section">

  <p className="about-label">GET IN TOUCH</p>

  <h2>Contact Us</h2>

  <p className="contact-text">
    Have a question or feedback?
    We'd love to hear from you.
  </p>

  <div className="contact-links">

    <a href="ra1974340@gmail.com">
      📧 Gmail
    </a>

    <a
      href="https://github.com/rewan7378-png"
      target="_blank"
      rel="noreferrer"
    >
      🔗 GitHub
    </a>

    <a
      href="https://www.linkedin.com/in/rewan-ahmed-0079323b6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
      target="_blank"
      rel="noreferrer"
    >
      💼 LinkedIn
    </a>

  </div>

</section>
      </main>

    </div>
  );
}

export default AboutUs;