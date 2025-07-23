import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import "../css/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MovieThon</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-links">
          Home
        </Link>
        <Link to="/search" className="nav-links">
          Search
        </Link>
        <Link to="/recommendations" className="nav-links">
          Recommendations
        </Link>
        <Link to="/favorites" className="nav-links">
          Favorites
        </Link>
      </div>
      <div className="navbar-auth">
        {isAuthenticated ? (
          <div className="auth-section">
            <span className="username">Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="auth-button logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-section">
            <Link to="/login" className="auth-button login-btn">
              Login
            </Link>
            <Link to="/register" className="auth-button register-btn">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
