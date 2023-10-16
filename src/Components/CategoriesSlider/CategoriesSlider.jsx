import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed:2000,
        speed:400
    };
    function categories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data, isRefetching } = useQuery("categoriesSlider", categories)
    let item = data?.data.data;
    return (
        <>
            <Slider {...settings}>
                {item?.map((item) => {
                    return <div key={item._id}>
                        <img className='w-100' height={300} src={item.image} alt="" />
                        <h6 className='text-center mt-2 text-dark h3'>{item.name}</h6>
                    </div>
                })}
            </Slider>
        </>
    )
}
