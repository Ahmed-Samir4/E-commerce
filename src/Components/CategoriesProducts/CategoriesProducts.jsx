import axios from 'axios';
import React from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function CategoriesProducts() {
    let { id } = useParams();
    function categoriesProduct(x) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${x}`)
    }
    let { data, isLoading, isRefetching } = useQuery("categoriesProduct", () => categoriesProduct(id))
    let item = data?.data.data;
    // console.log(item);
    return (
        <>

            {isRefetching ? <div className='w-100 py-5 d-flex justify-content-center margT'>
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
            </div> : <div className='container margT mb-5'>
                <div className='text-center '>
                    <h2 className='text-main text-center fw-bolder mb-4'>{item?.name}</h2>
                    <img className='my-2 rounded' height={700} src={item?.image} alt="" />
                </div>
            </div>
            }
        </>
    )
}
