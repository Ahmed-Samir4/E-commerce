import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Await, Link } from 'react-router-dom'
import { CartCounterContext } from '../../Context/CartCounterContext'

export default function Product({ product }) {

    let { setCartCounter } = useContext(CartCounterContext)

    let [show, setShow] = useState(false);

    //to add to cart
    async function addProductToCart(productId) {
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers: { token: localStorage.getItem('token') } }).catch((err) => { toast.error(err.message) })

        setCartCounter(res?.data.numOfCartItems)
        return res;
    }

    let cart = useQuery("addToCart", () => { addProductToCart(product.id) }, {
        enabled: false,
    })


    //to add to wishlist
    async function addProductToWishlist(productId) {
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, { headers: { token: localStorage.getItem('token') } }).catch((err) => { toast.error(err.message) })
        console.log(res);
        return res

    }
    // let wish = useQuery("addToWish", () => { addProductToWishlist(product.id) }, {
    //     enabled: false,
    // })

    async function removeItemFromWishlist(id) {

        let res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token: localStorage.getItem('token') } })
        toast("Item is Removed")
        console.log(res);
    }

    return (
        <>
            <div className='product cursor-pointer py-3 px-2 my-5'>
                <Link to={`/productDetails/${product.id}`}>
                    <img className='w-100 mb-1' src={product.imageCover} alt={product.title} />
                    <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                    <h3 className='h4'>{product.title.split(" ").slice(0, 2).join(' ')}</h3>
                    <div className='d-flex justify-content-between mt-3'>
                        <span>{product.price} EGP</span>
                        <span><i className='fas fa-star rating-color'></i>  {product.ratingsAverage}</span>
                    </div>
                </Link>

                <div className='d-flex justify-content-between align-items-center'>

                    <i className={`fa-solid fa-heart h3 mt-2 float-end ${show ? "red" : ""}`} onClick={() => {
                        if ( show == false) {
                            addProductToWishlist(product.id)
                            toast.success("Product added successfully to your Wishlist");
                        } else {
                            removeItemFromWishlist(product.id)
                        }
                        setShow(!show)
                    }}></i>



                    <button onClick={() => {
                        cart.refetch(); if (cart?.status == 'success') {
                            toast.success("Product added successfully to your Cart");
                        }
                    }} className='btn bg-main text-white w-75 btn-sm mt-2'>Add to cart</button>
                </div>


            </div>
        </>
    )
}
