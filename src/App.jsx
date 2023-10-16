// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import NotFound from './Components/NotFound/NotFound'
import Wishlist from './Components/Wishlist/Wishlist'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'

import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedLogin from './Components/ProtectedLogin/ProtectedLogin'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CategoriesProducts from './Components/CategoriesProducts/CategoriesProducts'
import BrandsProducts from './Components/BrandsProducts/BrandsProducts'
import CheckOut from './Components/CheckOut/CheckOut'
import Email from './Components/Email/Email'
import ResetCode from './Components/ResetCode/ResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import AllOrders from './Components/AllOrders/AllOrders'



export default function App() {
  let routers = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Navigate to={'home'} /> },
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectedLogin><Login /></ProtectedLogin> },
        { path: 'register', element: <ProtectedLogin><Register /></ProtectedLogin> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'allOrders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: 'Wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categoriesProducts/:id', element: <ProtectedRoute><CategoriesProducts /></ProtectedRoute> },
        { path: 'brandsProducts/:id', element: <ProtectedRoute><BrandsProducts /></ProtectedRoute> },
        { path: 'checkOut/:id', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },

        { path: 'forget', element: <Email/> },
        { path: 'resetCode', element: <ResetCode/> },
        { path: 'resetPassword', element:<ResetPassword/> },

        { path: '*', element: <NotFound /> }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routers}>

      </RouterProvider>
    </>
  )
}
