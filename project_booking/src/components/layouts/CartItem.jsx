import React from "react";

function CartItem() {
  return (
    <div className="max-w-[17rem]">
      <div>
        <img
          src="https://cdn.hellobacsi.com/wp-content/uploads/2023/12/hien-tieu-cau.jpg?w=1200&q=75"
          className="rounded h-36 w-full"
        ></img>
        <p className="text-[#2d87f3] text-[14px] mt-2">
          CÁC VẤN ĐỀ VỀ MÁU KHÁC
        </p>
        <p className="font-bold text-[15px] mb-2">
          Hiến tiểu cầu là gì và các thông tin về quá trình thực hiện
        </p>
      </div>
      <div className="flex">
        <img
          src="https://cdn.hellobacsi.com/wp-content/uploads/2023/11/hellologo-1-300x300.png"
          className="w-6 h-6 mt-3 mr-2"
        ></img>
        <div className="text-sm">
          <span>
            Thông tin kiểm chứng bởi <b>Ban biên tập Hello Bacsi•</b>{" "}
            <span>5 ngày trước</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
