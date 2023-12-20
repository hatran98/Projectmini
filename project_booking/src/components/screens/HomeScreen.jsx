import React from "react";
import { Button } from "antd";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Category from "../layouts/Category";
import Select from "../layouts/Select";
import Article from "../layouts/Article";
import InforCard from "../layouts/InforCard";
import { infor } from "../../helpers/Infor";
import Image from "../commons/Image";
import { Images } from "../../helpers/Images";
import CardDoctor from "../commons/CardDoctor";
import { useDoctor } from "../../hooks/doctor";

function HomeScreen() {
  const { doctors } = useDoctor();
  return (
    <div>
      <Navbar />
      <Banner />
      <Select />
      <section className="max-w-6xl mx-auto container">
        <h3 className="text-xl font-bold text-center py-5">
          Hello Bacsi đem đến thông tin sức khỏe mà bạn cần
        </h3>

        <div className="flex justify-between flex-col sm:flex-row">
          {infor.map((i) => (
            <InforCard
              src={i.image}
              title={i.title}
              content={i.content}
              id={i.id}
            />
          ))}
        </div>
        <div className="flex justify-between flex-col sm:flex-row">
          <div className="flex flex-col w-full mt-2 sm:w-1/2">
            <h3 className="font-bold text-2xl my-2">
              Đội ngũ chuyên gia của Hello Bacsi
            </h3>
            <p className="text-base font-normal">
              Đội ngũ cố vấn của Hello Bacsi gồm các chuyên gia sức khỏe và y
              bác sĩ từ nhiều chuyên khoa, với đầy đủ chứng nhận, chứng chỉ hành
              nghề, hỗ trợ xây dựng và củng cố nội dung theo chuyên môn của
              mình. Trách nhiệm của chuyên gia là bảo đảm tính chính xác về mặt
              y học ở những nội dung đăng tải trên Hello Bacsi, thường xuyên cập
              nhật các thông tin mới về khoa học, nghiên cứu và sức khỏe.
            </p>
            <p className="text-base font-normal">
              Đội ngũ của chúng tôi làm việc không mệt mỏi để những thông tin
              hữu ích có thể dễ dàng tiếp cận đến bạn đọc, giúp bạn chủ động hơn
              trong các quyết định chăm sóc sức khỏe.
            </p>
          </div>
          <div className="w-full flex justify-evenly items-center sm:ml-8 sm:w-1/2">
            {doctors.slice(3, 5).map((e) => (
              <div className="w-1/2">
                {" "}
                <CardDoctor
                  text="bg-blue-300"
                  category="bac-si"
                  image={e.image}
                  name={e.name}
                  department={e.department_id.name}
                  clinic={e.clinic_id.name}
                  keys={e.id}
                />
              </div>
            ))}
          </div>
        </div>
        <Category
          category="bac-si"
          array={doctors}
          content="Danh sách bác sĩ"
          text="bg-blue-300"
        />
      </section>

      <section className="mx-auto container max-w-6xl mt-2 flex">
        <Button className="mr-2 bg-blue-200 text-blue-500 rounded-xl w-44 h-10">
          Bài viết nổi bật
        </Button>
        <Button className="w-44 h-10 rounded-xl">Bài viết mới nhất</Button>
      </section>
      <section className="mx-auto container max-w-6xl mt-2 flex flex-col bg-[#e3f2ff] p-5">
        <div className="flex mb-2">
          <h3 className="text-xl font-bold">Tâm điểm</h3>
          <p className="text-blue-600 ml-2 text-sm mt-1">Xem tất cả </p>
        </div>
        <div className="flex w-full justify-between">
          {Images.map((image) => (
            <Image key={image.id} src={image.src} />
          ))}
        </div>
      </section>
      <Article />
      <Footer />
    </div>
  );
}

export default HomeScreen;
