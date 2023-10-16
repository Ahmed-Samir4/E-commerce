import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const CartCounterContext = createContext()

export default function CartCounterContextProvider({ children }) {
    let [CartCounter, setCartCounter] = useState(0);

    useEffect(() => {
        getCart()
    }, [])

    async function getCart() {

        let res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem('token') } }).catch((err) => {
            console.log(err);
        })
        setCartCounter(res?.data.numOfCartItems)



    }

    return (
        <CartCounterContext.Provider value={{ CartCounter, setCartCounter }}>
            {children}
        </CartCounterContext.Provider>
    )
}
