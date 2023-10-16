import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet'
import MainSlider from '../MainSlider/MainSlider'
import img1 from '../../Assets/images/blog-img-1.jpeg'
import img2 from '../../Assets/images/blog-img-2.jpeg'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'


export default function Home() {
    
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='container pt-5 mt-5 mb-3'>
                <div className="row">
                    <div className="col-md-8 p-0">
                        <MainSlider/>
                    </div>
                    <div className="col-md-4 p-0">
                        <img className='w-100' src={img1} alt="" />
                        <img className='w-100' src={img2} alt="" />
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <CategoriesSlider/>
                </div>
            </div>

            <FeaturedProducts />
        </>
    )
}
