import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { BallTriangle } from 'react-loader-spinner'
import { useQueries, useQuery } from 'react-query'
import { CartCounterContext } from '../../Context/CartCounterContext'
import { Link } from 'react-router-dom'

export default function Cart() {
    let { setCartCounter } = useContext(CartCounterContext)


    //get cart
    let [refresh, setRefresh] = useState(false)

    let [numOfCartItems, setNumOfCartItems] = useState(0)
    let [totalCartPrice, setTotalCartPrice] = useState(0)
    let [cartProducts, setCartProducts] = useState([])
    let [requestTimeOut, setRequestTimeOut] = useState()
    let [CartId, setCartId] = useState("")

    useEffect(() => {
        getCart()
        console.log(CartId);
    }, [])
    async function getCart() {
        setRefresh(true)
        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem('token') } }).catch((err) => {
            console.log(err);
        })
        setCartId(res?.data.data._id)

        setCartCounter(res?.data.numOfCartItems)
        setNumOfCartItems(res?.data.numOfCartItems);
        setTotalCartPrice(res?.data.data.totalCartPrice);
        setCartProducts(res?.data.data.products);

        setRefresh(false)
    }



    //delete item
    async function removeCartItem(id) {
        setRefresh(true)
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { token: localStorage.getItem('token') } })

        toast("Item is Removed")

        setCartCounter(data?.numOfCartItems);
        setNumOfCartItems(data?.numOfCartItems);
        setTotalCartPrice(data?.data.totalCartPrice);
        setCartProducts(data?.data.products);

        setRefresh(false)
    }

    //clear cart
    async function clearCart() {
        setRefresh(true)
        setCartCounter(0);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setCartProducts([]);
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: { token: localStorage.getItem('token') } })
        setRefresh(false)
    }
    //update count
    function updateProductCount(productId, count, index) {

        let newCartProducts = [...cartProducts]
        newCartProducts[index]['count'] = count

        setCartProducts(newCartProducts)

        clearTimeout(requestTimeOut)
        setRequestTimeOut(setTimeout(async () => {

            let res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers: { token: localStorage.getItem('token') } })
            console.log(res);
            setCartCounter(res?.data.numOfCartItems);
            setNumOfCartItems(res?.data.numOfCartItems);
            setTotalCartPrice(res?.data.data.totalCartPrice);
            setCartProducts(res?.data.data.products);

        }, 800))



    }
    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>



            {cartProducts ? <> <div className="container py-5 margT p-5 bg-light rounded">
                <div className="d-flex justify-content-between mb-4">
                    <h2 className="fw-bolder">Cart Shop</h2>
                    <button onClick={() => { clearCart(); }} className="btn btn-danger btn-lg ">
                        <a className="text-decoration-none text-white" >Clear Cart</a>
                    </button>
                    <Link to={`/checkOut/${CartId}`} className="text-decoration-none text-white" >
                        <button className="btn btn-primary btn-lg ">
                            Check out
                        </button>
                    </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <h5 className="fw-bolder">Total price: <span className="text-main">{totalCartPrice}</span></h5>
                    <h5 className="fw-bolder">Total number of items: <span className="text-main">{numOfCartItems}</span></h5>
                </div>

                {refresh ? <> <div className='w-100 py-5 d-flex justify-content-center'>
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
                </div></> : <>{cartProducts?.map((item, index) =>
                    <>
                        <div key={item.product.id} className="row border-bottom my-3 py-3 d-flex align-items-center p-2">
                            <div className="col-md-2">
                                <img alt='' className="w-100" src={item.product.imageCover} />
                            </div>
                            <div className="col-md-10 d-flex justify-content-between">
                                <div>
                                    <h5 className='fw-bolder'>{item.product.title}</h5>
                                    <h6 className='fw-bolder my-3'><span className='text-main'>{item.price}</span> EGP</h6>
                                    <button onClick={() => removeCartItem(item.product.id)} className="btn btn-sm m-0 p-0 text-danger"><i className="fa fa-trash" /> Remove</button>
                                </div>
                                <div className='d-flex align-items-center count'>
                                    <button onClick={() => updateProductCount(item.product.id, item.count + 1, index)} className="btn btn-count">+</button>
                                    <span className="mx-3 fw-bolder">{item.count}</span>
                                    <button onClick={() => updateProductCount(item.product.id, item.count - 1, index)} className="btn btn-count">-</button>
                                </div>
                            </div>
                        </div>
                    </>

                )}</>}


            </div></> : <><h1 className='text-center fw-bolder margT'>Cart is Empty</h1></>}




        </>
    )
}
