import React from 'react';
import { Table } from 'antd';

const TopRevenueTable = ({ products }) => {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng bán',
            dataIndex: 'quantitySold',
            key: 'quantitySold',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price.toLocaleString()} VND`,
        },
        {
            title: 'Tổng doanh thu',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            render: (text, record) => `${(record.quantitySold * record.price).toLocaleString()} VND`,
        },
    ];

    return <Table dataSource={products} columns={columns} rowKey="id" pagination={false} />;
};

const ProductsRevenue = () => {
    const products = [
        { id: 1, name: 'Sản phẩm 1', quantitySold: 100, price: 200000 },
        { id: 2, name: 'Sản phẩm 2', quantitySold: 80, price: 150000 },
        { id: 3, name: 'Sản phẩm 3', quantitySold: 70, price: 100000 },
        { id: 4, name: 'Sản phẩm 4', quantitySold: 60, price: 250000 },
        { id: 5, name: 'Sản phẩm 5', quantitySold: 50, price: 300000 },
    ];

    return (
        <div>
            <h1 className='text-[26px] uppercase font-semibold ml-6'>Top 5 sản phẩm có doanh thu cao nhất</h1>
            <TopRevenueTable products={products} />
        </div>
    );
};

export default ProductsRevenue;
