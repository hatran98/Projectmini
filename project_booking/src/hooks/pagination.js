import { useState } from "react";

const usePagination = (data, pageSize) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    return currentData;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return { currentData: paginate(), handlePageChange, currentPage };
};

export default usePagination;
