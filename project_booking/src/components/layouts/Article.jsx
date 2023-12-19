import React from "react";
import CartItem from "./CartItem";

function Article() {
  return (
    <div>
      <div className="flex max-w-6xl justify-between border-b-2 border-dashed py-3 mx-auto flex-col sm:flex-row">
        <div className="max-w-2xl">
          <img
            src="https://cdn.hellobacsi.com/wp-content/uploads/2023/12/tre-bi-roi-loan-tieu-hoa-1.jpg?w=1200&q=75"
            className="rounded"
          ></img>
          <h3 className="text-amber-700">VẤN ĐỀ VỀ TIÊU HOÁ</h3>
          <p className="text-xl font-bold">
            Trẻ bị rối loạn tiêu hoá:Mẹ chọn sữa gì cho bụng non nhạy cảm?
          </p>
          <p className="text-base text-gray-600">
            Trẻ bị rối loạn tiêu hóa là tình trạng thường gặp do hệ tiêu hóa của
            con còn non nớt, chưa phát triển hoàn thiện. Do đó, trong những năm
            đầu đời, mẹ sẽ cần đặc biệt lưu tâm khi chăm sóc bé, nhất là đối với
            sữa mà bé bú. Với trẻ nhỏ, sữa […]
          </p>
          <div className="flex mt-2">
            <img
              src="https://cdn.hellobacsi.com/wp-content/uploads/2022/02/bs-nguyendinhhongphuc-150x150.jpeg"
              className="rounded-full w-6 h-6"
            ></img>
            <span>
              Tham vấn y khoa: <b>Bác sĩ CKI Nguyễn Đinh Hồng Phúc </b>
              {""}
              <span>2 ngày trước</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col max-w-sm">
          <div className="border-b-2 border-dashed mb-3">
            <img
              src="https://cdn.hellobacsi.com/wp-content/uploads/2023/12/niem-mac-tu-cung-mong-co-thai-duoc-khong.jpg?w=1200&q=75"
              className="rounded"
            ></img>
            <p className="text-[#fc488d]">CHUẨN BỊ MANG THAI</p>
            <p className="text-xl font-bold">
              Giải đáp thắc mắc: Niêm mạc tử cung mỏng có thai được không?
            </p>
            <div className="flex my-2">
              <img
                src="https://cdn.hellobacsi.com/wp-content/uploads/2023/07/IMG_1374-scaled-1-200x300.jpg"
                className="rounded-full w-6 h-6"
              ></img>
              <span className="text-sm">
                Thông tin được kiểm chứng bởi <b>Lan Quan*</b>{" "}
                <span>2 ngày trước</span>
              </span>
            </div>
          </div>
          <div>
            <img
              src="https://cdn.hellobacsi.com/wp-content/uploads/2023/12/tre-em-co-bi-tieu-duong-khong.jpg?w=1200&q=75"
              className="rounded"
            ></img>
            <p className="text-amber-700">VẤN ĐỀ NHI KHOA KHÁC</p>
            <p className="text-xl font-bold">
              Trẻ em có bị tiểu đường không? Nhận biết sớm triệu chứng và điều
              trị
            </p>
            <div className="text-sm flex mt-2">
              <img
                src="https://cdn.hellobacsi.com/wp-content/uploads/2023/07/IMG_1374-scaled-1-200x300.jpg"
                className="rounded-full w-6 h-6"
              ></img>
              <span>
                Thông tin được kiểm chứng bởi <b>Lan Quan*</b>{" "}
                <span>Hôm qua</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-2 flex justify-between flex-col sm:flex-row">
        {Array.from({ length: 4 }).map((_, index) => (
          <CartItem key={index} />
        ))}
      </div>
    </div>
  );
}

export default Article;
