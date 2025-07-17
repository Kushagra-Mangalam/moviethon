import { Route, Routes } from "react-router-dom";
import "./css/App.css";
// import { MovieCard } from "./components/moviecCard"
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
