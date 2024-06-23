// tổng hợp tất cả các đường link

// import Signup from '@/features/auth/_components/Signup'
import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage/HomePage'
import ProductDetail from '@/pages/ProductDetail/index'
import ProductsPage from '@/pages/ProductsPage'
import Signup from '@/pages/auth/Signup'
import { Route, Routes } from 'react-router-dom'
import Signin from '@/pages/auth/Signin'
import Dashboard from '@/pages/pagesAdmin/Dashboard'
import Product from '@/pages/pagesAdmin/Products'
import AddProduct from '@/pages/pagesAdmin/Products/AddProduct'
import EditProduct from '@/pages/pagesAdmin/Products/EditProduct'
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
import ListAccount from '@/pages/pagesAdmin/Accounts/ListAccount'
import EditAccount from '@/pages/pagesAdmin/Accounts/EditAccount'
import AddAccount from '@/pages/pagesAdmin/Accounts/AddAccount'
import MyProfile from '@/pages/MyProfile'

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
                <Route path='/admin/category' element={<ProtectedRoute element={ListCategory} />} />
                <Route path='/admin/user' element={<ProtectedRoute element={ListUser} />} />
                <Route path='/admin/bill' element={<ProtectedRoute element={ListBill} />} />
                <Route path='/admin/bill/:id' element={<ProtectedRoute element={BillDetail} />} />
                <Route path='/admin/size' element={<ProtectedRoute element={ListSize} />} />
                <Route path='/admin/category/:id' element={<ProtectedRoute element={EditCategory} />} />
                <Route path='/admin/size/:id' element={<ProtectedRoute element={Edit} />} />
                <Route path='/admin/account' element={<ProtectedRoute element={ListAccount} />} />
                <Route path='/admin/account/add' element={<ProtectedRoute element={AddAccount} />} />
                <Route path='/admin/account/:id/edit' element={<ProtectedRoute element={EditAccount} />} />
            </Route>
        </Routes>
    )
}

export default Routers
