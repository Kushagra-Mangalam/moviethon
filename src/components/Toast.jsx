import { useState, useEffect } from "react";
import "../css/Toast.css";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast toast-${type} ${
        isVisible ? "toast-visible" : "toast-hidden"
      }`}
    >
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" ? "✓" : type === "error" ? "✗" : "ℹ"}
        </span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
