import React from 'react'
import { Helmet } from 'react-helmet'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

export default function Products() {


    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>


            <div className='container margT mb-3'>
                <FeaturedProducts />
            </div>

        </>
    )
}
