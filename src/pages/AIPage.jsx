import "../NewsPage.css";
import { useEffect, useState } from "react";
import { getTopHeadlines } from "../api";

function AIPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getTopHeadlines()
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.error("AI NEWS ERROR:", error);
      });
  }, []);

  const handleAskAI = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      return;
    }

    const query = question.toLowerCase();

    const topicKeywords = {
      technology: [
        "technology",
        "tech",
        "ai",
        "artificial intelligence",
        "software",
        "computer",
        "digital",
        "innovation",
        "internet",
      ],

      sports: [
        "sport",
        "sports",
        "football",
        "soccer",
        "basketball",
        "tennis",
        "match",
        "player",
        "team",
      ],

      politics: [
        "politics",
        "political",
        "government",
        "president",
        "election",
        "minister",
        "parliament",
      ],

      economy: [
        "economy",
        "economic",
        "business",
        "market",
        "money",
        "finance",
        "company",
        "companies",
      ],

      science: [
        "science",
        "scientist",
        "space",
        "research",
        "study",
        "discovery",
      ],

      climate: [
        "climate",
        "environment",
        "weather",
        "global warming",
        "pollution",
        "earth",
      ],

      food: [
        "food",
        "restaurant",
        "cooking",
        "recipe",
        "meal",
        "chef",
      ],
    };

    let detectedTopic = null;

    for (const topic in topicKeywords) {
      if (
        topicKeywords[topic].some((keyword) =>
          query.includes(keyword)
        )
      ) {
        detectedTopic = topic;
        break;
      }
    }

    const matchedArticles = articles.filter((article) => {
      const articleText = `
        ${article.title || ""}
        ${article.description || ""}
        ${article.category?.join(" ") || ""}
      `.toLowerCase();

      if (detectedTopic) {
        return topicKeywords[detectedTopic].some((keyword) =>
          articleText.includes(keyword)
        );
      }

      const words = query
        .split(" ")
        .filter((word) => word.length > 3);

      return words.some((word) => articleText.includes(word));
    });

    if (matchedArticles.length === 0) {
      setAnswer(
        `I couldn't find related ${
          detectedTopic || "news"
        } in the current PULSE feed.

Try asking about Technology, Sports, Politics, Economy, Science, Climate, or Food.`
      );

      return;
    }

    const results = matchedArticles
      .slice(0, 3)
      .map(
        (article, index) =>
          `${index + 1}. ${article.title}\n${
            article.description || "No description available."
          }`
      )
      .join("\n\n");

    setAnswer(
      `Here are some ${
        detectedTopic ? detectedTopic : "related"
      } stories from the current PULSE news feed:

${results}`
    );
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
            className="ai-page-title"
          style={{
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
            placeholder="Example: What is happening in technology?"
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
            style={{
              marginTop: "20px",
              padding: "13px 28px",
              borderRadius: "9px",
              border: "1px solid #36a9ff",
              background: "#36a9ff",
              color: "#050b14",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🤖 Ask AI
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