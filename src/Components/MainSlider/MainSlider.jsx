import React from 'react'
import img1 from "../../Assets/images/grocery-banner.png"
import img2 from "../../Assets/images/grocery-banner-2.jpeg"
import img3 from "../../Assets/images/slider-2.jpeg"
import Slider from "react-slick";
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    
    return (
        <>
            <Slider {...settings}>
                <img className='w-100' height={400} src={img1} alt="" />
                <img className='w-100' height={400} src={img2} alt="" />
                <img className='w-100' height={400} src={img3} alt="" />
            </Slider>
        </>
    )
}
