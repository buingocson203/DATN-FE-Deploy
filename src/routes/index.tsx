import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage/HomePage'
import ProductDetail from '@/pages/ProductDetail/index'
import ProductsPage from '@/pages/ProductsPage'
import Signup from '@/pages/auth/Signup'
import { Route, Routes } from 'react-router-dom'
import Signin from '@/pages/auth/Signin'
import Dashboard from '@/pages/pagesAdmin/Dashboard'
import ListBill from '@/pages/pagesAdmin/ListBill'
import BillDetail from '@/pages/pagesAdmin/ListBill/BillDetail'
import ListUser from '@/pages/pagesAdmin/ListUser'
import ProtectedRoute from './ProtectedRoute'
import Cart from '@/pages/Cart'
import FormAddress from '@/pages/FormAddress'
import PayMent from '@/pages/PayMent'
import Collection from '@/pages/Collection'
import PolicyPage from '@/pages/PolicyPage'

import ListSize from '@/features/size/_components/ListSize'
import ListCategory from '@/features/category/_components/ListCategory'
import EditCategory from '@/pages/pagesAdmin/Category/EditCategory'
import Edit from '@/features/size/_components/EditSize'
import Checkout from '@/pages/Checkout'
import EditAccount from '@/pages/pagesAdmin/Accounts/EditAccount'
import AddAccount from '@/pages/pagesAdmin/Accounts/AddAccount'
import MyProfile from '@/pages/MyProfile'

import Orders from '@/pages/Orders/Orders'
import OrderDetail from '@/pages/Orders/OrderDetail'

import ListAccount from '@/pages/pagesAdmin/Accounts/ListAccount'

import Product from '@/pages/pagesAdmin/Products'
import AddProduct from '@/pages/pagesAdmin/Products/AddProduct'
import EditProduct from '@/pages/pagesAdmin/Products/EditProduct'
import DetailProduct from '@/pages/pagesAdmin/Products/DetailProduct'
import OrderList from '@/pages/pagesAdmin/Orders/OrderList'
import OrderDetailAdmin from '@/pages/pagesAdmin/Orders/OrderDetail'
import ReviewList from '@/pages/pagesAdmin/Reviews/ReviewList'
import ReviewDetail from '@/pages/pagesAdmin/Reviews/ReviewDetail'
import ProductStatistical from '@/pages/pagesAdmin/Statistical/Products/ProductStatistical'
import ProductsRevenue from '@/pages/pagesAdmin/Statistical/Products/TopRevenue'
import ProductsProfit from '@/pages/pagesAdmin/Statistical/Products/TopProfit'

const Routers = () => {
    return (
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/:id' element={<ProductDetail />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/orders/:id' element={<OrderDetail />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/formaddress' element={<FormAddress />} />
                <Route path='/payment' element={<PayMent />} />
                <Route path='/collections/:id' element={<Collection />} />
                <Route path='/policy/:id' element={<PolicyPage />} />
                <Route path='/policy/:id' element={<PolicyPage />} />
                <Route path='/profile' element={<ProtectedRoute element={MyProfile} />} />
            </Route>
            <Route path='/admin' element={<ProtectedRoute element={AdminLayout} />}>
                <Route index element={<Dashboard />} />
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/dashboard/products/top-selling' element={<ProductStatistical />} />
                <Route path='/admin/dashboard/products/top-revenue' element={<ProductsRevenue />} />
                <Route path='/admin/dashboard/products/top-profit' element={<ProductsProfit />} />
                <Route path='/admin/products' element={<Product />} />
                <Route path='/admin/products/add' element={<AddProduct />} />
                <Route path='/admin/products/edit/:productId' element={<EditProduct />} />
                <Route path='/admin/products/detail/:productId' element={<ProtectedRoute element={DetailProduct} />} />
                <Route path='/admin/category' element={<ListCategory />} />
                <Route path='/admin/account' element={<ListAccount />} />
                <Route path='/admin/account/:id/edit' element={<EditAccount />} />
                <Route path='/admin/user' element={<ListUser />} />
                <Route path='/admin/bill' element={<ListBill />} />
                <Route path='/admin/bill/:id' element={<BillDetail />} />
                <Route path='/admin/size' element={<ListSize />} />
                <Route path='/admin/category/:id' element={<EditCategory />} />
                <Route path='/admin/size/:id' element={<Edit />} />
                <Route path='/admin/account/add' element={<AddAccount />} />

                <Route path='/admin/orders' element={<ProtectedRoute element={OrderList} />} />
                <Route path='/admin/orders/detail/:orderId' element={<ProtectedRoute element={OrderDetailAdmin} />} />

                <Route path='/admin/reviews' element={<ProtectedRoute element={ReviewList} />} />
                <Route path='/admin/reviews/detail/:reviewId' element={<ProtectedRoute element={ReviewDetail} />} />
            </Route>
        </Routes>
    )
}

export default Routers
