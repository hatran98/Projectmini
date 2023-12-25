import { useLocation, useNavigate } from "react-router-dom";

const useSearchNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (object) => {
    const { search, branch, department, order } = object;
    const searchParams = new URLSearchParams(location.search);
    const queryParams = {
      search,
      branch,
      department,
      order,
    };

    for (const key in queryParams) {
      if (!queryParams[key]) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, queryParams[key]);
      }
    }
    const updatedQueryString = searchParams.toString();
    navigate(`?${updatedQueryString}`);
  };

  return {
    handleSearch,
  };
};

export default useSearchNavigation;
