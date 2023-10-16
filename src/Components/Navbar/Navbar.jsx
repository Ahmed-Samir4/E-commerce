import React, { useContext } from 'react'
import img1 from "../../Assets/images/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartCounterContext } from '../../Context/CartCounterContext'

export default function Navbar() {

    let { CartCounter } = useContext(CartCounterContext)


    let navigate = useNavigate();
    let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);
    function logout() {
        setIsUserLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                    <Link to={'/'} className="navbar-brand" ><img src={img1} alt="brand" /></Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse align-items-center" id="collapsibleNavId">
                        {isUserLoggedIn ? <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/home'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/cart'}>Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/wishlist'}>Wishlist</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/products'}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/categories'}>Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/brands'}>Brands</Link>
                            </li>
                        </ul> : null}

                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
                            <li className="nav-item">
                                <i className='fab mx-2 fa-instagram'></i>
                                <i className='fab mx-2 fa-facebook'></i>
                                <i className='fab mx-2 fa-tiktok'></i>
                                <i className='fab mx-2 fa-twitter'></i>
                                <i className='fab mx-2 fa-linkedin'></i>
                                <i className='fab mx-2 fa-youtube'></i>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to={'/cart'}>
                                    <div className="nav-link">
                                        <i className="fa-solid fa-cart-shopping fs-3"></i>
                                        <div className="badge position-absolute text-white top-0 end-0 bg-main">{CartCounter}</div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        <ul className='d-flex list-unstyled mt-3'>


                            {isUserLoggedIn ? <li className='mx-2'>
                                <a onClick={logout} className='cursor-pointer'>Logout</a>
                            </li> : <><li className='mx-2'>
                                <Link to={'/register'}>Register</Link>
                            </li>
                                <li className='mx-2'>
                                    <Link to={'/login'}>Login</Link>
                                </li>
                            </>}

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
