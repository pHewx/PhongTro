import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({ images }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-black flex justify-center h-[320px] px-12"
            >
              <img
                alt="slider"
                src={item.image}
                className="object-contain m-auto h-full"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
