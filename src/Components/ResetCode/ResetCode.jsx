import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ResetCode() {
    let navigate = useNavigate()

    let [isLoading, setLoading] = useState(false);


    async function Reset(values) {

        setLoading(true);
        let res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values).catch((e) => {
            toast.error("Failed")
            setLoading(false);
            console.log(e);
        });



        setLoading(false);

        if (res?.data.status == "Success") {
            navigate('/resetPassword');
        }
    }
    let formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: Reset
    })
    return (
        <>
            <Helmet>
                <title>Reset code</title>
            </Helmet>
            <div className="my-5">
                <div className="w-75 mx-auto margT">
                    <h1 className='my-3'>Enter your verification code :</h1>
                    <form onSubmit={formik.handleSubmit}>

                        <label htmlFor="resetCode">Code :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3 mt-2' type="text" name='resetCode' id='resetCode' />

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
