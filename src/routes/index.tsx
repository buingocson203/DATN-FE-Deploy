// tổng hợp tất cả các đường link

// import Signup from '@/features/auth/_components/Signup'
import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage'
import ProductDetail from '@/pages/ProductDetail'
import ProductsPage from '@/pages/ProductsPage'
import Signup from '@/pages/auth/Signup'
import { Route, Routes } from 'react-router-dom'
import Signin from '@/pages/auth/Signin'
import Dashboard from '@/pages/pagesAdmin/Dashboard'
import Product from '@/pages/pagesAdmin/Products'
import AddProduct from '@/pages/pagesAdmin/Products/AddProduct'
import ListBill from '@/pages/pagesAdmin/ListBill'
import BillDetail from '@/pages/pagesAdmin/ListBill/BillDetail'
import CategoryManagementPage from '@/pages/pagesAdmin/Category'
import ListUser from '@/pages/pagesAdmin/ListUser'
import ProtectedRoute from './ProtectedRoute'
import Cart from '@/pages/Cart'
import FormAddress from '@/pages/FormAddress'
import PayMent from '@/pages/PayMent'
import Collection from '@/pages/Collection'
import Size from '@/pages/pagesAdmin/Size'


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
                <Route path='formaddress' element={<FormAddress />} />
                <Route path='payment' element={<PayMent />} />
                <Route path='collections/:id' element={<Collection />} />
            </Route>
            <Route path='admin' element={<ProtectedRoute element={AdminLayout} />}>
                <Route index element={<ProtectedRoute element={Dashboard} />} />
                <Route path='/admin/dashboard' element={<ProtectedRoute element={Dashboard} />} />
                <Route path='/admin/products' element={<ProtectedRoute element={Product} />} />
                <Route path='/admin/products/add' element={<ProtectedRoute element={AddProduct} />} />
                <Route path='/admin/categories' element={<ProtectedRoute element={CategoryManagementPage} />} />
                <Route path='/admin/user' element={<ProtectedRoute element={ListUser} />} />
                <Route path='/admin/bill' element={<ProtectedRoute element={ListBill} />} />
                <Route path='/admin/bill/:id' element={<ProtectedRoute element={BillDetail} />} />
                <Route path='/admin/size' element={<ProtectedRoute element={Size} />} />
            </Route>
        </Routes>
    )
}

export default Routers
