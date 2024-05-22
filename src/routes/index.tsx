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

const Routers = () => {
    return (
        <Routes>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='/' element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path='products' element={<ProductsPage />} />
                <Route path='products/:id' element={<ProductDetail />} />
            </Route>
            <Route path='admin' element={<AdminLayout />}>
                <Route index element={<ManagerDashBoardPage />} />
                <Route path='products' element={<ManagerProductPage />}>
                    <Route index element={<List />} />
                    <Route path='add' element={<Add />} />
                    <Route path=':id/edit' element={<Edit />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Routers
export default Routers 
