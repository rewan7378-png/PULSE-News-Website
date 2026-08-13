import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchNews } from "../api";
import newsBackground from "../assets/news-background.jpeg";

function LandingPage() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();

  const message = "Discover what's happening around the world...";

  useEffect(() => {
    let timer;

    if (!isDeleting && text === message) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && text === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 1000);
    } else if (!isDeleting) {
      timer = setTimeout(() => {
        setText(message.substring(0, text.length + 1));
      }, 100);
    } else {
      timer = setTimeout(() => {
        setText(message.substring(0, text.length - 1));
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    try {
      setSearchLoading(true);

      const results = await searchNews(search.trim());

      navigate("/news", {
        state: {
          searchResults: results,
          searchQuery: search.trim(),
        },
      });
    } catch (error) {
      console.error("SEARCH ERROR:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <main
      className="landing-page"
      style={{ backgroundImage: `url(${newsBackground})` }}
    >
      <header className="landing-header">

        <div className="brand">
          <h2 className="logo">
            <span className="pulse-p">P</span>ULSE
          </h2>

          <p>Stay informed. Stay ahead.</p>
        </div>

        <nav className="navbar">
          <a className="active" href="#">
            Home
          </a>

          <a
            href="/news"
            onClick={(e) => {
              e.preventDefault();
              navigate("/news");
            }}
          >
            Categories
          </a>

          <a
            href="/news"
            onClick={(e) => {
              e.preventDefault();
              navigate("/news");
            }}
          >
            Trending
          </a>

          <a
  href="/saved"
  onClick={(e) => {
    e.preventDefault();
    navigate("/saved");
  }}
>
  Saved
</a>

            <a
  href="/about"
  onClick={(e) => {
    e.preventDefault();
    navigate("/about");
  }}
>
  About Us
</a>
        </nav>

        <form className="nav-actions" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" disabled={searchLoading}>
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </form>

      </header>

      <section className="landing-content">

        <p className="welcome-text">
          Welcome to NEWS
        </p>

        <h1>
          Your world.
          <br />
          Your news.
        </h1>

        <p className="typing-text">
          {text}
          <span className="cursor">|</span>
        </p>

        <div className="landing-buttons">

          <button onClick={() => navigate("/ai")}>
            Ask AI About a News🤖
          </button>

          <button
            onClick={() => navigate("/news")}
          >
            Latest News (24h)
          </button>

        </div>

      </section>

      <section className="features-section">

        <div className="feature-card">
          <div className="feature-icon">📰</div>

          <h3>Latest News</h3>

          <p>
            Stay updated with the latest stories and breaking news
            from around the world.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🤖</div>

          <h3>AI Assistant</h3>

          <p>
            Ask AI about any news story and get quick, clear answers
            and insights.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔥</div>

          <h3>Trending</h3>

          <p>
            Discover the stories and topics everyone is talking about
            right now.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔖</div>

          <h3>Save News</h3>

          <p>
            Save interesting stories and easily come back to them
            whenever you want.
          </p>
        </div>

      </section>

    </main>
  );
}

export default LandingPage;