import React, { useState } from 'react'
import {
    AppstoreOutlined,
    MailOutlined,
    ProductOutlined,
    LineHeightOutlined,
    FontSizeOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    UserOutlined,
    ProfileOutlined,
    MenuUnfoldOutlined,
    UserSwitchOutlined,
    PieChartOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'
import logo from '../../assets/2-01.jpg'
import { Link } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    { key: '1', icon: <PieChartOutlined />, label: <Link to='/admin/dashboard'>Thống kê</Link> },
    { key: '2', icon: <ProductOutlined />, label: <Link to='/admin/products'>Quản lí sản phẩm</Link> },
    {
        key: 'sub1',
        label: 'Quản lí thuộc tính',
        icon: <LineHeightOutlined />,
        children: [{ key: '5', icon: <FontSizeOutlined />, label: <Link to='/admin/size'>Quản lí Size</Link> }]
    },
    { key: '8', icon: <ProductOutlined />, label: <Link to='/admin/category'>Quản lí danh mục</Link> },
    { key: '11', icon: <TeamOutlined />, label: 'Quản lí tài khoản' },
    { key: '12', icon: <ProfileOutlined />, label: 'Quản lí hóa đơn' },
    { key: '13', icon: <UserSwitchOutlined />, label: 'Tài khoản' },
    
]

const SidebarAdminComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)

   

    return (
        <div style={{ width: 288 }}>
            <div className=''>
                <img src={logo} alt=''className='h-24'/>
            </div>

            <Menu
                defaultSelectedKeys={['1']}
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
