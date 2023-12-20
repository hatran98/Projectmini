import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSearchNavigation = () => {
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", search);
    searchParams.set("branch", selectedBranch);
    searchParams.set("department", selectedDepartment);
    const updatedQueryString = searchParams.toString();
    navigate(`?${updatedQueryString}`);
    // setSearch("");
    // setSelectedBranch("");
    // setSelectedDepartment("");
  };

  return {
    search,
    setSearch,
    selectedBranch,
    setSelectedBranch,
    selectedDepartment,
    setSelectedDepartment,
    handleSearch,
  };
};

export default useSearchNavigation;
