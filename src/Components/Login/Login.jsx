import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

    let navigate = useNavigate();

    let [isLoading, setLoading] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");

    async function login(values) {

        setLoading(true);
        setErrorMessage("");
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((e) => {
            setErrorMessage(e.response.data.message)
            setLoading(false);
        });
        console.log(data);
        localStorage.setItem("token", data.token);

        setLoading(false);
        setIsUserLoggedIn(true);
        navigate('/home');
    }

    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Email is not valid"),
        password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must have one letter, special character , number and minimum length is 8 "),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: login
    })
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="my-5">
                <div className="w-75 mx-auto margT">
                    <h1 className='my-3'>Login Now :</h1>
                    <form onSubmit={formik.handleSubmit}>

                        <label htmlFor="email">Email :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control mb-3' type="email" name='email' id='email' />
                        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                            <p>{formik.errors.email}</p>
                        </div> : null}

                        <label htmlFor="password">Password :</label>
                        <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className='form-control mb-3' type="password" name='password' id='password' />
                        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>
                            <p>{formik.errors.password}</p>
                        </div> : null}


                        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : null}

                        {isLoading ? <button disabled type='btn' className='btn bg-main text-white ms-auto d-block'><i className='fas fa-spinner fa-spin'></i></button> : <div className='d-flex justify-content-between align-items-center'> <Link to={'/forget'}><h5 className='text-danger'>Forget Password?</h5></Link>
                            <button type='submit' className='btn bg-main text-white ms-auto d-block'>Login</button>
                        </div>
                        }


                    </form>
                </div>
            </div>
        </>
    )
}
