import React, { useState } from 'react';
import BestSellingProducts from './ProductStatistical';
import HighestRevenueProducts from './TopRevenue';
import HighestProfitProducts from './TopProfit';

const allProducts = {
    bestSelling: [
        { name: 'Sản phẩm 1', image: 'https://via.placeholder.com/150', sales: 120 },
        { name: 'Sản phẩm 2', image: 'https://via.placeholder.com/150', sales: 100 },
        { name: 'Sản phẩm 3', image: 'https://via.placeholder.com/150', sales: 80 },
        { name: 'Sản phẩm 4', image: 'https://via.placeholder.com/150', sales: 70 },
        { name: 'Sản phẩm 5', image: 'https://via.placeholder.com/150', sales: 50 },
    ],
    highestRevenue: [
        { name: 'Sản phẩm A', image: 'https://via.placeholder.com/150', revenue: 500000 },
        { name: 'Sản phẩm B', image: 'https://via.placeholder.com/150', revenue: 400000 },
        { name: 'Sản phẩm C', image: 'https://via.placeholder.com/150', revenue: 300000 },
        { name: 'Sản phẩm D', image: 'https://via.placeholder.com/150', revenue: 200000 },
        { name: 'Sản phẩm E', image: 'https://via.placeholder.com/150', revenue: 100000 },
    ],
    highestProfit: [
        { name: 'Sản phẩm X', image: 'https://via.placeholder.com/150', profit: 80000 },
        { name: 'Sản phẩm Y', image: 'https://via.placeholder.com/150', profit: 70000 },
        { name: 'Sản phẩm Z', image: 'https://via.placeholder.com/150', profit: 60000 },
        { name: 'Sản phẩm W', image: 'https://via.placeholder.com/150', profit: 50000 },
        { name: 'Sản phẩm V', image: 'https://via.placeholder.com/150', profit: 40000 },
    ],
};

const StatisticalProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState('bestSelling');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const renderComponent = () => {
        switch (selectedCategory) {
            case 'highestRevenue':
                return <HighestRevenueProducts products={allProducts[selectedCategory]} />;
            case 'highestProfit':
                return <HighestProfitProducts products={allProducts[selectedCategory]} />;
            default:
                return <BestSellingProducts products={allProducts[selectedCategory]} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center max-w-2xl mx-auto mb-4">
                <h1 className="text-3xl font-bold ">Thứ Hạng Sản Phẩm</h1>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 border rounded-lg bg-white shadow text-gray-600"
                >
                    <option value="bestSelling">Top 5 Sản Phẩm Bán Chạy Nhất</option>
                    <option value="highestRevenue">Top 5 Sản Phẩm Có Doanh Thu Cao</option>
                    <option value="highestProfit">Top 5 Sản Phẩm Có Lợi Nhuận Cao</option>
                </select>
            </div>
            {renderComponent()}
        </div>
    );
};

export default StatisticalProduct;