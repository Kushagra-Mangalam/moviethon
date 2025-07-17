import { Route, Routes } from "react-router-dom";
import "./css/App.css";
// import { MovieCard } from "./components/moviecCard"
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Navbar } from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import MoviePlayer from "./pages/MoviePlayer";

function App() {
  return (
    <MovieProvider>
      <div>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MoviePlayer />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
