import { useEffect } from "react";

export const ScrollToTop = (currentPage, pageSize) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, pageSize]);
};
