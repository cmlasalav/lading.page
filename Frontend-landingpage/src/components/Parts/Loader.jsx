import { useEffect, useState } from "react";

export default function Loader({ duration }) {
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isActive) return null;

  return (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  );
}
