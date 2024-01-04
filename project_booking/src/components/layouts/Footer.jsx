import React from "react";

function Footer() {
  return (
    <div className="bg-[#1b3250] mt-10">
      <div className="container mx-auto max-w-[1000px] py-10">
        <div>
          <img
            src="https://cdn.hellobacsi.com/wp-content/uploads/2021/08/Logo-1.png"
            className="w-24 my-2"
          ></img>
        </div>
        <div className="flex sm:flex-row flex-col">
          <p className="w-full text-[#9aa2ac] sm:w-[40%]">
            Hello Bacsi mong muốn trở thành nền tảng thông tin y khoa hàng đầu
            tại Việt Nam, giúp bạn đưa ra những quyết định đúng đắn liên quan về
            chăm sóc sức khỏe và hỗ trợ bạn cải thiện chất lượng cuộc sống.
          </p>
          <div className="flex sm:w-2/3 w-full">
            <div className="w-1/3">
              <p className="cursor-pointer text-white">Chuyên đề sức khỏe</p>
              <p className="cursor-pointer text-white">Kiểm tra sức khỏe</p>
              <p className="cursor-pointer text-white">Tìm bệnh viện</p>
              <p className="cursor-pointer text-white">Cộng đồng</p>
              <p className="cursor-pointer text-white">Cửa hàng</p>
            </div>
            <div className="w-1/3">
              <p className="text-[#9aa2ac]">Thông tin</p>
              <p className="cursor-pointer text-white">Điều khoản sử dụng</p>
              <p className="cursor-pointer text-white">
                Chính sách Quyền riêng tư
              </p>
              <p className="cursor-pointer text-white">
                Chính sách Biên tập và Chỉnh sửa
              </p>
              <p className="cursor-pointer text-white">
                Chính sách Quảng cáo và Tài trợ
              </p>
              <p className="cursor-pointer text-white">Câu hỏi thường gặp</p>
              <p className="cursor-pointer text-white">Tiêu chuẩn cộng đồng</p>
              <p className="cursor-pointer text-white">
                Quy định đặt lịch bác sĩ và mua hàng
              </p>
            </div>
            <div className="w-1/3">
              <p className="text-[#9aa2ac]">Hello Health</p>
              <p className="cursor-pointer text-white">Tự giới thiệu</p>
              <p className="cursor-pointer text-white">Ban điều hành</p>
              <p className="cursor-pointer text-white">Tuyển dụng</p>
              <p className="cursor-pointer text-white">Quảng cáo</p>
              <p className="cursor-pointer text-white">Liên hệ</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between sm:max-w-[75%] mt-3 sm:flex-row flex-col w-full">
          <div className="">
            <br></br>
            <p className="text-[#9aa2ac]">Kết nối với chúng tôi</p>
            <div className="flex h-10">
              <img
                src="https://cdn.hellobacsi.com/wp-content/uploads/2021/08/Facebook.png"
                className="mr-2"
              ></img>
              <img
                src="https://cdn.hellobacsi.com/wp-content/uploads/2021/08/Instagram.png"
                className="mr-2"
              ></img>
              <img
                src="https://cdn.hellobacsi.com/wp-content/uploads/2021/08/Linkedin.png"
                className="mr-2"
              ></img>
              <img
                src="https://cdn.hellobacsi.com/wp-content/uploads/2021/08/Youtube.png"
                className="mr-2"
              ></img>
            </div>
          </div>
        </div>
        <hr className="mt-2"></hr>
        <div className="flex">
          <div>
            <br></br>
            <p className="text-[#9aa2ac] text-sm">
              © 2023 Bản quyền các bài viết thuộc tập đoàn Hello Health Group.
              Các bài viết của Hello Bacsi chỉ có tính chất tham khảo, không
              thay thế cho việc chẩn đoán hoặc điều trị y khoa.
            </p>
            <br></br>
            <p className="text-[#9aa2ac] text-sm">
              Giấy xác nhận cung cấp dịch vụ mạng xã hội trực tuyến số
              529/GP-BTTTT, HN ngày 03/12/2019
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
