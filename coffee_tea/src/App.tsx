import React, { useState } from "react";
import LandingPage from "./Pages/LandingPage/LandingPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import "./App.css";
import "./styles.css";
import Header from "./Components/Header";

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "search">(
    "landing"
  );

  return (
    <>
      {/* Simple navigation for demo purposes */}
      <Header />
      {currentPage === "landing" && <LandingPage />}
      {currentPage === "search" && <SearchPage />}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setCurrentPage("landing")}
          style={{ marginRight: "10px" }}
        >
          Landing Page
        </button>
        <button onClick={() => setCurrentPage("search")}>Search Page</button>
      </div>
    </>
  );
}

export default App;
