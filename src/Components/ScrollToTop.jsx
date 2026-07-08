import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Automatically resets the viewport scroll back to the very top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
