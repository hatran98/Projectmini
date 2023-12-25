import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardDoctor from "../commons/CardDoctor";
import { useNavigate } from "react-router-dom";

function Category(props) {
  const navigate = useNavigate();
  const { content, array, text, category, slide } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slide,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="container max-w-6xl mx-auto">
      <h2
        className="text-xl font-bold mt-2 cursor-pointer"
        onClick={() => {
          navigate("/care/tat-ca/bac-si");
        }}
      >
        {" "}
        {content}{" "}
      </h2>
      <Slider {...settings}>
        {array.length > 0 &&
          array.map((e) => (
            <CardDoctor
              category={category}
              keys={e.id}
              image={e.image}
              name={e.name}
              text={text}
              department={e.department_id?.name}
              clinic={e.clinic_id?.name}
            />
          ))}
      </Slider>
    </div>
  );
}

export default Category;
