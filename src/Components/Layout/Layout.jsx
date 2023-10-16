import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import AuthContextProvider from '../../Context/AuthContext'
import { Offline, Online } from "react-detect-offline";
import { Toaster } from 'react-hot-toast';
import CartCounterContextProvider, { CartCounterContext } from '../../Context/CartCounterContext'

export default function Layout() {
    return (
        <>
            <CartCounterContextProvider>
                <AuthContextProvider>
                    <Navbar />
                    <div className="container mb-5">
                        <Outlet />
                    </div>
                    <Footer />
                    <div>
                        <Offline>
                            <div className='offline-toast'>
                                You're offline right now. Check your connection.
                            </div>
                        </Offline>
                    </div>
                    <Toaster />
                </AuthContextProvider>
            </CartCounterContextProvider>

        </>
    )
}
