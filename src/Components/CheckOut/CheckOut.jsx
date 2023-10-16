import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom';

export default function CheckOut() {
    let { id } = useParams()
    async function checkout(shippingAddress) {
        fetchCheck(shippingAddress);
    }

    async function fetchCheck(shippingAddress) {
        let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ahmed-samir4.github.io/E-commerce/#`, { shippingAddress }, { headers: { token: localStorage.getItem('token') } })

        console.log(res);
        window.location.href = res?.data.session.url
    }

    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        // validationSchema,
        onSubmit: checkout
    })

    return (
        <>
            <Helmet>
                <title>Check Out</title>
            </Helmet>


            <div className=" py-3 margT ">
                <div className="w-75 m-auto p-5 rounded-3 bg-light">
                    <h1 className='mb-5'>Check Out</h1>
                    <form onSubmit={formik.handleSubmit}>

                        <label className='mb-2' htmlFor="details">Details :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3' type="text" name='details' id='details' />


                        <label className='mb-2' htmlFor="phone">Phone :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className='form-control mb-3' type="tel" name='phone' id='phone' />


                        <label className='mb-2' htmlFor="city">City :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className='form-control mb-3' type="text" name='city' id='city' />




                        <button type='submit' className='btn bg-main text-white ms-auto d-block'>Order</button>


                    </form>
                </div>
            </div>
        </>
    )
}
