import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartCounterContext } from '../../Context/CartCounterContext';

export default function ProductDetails() {

    let { setCartCounter } = useContext(CartCounterContext)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    let { id } = useParams();

    //to get details
    function getProductDetails(x) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
    }
    let { data, isRefetching } = useQuery("productDetails", () => getProductDetails(id))
    let product = data?.data.data;

    //to add to cart
    async function addProductToCart(productId) {
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers: { token: localStorage.getItem('token') } }).catch((err) => { toast.error(err.message) })
        setCartCounter(res?.data.numOfCartItems)
        return res
    }
    let x = useQuery("addToCart", () => { addProductToCart(id) }, {
        enabled: false,
    })



    return (
        <>
            {isRefetching ? <div className='w-100 py-5 d-flex justify-content-center'>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </div> : <><Helmet>
                <title>{product?.title.split(" ").slice(0, 2).join(' ')}</title>
            </Helmet>
                {product ?
                    <div className="row align-items-center py-3 margT">
                        <div className="col-md-4">
                            <Slider {...settings}>
                                {product.images.map((img) => {
                                    return <img key={img} className='w-100' src={img} alt="" />
                                })}
                            </Slider>
                        </div>
                        <div className="col-md-8">
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <h5>{product.category?.name}</h5>
                            <div className='d-flex justify-content-between'>
                                <h5>Price : <span className='text-main'>{product.price}</span> EGP</h5>
                                <h5><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h5>
                            </div>
                            <button onClick={() => {
                                x.refetch(); if (x?.status == 'success') {
                                    toast.success("Product added successfully to your cart");
                                }
                            }} className='btn bg-main text-white w-100 text-center my-3'><i className='fas fa-plus'></i> Add to cart</button>
                        </div>
                    </div> : ''}
            </>}


        </>
    )
}
