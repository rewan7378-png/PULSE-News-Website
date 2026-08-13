import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedNews from "./pages/SavedNews";
import LandingPage from "./components/landingPage";
import NewsPage from "./pages/NewsPage";
import AboutUs from "./pages/AboutUs";
import AIPage from "./pages/AIPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/news" element={<NewsPage />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/saved" element = {<SavedNews />} />
        <Route path="/ai" element = {<AIPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
