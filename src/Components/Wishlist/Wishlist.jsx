import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { BallTriangle } from 'react-loader-spinner'
import { CartCounterContext } from '../../Context/CartCounterContext'

export default function Wishlist() {

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    let { setCartCounter } = useContext(CartCounterContext)
    //to add to cart
    async function addProductToCart(productId) {
        let res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers: { token: localStorage.getItem('token') } }).catch((err) => { toast.error(err.message) })

        setCartCounter(res?.data.numOfCartItems)

        if (res?.status == 'success') {
            toast.success("Product added successfully to your Cart");
        }

    }




    //get wishlist
    let [refresh, setRefresh] = useState(false)
    let [WishProducts, setWishProducts] = useState([])

    useEffect(() => {
        getWishlist()

    }, [])
    async function getWishlist() {
        setRefresh(true)
        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token: localStorage.getItem('token') } }).catch((err) => {
            console.log(err);
        })
        setWishProducts(res?.data.data)
        setRefresh(false)
    }

    //remove item
    async function removeItem(id) {
        setRefresh(true)

        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token: localStorage.getItem('token') } })
        getWishlist()
        toast("Item is Removed")
        setRefresh(false)
    }

    return (
        <>
            <Helmet>
                <title>Wishlist</title>
            </Helmet>


            {WishProducts ? <> <div className="container py-5 margT p-5 bg-light rounded">

                <h2 className="fw-bolder mb-4">My Wishlist</h2>

                {refresh ? <div className='w-100 py-5 d-flex justify-content-center'>
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
                </div> : <>{WishProducts?.map((item) =>
                    <>
                        <div key={item.id} className="row border-bottom my-3 py-3 d-flex align-items-center p-2">
                            <div className="col-md-2">
                                <img alt='' className="w-100" src={item.imageCover} />
                            </div>
                            <div className="col-md-10 d-flex justify-content-between">
                                <div>
                                    <h5 className='fw-bolder'>{item.title}</h5>
                                    <h6 className='fw-bolder my-3'><span className='text-main'>{item.price}</span> EGP</h6>
                                    <button onClick={() => { removeItem(item.id); }} className="btn btn-sm m-0 p-0 text-danger"><i className="fa fa-trash" /> Remove</button>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <button onClick={() => {
                                        addProductToCart(item.id); removeItem(item.id)
                                    }} className="btn btn-primary btn-lg">
                                        <a className="text-decoration-none text-white" >Add To Cart</a>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </>

                )}</>}




            </div></> : <><h1 className='text-center fw-bolder margT'>Empty</h1></>}
        </>
    )
}
