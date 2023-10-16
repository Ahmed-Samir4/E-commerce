import React from 'react'
import NotFoundImg from "../../Assets/images/error.svg"
export default function NotFound() {
    return (
        <>
            <div className="text-center">
                <img className='w-75' src={NotFoundImg} alt="" />
            </div>

        </>
    )
}
