import "../NewsPage.css";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SavedNews() {
  const navigate = useNavigate();
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

  <Link to="/" className="news-logo">
    PULSE
  </Link>

  <div className="news-nav-links">

    <Link to="/news">Home</Link>
    <Link to="/news">Categories</Link>
    <Link to="/news">Trending</Link>
    <Link to="/saved">Saved</Link>

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