import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Categories() {
    function categories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data, isLoading } = useQuery("categories", categories)
    let item = data?.data.data;
    // console.log(item);
    return (
        <>
            <Helmet>
                <title>Categories</title>
            </Helmet>


            {isLoading ? <div className='w-100 py-5 d-flex justify-content-center margT'>
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
            </div> : <> <div className='container margT'>
                <div className="row">
                    {item?.map((item) => <>
                        <div className="col-md-4 mb-4 ">
                            <Link to={`/categoriesProducts/${item._id}`}>
                                <div className='mx-1 border rounded-3 overflow-hidden shadow card'>
                                    <img className='w-100' height={400} src={item.image} alt="" />
                                    <h4 className='text-center mt-2 text-dark fw-bolder py-2'>{item.name}</h4>
                                </div>

                            </Link>
                        </div>

                    </>)}

                </div>
            </div>
            </>}


        </>
    )
}
