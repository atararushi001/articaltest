import { useState } from "react";
import "./assets/css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleForm from "./pages/ArticleForm";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
