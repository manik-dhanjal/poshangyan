import React from 'react'
import Styles from "./images-paging.styles"
import Slider from "react-slick";
const baseUrl = 'https://s3.amazonaws.com/static.neostack.com/img/react-slick'

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={`next-arr`} onClick={onClick} style={{ ...style}}>&#10095;</div>
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={`prev-arr`} onClick={onClick} style={{ ...style}}>&#10094;</div>
    );
  }

const ImagesPaging = (images) => {

    const settings = {
        // customPaging: function(i) {
        //   return (
        //       <img src={`${baseUrl}/abstract0${i + 1}.jpg`} />
        //   );
        // },
        // appendDots: dots => (
        //     <div className='dot-scroll-cont'>
        //       <ul className='dot-flex-cont'> {dots} </ul>
        //     </div>
        //   ),
        dots: false,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
      };
    return (
        <Styles>
            <Slider {...settings}>
            <div className="image-cont">
                <img src={baseUrl + "/abstract01.jpg"} />
            </div>
            <div  className="image-cont">
                <img src={baseUrl + "/abstract02.jpg"} />
            </div>
            <div  className="image-cont">
                <img src={baseUrl + "/abstract03.jpg"} />
            </div>
            <div  className="image-cont">
                <img src={baseUrl + "/abstract04.jpg"} />
            </div>
            </Slider>
        </Styles>
    )
}

export default ImagesPaging
