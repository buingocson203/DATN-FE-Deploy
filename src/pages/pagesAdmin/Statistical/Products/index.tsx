import React, { useState } from 'react';
import BestSellingProducts from './ProductStatistical';
import HighestRevenueProducts from './TopRevenue';
import HighestProfitProducts from './TopProfit';

const allProducts = {
    bestSelling: [
        { name: 'Sản phẩm 1', size: 37, image: 'https://via.placeholder.com/150', sales: 120, date: '2024-01-01' },
        { name: 'Sản phẩm 2', size: 37, image: 'https://via.placeholder.com/150', sales: 100, date: '2024-01-01' },
        { name: 'Sản phẩm 3', size: 37, image: 'https://via.placeholder.com/150', sales: 80, date: '2024-01-01' },
        { name: 'Sản phẩm 4', size: 37, image: 'https://via.placeholder.com/150', sales: 70, date: '2024-01-01' },
        { name: 'Sản phẩm 5', size: 37, image: 'https://via.placeholder.com/150', sales: 50, date: '2024-01-01' },
    ],
    highestRevenue: [
        { name: 'Sản phẩm A', image: 'https://via.placeholder.com/150', revenue: 500000, date: '2024-07-01' },
        { name: 'Sản phẩm B', image: 'https://via.placeholder.com/150', revenue: 400000, date: '2024-06-25' },
        { name: 'Sản phẩm C', image: 'https://via.placeholder.com/150', revenue: 300000, date: '2024-05-30' },
        { name: 'Sản phẩm D', image: 'https://via.placeholder.com/150', revenue: 200000, date: '2024-03-20' },
        { name: 'Sản phẩm E', image: 'https://via.placeholder.com/150', revenue: 100000, date: '2024-01-15' },
    ],
    highestProfit: [
        { name: 'Sản phẩm X', image: 'https://via.placeholder.com/150', profit: 80000, date: '2024-07-01' },
        { name: 'Sản phẩm Y', image: 'https://via.placeholder.com/150', profit: 70000, date: '2024-06-25' },
        { name: 'Sản phẩm Z', image: 'https://via.placeholder.com/150', profit: 60000, date: '2024-05-30' },
        { name: 'Sản phẩm W', image: 'https://via.placeholder.com/150', profit: 50000, date: '2024-03-20' },
        { name: 'Sản phẩm V', image: 'https://via.placeholder.com/150', profit: 40000, date: '2024-01-15' },
    ],
};

const StatisticalProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState('bestSelling');
    const [timeFrame, setTimeFrame] = useState('week');
    const [week, setWeek] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const filterProductsByTimeFrame = (products) => {
        const now = new Date();
        switch (timeFrame) {
            case 'week':
                if (week && year) {
                    const startDate = new Date(year, 0, (week - 1) * 7 + 1);
                    const endDate = new Date(year, 0, week * 7);
                    return products.filter(product => {
                        const productDate = new Date(product.date);
                        return productDate >= startDate && productDate <= endDate;
                    });
                }
                break;
            case 'month':
                if (month && year) {
                    const startDate = new Date(year, month - 1, 1);
                    const endDate = new Date(year, month, 0);
                    return products.filter(product => {
                        const productDate = new Date(product.date);
                        return productDate >= startDate && productDate <= endDate;
                    });
                }
                break;
            case 'year':
                if (year) {
                    const startDate = new Date(year, 0, 1);
                    const endDate = new Date(year, 11, 31);
                    return products.filter(product => {
                        const productDate = new Date(product.date);
                        return productDate >= startDate && productDate <= endDate;
                    });
                }
                break;
            default:
                return products;
        }
        return products;
    };

    const renderComponent = () => {
        let products = allProducts[selectedCategory];
        products = filterProductsByTimeFrame(products);
        return (
            <>
                {selectedCategory === 'bestSelling' && <BestSellingProducts products={products} />}
                {selectedCategory === 'highestRevenue' && <HighestRevenueProducts products={products} />}
                {selectedCategory === 'highestProfit' && <HighestProfitProducts products={products} />}
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex flex-col justify-between items-center max-w-2xl mx-auto mb-4 space-y-4">
                <h1 className="text-3xl font-bold">Thứ Hạng Sản Phẩm</h1>
                <div className="flex space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-2 border rounded-lg bg-white shadow text-gray-600"
                    >
                        <option value="bestSelling">Top 5 Sản Phẩm Bán Chạy Nhất</option>
                        <option value="highestRevenue">Top 5 Sản Phẩm Có Doanh Thu Cao</option>
                        <option value="highestProfit">Top 5 Sản Phẩm Có Lợi Nhuận Cao</option>
                    </select>
                    <select
                        value={timeFrame}
                        onChange={handleTimeFrameChange}
                        className="p-2 border rounded-lg bg-white shadow text-gray-600"
                    >
                        <option value="week">Tuần</option>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <div className="flex space-x-4">
                    {timeFrame === 'week' && (
                        <>
                            <input
                                type="number"
                                value={week}
                                onChange={(e) => setWeek(e.target.value)}
                                placeholder="Tuần"
                                className="p-2 border rounded-lg bg-white shadow text-gray-600 w-24"
                            />
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Năm"
                                className="p-2 border rounded-lg bg-white shadow text-gray-600 w-24"
                            />
                        </>
                    )}
                    {timeFrame === 'month' && (
                        <>
                            <input
                                type="number"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                placeholder="Tháng"
                                className="p-2 border rounded-lg bg-white shadow text-gray-600 w-24"
                            />
                            <input
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Năm"
                                className="p-2 border rounded-lg bg-white shadow text-gray-600 w-24"
                            />
                        </>
                    )}
                    {timeFrame === 'year' && (
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Năm"
                            className="p-2 border rounded-lg bg-white shadow text-gray-600 w-24"
                        />
                    )}
                </div>
            </div>
            {renderComponent()}
        </div>
    );
};

export default StatisticalProduct;
