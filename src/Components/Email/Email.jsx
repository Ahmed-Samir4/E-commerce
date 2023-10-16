import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Email() {

    let navigate = useNavigate()

    let [isLoading, setLoading] = useState(false);


    async function Forget(values) {

        setLoading(true);
        let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values).catch((e) => {
            setLoading(false);
            console.log(e);
        });

        console.log(res);


        setLoading(false);
        if (res?.data.statusMsg == "success") {
            navigate('/resetCode');
        }

    }
    let formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: Forget
    })
    return (
        <>
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <div className="my-5">
                <div className="w-75 mx-auto margT">
                    <h1 className='my-3'>Enter email to receive code :</h1>
                    <form onSubmit={formik.handleSubmit}>

                        <label htmlFor="email">Email :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3 mt-2' type="email" name='email' id='email' />

                        {isLoading ? <button disabled type='btn' className='btn bg-main text-white ms-auto d-block'><i className='fas fa-spinner fa-spin'></i></button> : <div className='d-flex justify-content-between align-items-center'>
                            <button type='submit' className='btn bg-main text-white ms-auto d-block'>Enter</button>
                        </div>
                        }

                    </form>
                </div>
            </div>
        </>
    )
}
