import axios from 'axios'
import React, { useRef, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import Product from '../Product/Product'
import { date } from 'yup'

export default function FeaturedProducts() {
    let [Data, setData] = useState([]);
    let [searchData, setSearchData] = useState([]);
    let searchInput = useRef("");
    
    //search
    function handleChange() {

        if (searchInput.current.value != "") {

            let data = Data.filter(function (item) {
                return item.title.split(" ").slice(0, 2).join(' ').toLowerCase().includes(searchInput.current.value.toLowerCase())
            })
            setSearchData(data)
        } else {
            setSearchData(Data);
        }
    };



    async function getFeaturedProducts() {
        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/products")

        setData(res?.data.data)
        setSearchData(res?.data.data)
        return res
    }
    let { isLoading } = useQuery("featuredProducts", getFeaturedProducts);


    return (
        <>
            {isLoading ? <div className='w-100 py-5 d-flex justify-content-center'>
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
            </div> : <div className='container py-2'>
                <h2 className='text-main text-center fw-bolder mb-1'>Featured Products</h2>
                <input onKeyUp={handleChange} ref={searchInput} placeholder='Search...' className='form-control mt-4 w-75 m-auto text-dark' type="text" name='search' id='search' />
                <div className="row">
                    {searchData.map((product) => <div key={product.id} className='col-md-3'>
                        <Product product={product} />
                    </div>)}
                    {/* {searchInput==[]? <></> : <>{Data.map((product) => <div key={product.id} className='col-md-3'>
                        <Product product={product} />
                    </div>)}</>} */}

                </div>
            </div>}


        </>
    )
}
