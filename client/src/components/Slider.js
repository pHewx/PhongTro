import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}

export default function SimpleSlider({ images }) {
    return (
      <div className="slide-container">
        <Slide>
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
        </Slide>
      </div>
    )
}



// import React from "react";
// import Slider from "react-slick";

// export default function SimpleSlider({ images }) {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="w-full">
//       <Slider {...settings}>
        
//       </Slider>
//     </div>
//   );
// }
