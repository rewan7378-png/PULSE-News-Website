import "../NewsPage.css";
import { getTopHeadlines, getNewsByCategory } from "../api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NewsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Saved News
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("pulseSavedNews");

    return saved ? JSON.parse(saved) : [];
  });

  const [showSaved, setShowSaved] = useState(false);

  const searchResults = location.state?.searchResults;
  const searchQuery = location.state?.searchQuery;

  useEffect(() => {
    if (searchResults && searchQuery) {
      setArticles(searchResults);
      setLoading(false);
      setError("");

      return;
    }

    loadAllNews();
  }, [searchResults, searchQuery]);

  const loadAllNews = () => {
    setLoading(true);
    setError("");

    getTopHeadlines()
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("API ERROR:", error);
        setError("Failed to load news. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadCategory = (category) => {
    setLoading(true);
    setError("");
    setShowSaved(false);

    getNewsByCategory(category)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("CATEGORY ERROR:", error);
        setError("Failed to load news. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleSaveArticle = (article) => {
    setSavedArticles((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (saved) => saved.article_id === article.article_id
      );

      let updatedSaved;

      if (alreadySaved) {
        updatedSaved = currentSaved.filter(
          (saved) => saved.article_id !== article.article_id
        );
      } else {
        updatedSaved = [...currentSaved, article];
      }

      localStorage.setItem(
        "pulseSavedNews",
        JSON.stringify(updatedSaved)
      );

      return updatedSaved;
    });
  };

  const isSaved = (article) => {
    return savedArticles.some(
      (saved) => saved.article_id === article.article_id
    );
  };

  const goToAllNews = (e) => {
    e.preventDefault();

    setShowSaved(false);

    navigate("/news", {
      replace: true,
      state: null,
    });

    loadAllNews();
  };

  const showSavedNews = (e) => {
    e.preventDefault();

    setShowSaved(true);
    setLoading(false);
    setError("");
  };

  const featured = articles[0];
  const sideNews = articles.slice(1, 4);
  const latestNews = articles.slice(4, 7);
  const trendingNews = articles.slice(7, 10);

  const categories = [
    { name: "Politics", apiName: "politics" },
    { name: "Economy", apiName: "business" },
    { name: "Sports", apiName: "sports" },
    { name: "Society", apiName: "top" },
    { name: "Science", apiName: "science" },
    { name: "Tech", apiName: "technology" },
    { name: "Food", apiName: "food" },
    { name: "Climate", apiName: "environment" },
  ];

  const formatCategory = (category) => {
    if (!category) return "News";

    return category
      .replace("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading
  if (loading) {
    return (
      <div className="news-page">
        <h2>Loading latest news...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="news-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="news-page">

      {/* Navbar */}
      <nav className="news-navbar">

        <a href="/" className="news-logo">
          PULSE
        </a>

        <div className="news-nav-links">

          <a
            href="/news"
            onClick={goToAllNews}
          >
            Home
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("politics");
            }}
          >
            Politics
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("business");
            }}
          >
            Economy
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("sports");
            }}
          >
            Sports
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("top");
            }}
          >
            Society
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("science");
            }}
          >
            Science & Tech
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("food");
            }}
          >
            Food
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              loadCategory("environment");
            }}
          >
            Climate
          </a>

          {/* Saved */}
          <a
            href="/saved"
            onClick={showSavedNews}
          >
            🔖 Saved
          </a>

        </div>

      </nav>

      {/* ================= SAVED NEWS ================= */}

      {showSaved ? (

        <section className="latest-news">

          <div className="section-header">

            <h2>
              🔖 Saved News
            </h2>

            <a
              href="/news"
              onClick={goToAllNews}
            >
              Back to News
            </a>

          </div>

          {savedArticles.length === 0 ? (

            <h3>
              You haven't saved any news yet.
            </h3>

          ) : (

            <div className="latest-news-grid">

              {savedArticles.map((article, index) => (

                <div
                  className="news-card"
                  key={article.article_id || index}
                >

                  <a
                    href={article.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >

                    <img
                      src={
                        article.image_url ||
                        "https://images.unsplash.com/photo-1500534623283-312aade485b7"
                      }
                      alt={article.title}
                    />

                  </a>

                  <div className="news-card-content">

                    <span>
                      {formatCategory(article.category?.[0])}
                    </span>

                    <h2>
                      {article.title}
                    </h2>

                    <p>
                      {formatDate(article.pubDate)}
                    </p>

                    <button
                      className="save-button saved"
                      onClick={() => toggleSaveArticle(article)}
                    >
                      🔖 Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      ) : (

        <>
          {/* Search Result Title */}

          {searchQuery && (
  <div className="search-results-header">

    <div>
      <span className="search-results-label">
        SEARCH RESULTS
      </span>

      <h2>
        "{searchQuery}"
      </h2>
    </div>

    <button
      className="back-to-news-button"
      onClick={goToAllNews}
    >
      ← Back to News
    </button>

  </div>
)}

          {/* ================= FEATURED ================= */}

          {featured && (
            <section className="featured-news">

              <div className="featured-image">

                <img
                  src={
                    featured.image_url ||
                    "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                  }
                  alt={featured.title || "Featured news"}
                />

              </div>

              <div className="featured-content">

                <span className="featured-category">
                  {formatCategory(featured.category?.[0])}
                </span>

                <h1>
                  {featured.title}
                </h1>

                <p>
                  {featured.description ||
                    "Stay updated with the most important stories and developments happening around the world."}
                </p>

                <span className="featured-date">
                  {formatDate(featured.pubDate)}
                </span>

                <div className="featured-actions">

                  <a
                    href={featured.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button>
                      Read More
                    </button>
                  </a>

                  <button
                    className={`save-button ${
                      isSaved(featured) ? "saved" : ""
                    }`}
                    onClick={() => toggleSaveArticle(featured)}
                  >
                    {isSaved(featured)
                      ? "🔖 Saved"
                      : "🔖 Save"}
                  </button>

                </div>

              </div>

            </section>
          )}

          {/* ================= SIDE NEWS ================= */}

          {sideNews.length > 0 && (
            <section className="side-news">

              {sideNews.map((article, index) => (

                <div
                  className="news-card"
                  key={article.article_id || index}
                >

                  <a
                    href={article.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >

                    <img
                      src={
                        article.image_url ||
                        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2"
                      }
                      alt={article.title}
                    />

                  </a>

                  <div className="news-card-content">

                    <span>
                      {formatCategory(article.category?.[0])}
                    </span>

                    <h2>
                      {article.title}
                    </h2>

                    <p>
                      {formatDate(article.pubDate)}
                    </p>

                    <button
                      className={`save-button ${
                        isSaved(article) ? "saved" : ""
                      }`}
                      onClick={() => toggleSaveArticle(article)}
                    >
                      {isSaved(article)
                        ? "🔖 Saved"
                        : "🔖 Save"}
                    </button>

                  </div>

                </div>

              ))}

            </section>
          )}

          {/* ================= LATEST NEWS ================= */}

          {latestNews.length > 0 && (
            <section className="latest-news">

              <div className="section-header">

                <h2>
                  Latest News
                </h2>

                <a
                  href="/news"
                  onClick={goToAllNews}
                >
                  View All
                </a>

              </div>

              <div className="latest-news-grid">

                {latestNews.map((article, index) => (

                  <div
                    className="news-card"
                    key={article.article_id || index}
                  >

                    <a
                      href={article.link || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <img
                        src={
                          article.image_url ||
                          "https://images.unsplash.com/photo-1500534623283-312aade485b7"
                        }
                        alt={article.title}
                      />

                    </a>

                    <div className="news-card-content">

                      <span>
                        {formatCategory(article.category?.[0])}
                      </span>

                      <h2>
                        {article.title}
                      </h2>

                      <p>
                        {formatDate(article.pubDate)}
                      </p>

                      <button
                        className={`save-button ${
                          isSaved(article) ? "saved" : ""
                        }`}
                        onClick={() => toggleSaveArticle(article)}
                      >
                        {isSaved(article)
                          ? "🔖 Saved"
                          : "🔖 Save"}
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </section>
          )}

          {/* ================= TRENDING ================= */}

          {trendingNews.length > 0 && (
            <section className="trending-news">

              <div className="section-header">
                <h2>
                  Trending Headlines
                </h2>
              </div>

              <div className="trending-list">

                {trendingNews.map((article, index) => (

                  <div
                    className="trending-item"
                    key={article.article_id || index}
                  >

                    <a
                      href={article.link || "#"}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <span className="trending-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </a>

                    <div>

                      <span>
                        {formatCategory(article.category?.[0])}
                      </span>

                      <h3>
                        {article.title}
                      </h3>

                      <p>
                        {formatDate(article.pubDate)}
                      </p>

                      <button
                        className={`save-button ${
                          isSaved(article) ? "saved" : ""
                        }`}
                        onClick={() => toggleSaveArticle(article)}
                      >
                        {isSaved(article)
                          ? "🔖 Saved"
                          : "🔖 Save"}
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </section>
          )}

          {/* ================= CATEGORIES ================= */}

          <section className="categories">

            <div className="section-header">
              <h2>
                Explore Categories
              </h2>
            </div>

            <div className="categories-grid">

              <button
                className="category-card"
                onClick={goToAllNews}
              >
                <span>
                  All
                </span>
              </button>

              {categories.map((category) => (

                <button
                  className="category-card"
                  key={category.name}
                  onClick={() =>
                    loadCategory(category.apiName)
                  }
                >
                  <span>
                    {category.name}
                  </span>
                </button>

              ))}

            </div>

          </section>

        </>
      )}

    </div>
  );
}

export default NewsPage;