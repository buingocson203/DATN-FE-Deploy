import {
    FontSizeOutlined,
    LineHeightOutlined,
    PieChartOutlined,
    ProductOutlined,
    ProfileOutlined,
    TeamOutlined,
    UserSwitchOutlined,
    OrderedListOutlined,
    CommentOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/2-01.jpg'
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    { key: 'dashboard', icon: <PieChartOutlined />, label: <Link to='/admin/dashboard'>Thống kê</Link> },
    { key: 'products', icon: <ProductOutlined />, label: <Link to='/admin/products'>Quản lí sản phẩm</Link> },
    { key: 'orders', icon: <OrderedListOutlined />, label: <Link to='/admin/orders'>Quản lí đặt hàng</Link> },
    { key: 'reviews', icon: <CommentOutlined />, label: <Link to='/admin/reviews'>Quản lí đánh giá</Link> },
    {
        key: 'sub1',
        label: 'Quản lí thuộc tính',
        icon: <LineHeightOutlined />,
        children: [{ key: '5', icon: <FontSizeOutlined />, label: <Link to='/admin/size'>Quản lí Size</Link> }]
    },
    { key: '8', icon: <ProductOutlined />, label: <Link to='/admin/category'>Quản lí danh mục</Link> },
    {
        key: '11',
        icon: <TeamOutlined />,
        label: <Link to='/admin/account'>Quản lí tài khoản</Link>
    },
    { key: '12', icon: <ProfileOutlined />, label: 'Quản lí hóa đơn' },
    { key: '13', icon: <UserSwitchOutlined />, label: 'Tài khoản' }
]

const SidebarAdminComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div style={{ width: 288 }}>
            <div className=''>
                <img src={logo} alt='' className='h-24' />
            </div>

            <Menu
                defaultSelectedKeys={['dashboard']}
                defaultOpenKeys={['sub1']}
                mode='inline'
                theme='dark'
                inlineCollapsed={collapsed}
                items={items}
                className='h-screen'
            />
        </div>
    )
}

export default SidebarAdminComponent
