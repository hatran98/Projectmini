import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Search from "../layouts/Search";
import Button from "../commons/Button";
import CardItem from "../commons/CardItem";
import { Pagination } from "antd";
import { useDoctor } from "../../hooks/doctor";
import usePagination from "../../hooks/pagination";
import { useLocation } from "react-router-dom";
import useSearchNavigation from "../../hooks/search";
import { ScrollToTop } from "../../helpers/Scroll";
function ListScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("search");
  const branch = queryParams.get("branch");
  const department = queryParams.get("department");
  const order = queryParams.get("order");
  const [searchParams, setSearchParams] = useState({
    search: "",
    branch: "",
    department: "",
    order: "",
  });
  const { doctors } = useDoctor(query, branch, department, order);
  const { handleSearch } = useSearchNavigation();
  const { currentData, handlePageChange, currentPage } = usePagination(
    doctors,
    pageSize
  );
  ScrollToTop(currentPage, pageSize);

  return (
    <div>
      <Navbar />
      <Search
        handleSearch={handleSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Button />
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="flex flex-col w-2/3">
          {currentData.length > 0 ? (
            currentData.map((d) => (
              <div key={d.id}>
                <CardItem doctor={d} />
              </div>
            ))
          ) : (
            <div>Không tìm thấy bác sĩ tương ứng</div>
          )}
        </div>
        <div className="w-1/4 mt-2 rounded">
          <select
            className="border rounded"
            onChange={(e) => {
              setSearchParams({ ...searchParams, order: e.target.value });
              handleSearch({ ...searchParams, order: e.target.value });
            }}
          >
            <option selected value="">
              Sắp xếp theo chi phí
            </option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>
      <div className="max-w-6xl mx-auto text-right mt-3">
        <div className="w-2/3">
          <Pagination
            total={doctors.length}
            current={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListScreen;
