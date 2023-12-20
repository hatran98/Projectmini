import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Search from "../layouts/Search";
import Button from "../commons/Button";
import CardItem from "../commons/CardItem";
import { Pagination } from "antd";
import { useDoctor } from "../../hooks/doctor";
import usePagination from "../../hooks/pagination";
import { useLocation } from "react-router-dom";
function ListScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("search");
  const branch = queryParams.get("branch");
  const department = queryParams.get("department");
  const { doctors } = useDoctor(query, branch, department);
  const pageSize = 3;
  const { currentData, handlePageChange, currentPage } = usePagination(
    doctors,
    pageSize
  );

  return (
    <div>
      <Navbar />
      <Search />
      <Button />
      <div className="flex max-w-6xl mx-auto flex-col">
        {currentData.length > 0 ? (
          currentData.map((d) => (
            <div className="w-2/3" key={d.id}>
              <CardItem doctor={d} />
            </div>
          ))
        ) : (
          <div className="w-2/3">Không tìm thấy bác sĩ tương ứng</div>
        )}
        <div></div>
      </div>
      <div className="max-w-6xl mx-auto text-right mt-3">
        <div className="w-2/3">
          <Pagination
            defaultPageSize={pageSize}
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
