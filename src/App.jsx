import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Recommendations from "./pages/Recommendations";
import { Navbar } from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import MoviePlayer from "./pages/MoviePlayer";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MovieProvider>
          <div>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movie/:id" element={<MoviePlayer />} />
              </Routes>
            </main>
          </div>
        </MovieProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
