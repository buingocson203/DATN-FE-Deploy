// tổng hợp tất cả các đường link

// import Signup from '@/features/auth/_components/Signup'
import Add from '@/features/product/_components/Add'
import Edit from '@/features/product/_components/Edit'
import List from '@/features/product/_components/List'
import AdminLayout from '@/layouts/AdminLayout'
import BaseLayout from '@/layouts/BaseLayout'
import HomePage from '@/pages/HomePage'
import ProductDetail from '@/pages/ProductDetail'
import ProductsPage from '@/pages/ProductsPage'
import Signup from '@/pages/auth/Signup'
import ManagerDashBoardPage from '@/pages/manager/dashboard'
import ManagerProductPage from '@/pages/manager/product'
import { Route, Routes } from 'react-router-dom'
import Signin from '@/pages/auth/Signin'
import Dashboard from '@/pages/pagesAdmin/Dashboard'
import Product from '@/pages/pagesAdmin/Products'
import AddProduct from '@/pages/pagesAdmin/Products/AddProduct'
import ListBill from '@/pages/pagesAdmin/ListBill'
import BillDetail from '@/pages/pagesAdmin/ListBill/BillDetail'
import CategoryManagementPage from '@/pages/pagesAdmin/Category'
import { useEffect, useState } from 'react'
import { ICategory } from '@/common/interfaces/category'
import ListUser from '@/pages/pagesAdmin/ListUser'
import Collection from '@/pages/Collection'
const Routers = () => {


    return (
        <Routes>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='products' element={<ProductsPage />} />
                <Route path='products/:id' element={<ProductDetail />} />
                <Route path='collections/:id' element={<Collection />} />
            </Route>
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/products' element={<Product />} />
                <Route path='/admin/products/add' element={<AddProduct />} />
                <Route path='/admin/categories' element={<CategoryManagementPage />} />
                {/* <Route path='/admin/categories/edit/:id' element={<EditCategory />} />
                <Route path='/admin/categories/add' element={<AddCategory />} /> */}
                <Route path='/admin/user' element={<ListUser />} />
                <Route path='/admin/bill' element={<ListBill />} />
                <Route path='/admin/bill/:id' element={<BillDetail />} />
                {/* <Route path='products' element={<ManagerProductPage />}>
                    <Route index element={<List />} />
                    <Route path='add' element={<Add />} />
                    <Route path=':id/edit' element={<Edit />} />
                </Route> */}
            </Route>
        </Routes>
    )
}

export default Routers
