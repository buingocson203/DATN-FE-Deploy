// tổng hợp tất cả các đường link

// import Signup from '@/features/auth/_components/Signup'
import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage/HomePage'
import ProductDetail from '@/pages/ProductDetail/index'

import Cart from '@/pages/Cart'
import FormAddress from '@/pages/FormAddress'
import PayMent from '@/pages/PayMent'
import ProductsPage from '@/pages/ProductsPage'
import Signin from '@/pages/auth/Signin'
import Signup from '@/pages/auth/Signup'
import Dashboard from '@/pages/pagesAdmin/Dashboard'
import ListBill from '@/pages/pagesAdmin/ListBill'
import BillDetail from '@/pages/pagesAdmin/ListBill/BillDetail'
import ListUser from '@/pages/pagesAdmin/ListUser'
import Product from '@/pages/pagesAdmin/Products'
import AddProduct from '@/pages/pagesAdmin/Products/AddProduct/index'
import EditProduct from '@/pages/pagesAdmin/Products/EditProduct/index'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import PolicyPage from '@/pages/PolicyPage'

import ListSize from '@/features/size/_components/ListSize'

import ListCategory from '@/features/category/_components/ListCategory'
import EditCategory from '@/pages/pagesAdmin/Category/EditCategory'

import Edit from '@/features/size/_components/EditSize'
import Collection from '@/pages/collection/Collection'
import DetailProduct from '../pages/pagesAdmin/Products/DetailProduct/DetailProduct'
import OrderList from '@/pages/pagesAdmin/Orders/OrderList'
import OrderDetail from '@/pages/pagesAdmin/Orders/OrderDetail'
import ReviewList from '../pages/pagesAdmin/Reviews/ReviewList'
import ReviewDetail from '@/pages/pagesAdmin/Reviews/ReviewDetail'
import Orders from '@/pages/Orders/Orders'
import Checkout from '@/pages/Checkout'
import MyProfile from '@/pages/MyProfile'
import ListAccount from '@/pages/pagesAdmin/Accounts/ListAccount'
import EditAccount from '@/pages/pagesAdmin/Accounts/EditAccount'

const Routers = () => {
    return (
        <Routes>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='products' element={<ProductsPage />} />
                <Route path='products/:id' element={<ProductDetail />} />
                <Route path='cart' element={<Cart />} />
                <Route path='orders' element={<Orders />} />
                <Route path='checkout' element={<Checkout />} />
                <Route path='formaddress' element={<FormAddress />} />
                <Route path='payment' element={<PayMent />} />
                <Route path='collections/:id' element={<Collection />} />
                <Route path='policy/:id' element={<PolicyPage />} />
                <Route path='policy/:id' element={<PolicyPage />} />
                <Route path='profile' element={<ProtectedRoute element={MyProfile} />} />
            </Route>
            <Route path='admin' element={<ProtectedRoute element={AdminLayout} />}>
                <Route index element={<ProtectedRoute element={Dashboard} />} />
                <Route path='/admin/dashboard' element={<ProtectedRoute element={Dashboard} />} />
                <Route path='/admin/products' element={<ProtectedRoute element={Product} />} />
                <Route path='/admin/products/add' element={<ProtectedRoute element={AddProduct} />} />
                <Route path='/admin/products/edit/:productId' element={<ProtectedRoute element={EditProduct} />} />
                <Route path='/admin/products/detail/:productId' element={<ProtectedRoute element={DetailProduct} />} />
                <Route path='/admin/category' element={<ProtectedRoute element={ListCategory} />} />
                <Route path='/admin/account' element={<ProtectedRoute element={ListAccount} />} />
                <Route path='/admin/account/:id/edit' element={<ProtectedRoute element={EditAccount} />} />
                <Route path='/admin/user' element={<ProtectedRoute element={ListUser} />} />
                <Route path='/admin/bill' element={<ProtectedRoute element={ListBill} />} />
                <Route path='/admin/bill/:id' element={<ProtectedRoute element={BillDetail} />} />
                <Route path='/admin/size' element={<ProtectedRoute element={ListSize} />} />
                <Route path='/admin/category/:id' element={<ProtectedRoute element={EditCategory} />} />
                <Route path='/admin/size/:id' element={<ProtectedRoute element={Edit} />} />

                <Route path='/admin/orders' element={<ProtectedRoute element={OrderList} />} />
                <Route path='/admin/orders/detail/:orderId' element={<ProtectedRoute element={OrderDetail} />} />

                <Route path='/admin/reviews' element={<ProtectedRoute element={ReviewList} />} />
                <Route path='/admin/reviews/detail/:reviewId' element={<ProtectedRoute element={ReviewDetail} />} />
            </Route>
        </Routes>
    )
}

export default Routers
