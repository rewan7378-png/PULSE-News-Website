import "../NewsPage.css";
import { useEffect, useState } from "react";

function SavedNews() {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pulseSavedNews")) || [];
    setSavedNews(saved);
  }, []);

  const removeSavedNews = (articleId) => {
    const updatedNews = savedNews.filter(
      (article) => article.article_id !== articleId
    );

    setSavedNews(updatedNews);

    localStorage.setItem(
      "pulseSavedNews",
      JSON.stringify(updatedNews)
    );
  };

  return (
    <div className="news-page">

      <nav className="news-navbar">

        <a href="/" className="news-logo">
          PULSE
        </a>

        <div className="news-nav-links">
          <a href="/news">Home</a>
          <a href="/news">Categories</a>
          <a href="/news">Trending</a>
          <a href="/saved">Saved</a>
        </div>

      </nav>

      <section className="latest-news">

        <div className="section-header">
          <h2>Saved News</h2>
        </div>

        {savedNews.length === 0 ? (

          <p className="empty-saved">
            You haven't saved any news yet. 🔖
          </p>

        ) : (

          <div className="latest-news-grid">

            {savedNews.map((article) => (

              <article
                className="news-card"
                key={article.article_id}
              >

                <img
                  src={
                    article.image_url ||
                    "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                  }
                  alt={article.title}
                />

                <div className="news-card-content">

                  <span>
                    {article.category?.[0] || "News"}
                  </span>

                  <h2>
                    {article.title}
                  </h2>

                  <button
                    onClick={() =>
                      removeSavedNews(article.article_id)
                    }
                  >
                    Remove 🔖
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default SavedNews;