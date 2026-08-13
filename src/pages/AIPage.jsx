import "../NewsPage.css";
import { useState } from "react";
import { searchNews } from "../api";

function AIPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const query = question.trim();

      // Remove common question words and keep important keywords
      const stopWords = [
        "what",
        "whats",
        "what's",
        "is",
        "are",
        "the",
        "a",
        "an",
        "in",
        "on",
        "about",
        "happening",
        "happen",
        "latest",
        "news",
        "tell",
        "me",
        "today",
        "currently",
        "can",
        "you",
        "give",
        "show",
        "information",
        "about",
      ];

      const keywords = query
        .toLowerCase()
        .replace(/[?.,!]/g, "")
        .split(/\s+/)
        .filter(
          (word) =>
            word.length > 2 && !stopWords.includes(word)
        );

      const searchQuery = keywords.join(" ");

      const searchResults = await searchNews(searchQuery);

      if (searchResults.length === 0) {
        setAnswer(
          `I couldn't find any news related to "${searchQuery}".

Try asking about another topic such as Technology, Sports, Politics, Economy, Science, Climate, or Food.`
        );

        return;
      }

      // Make sure the returned articles actually contain the keywords
      const relevantArticles = searchResults.filter((article) => {
        const articleText = `
          ${article.title || ""}
          ${article.description || ""}
          ${article.content || ""}
          ${article.category?.join(" ") || ""}
        `.toLowerCase();

        return keywords.some((keyword) =>
          articleText.includes(keyword)
        );
      });

      if (relevantArticles.length === 0) {
        setAnswer(
          `I couldn't find reliable news related to "${searchQuery}" in the current PULSE feed.

Try searching for another topic.`
        );

        return;
      }

      const results = relevantArticles
        .slice(0, 5)
        .map(
          (article, index) =>
            `${index + 1}. ${article.title}\n${
              article.description || "No description available."
            }`
        )
        .join("\n\n");

      setAnswer(
        `Here are some news stories related to "${searchQuery}" from the current PULSE news feed:

${results}`
      );
    } catch (error) {
      console.error("AI SEARCH ERROR:", error);

      setAnswer(
        "Sorry, I couldn't search the news right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news-page">

      <nav className="news-navbar">

        <a href="/" className="news-logo">
          PULSE
        </a>

        <div className="news-nav-links">

          <a href="/">
            Home
          </a>

          <a href="/news">
            News
          </a>

          <a href="/saved">
            🔖 Saved
          </a>

        </div>

      </nav>

      <section
        style={{
          maxWidth: "900px",
          margin: "80px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >

        <span
          style={{
            color: "#36a9ff",
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          PULSE AI
        </span>

        <h1
          style={{
            fontSize: "48px",
            margin: "15px 0",
          }}
        >
          Ask AI About the News
        </h1>

        <p
          style={{
            color: "#aab7c7",
            fontSize: "16px",
            marginBottom: "40px",
          }}
        >
          Ask questions about the latest news and discover related stories.
        </p>

        <form onSubmit={handleAskAI}>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: What is happening in Gaza?"
            rows="5"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid rgba(54, 169, 255, 0.25)",
              background: "rgba(12, 24, 40, 0.7)",
              color: "white",
              outline: "none",
              resize: "vertical",
              fontSize: "15px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "13px 28px",
              borderRadius: "9px",
              border: "1px solid #36a9ff",
              background: "#36a9ff",
              color: "#050b14",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {loading ? "🤖 Searching..." : "🤖 Ask AI"}
          </button>

        </form>

        {answer && (
          <div
            style={{
              marginTop: "40px",
              padding: "25px",
              borderRadius: "14px",
              background: "rgba(12, 24, 40, 0.7)",
              border: "1px solid rgba(54, 169, 255, 0.2)",
              textAlign: "left",
              whiteSpace: "pre-line",
            }}
          >

            <h3 style={{ marginTop: 0 }}>
              🤖 AI Assistant
            </h3>

            <p
              style={{
                color: "#aab7c7",
                lineHeight: "1.7",
              }}
            >
              {answer}
            </p>

          </div>
        )}

      </section>

    </div>
  );
}

export default AIPage;