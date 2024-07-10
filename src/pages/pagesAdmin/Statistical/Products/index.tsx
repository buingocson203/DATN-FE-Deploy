import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import BestSellingProducts from './ProductStatistical';
import HighestRevenueProducts from './TopRevenue';
import HighestProfitProducts from './TopProfit';
import instance from '@/core/api';

const fetchProducts = async (selectedCategory, filterBy, year, month, week) => {
    const endpointMap = {
        bestSelling: 'api/order/top-5-product-best-seller',
        highestRevenue: 'api/order/top-revenue-product',
        highestProfit: 'api/order/topProfitableProducts',
    };

    let url = `${endpointMap[selectedCategory]}?filterBy=${filterBy}&year=${year}`;
    if (filterBy === 'month') {
        url += `&month=${month}`;
    } else if (filterBy === 'week') {
        url += `&week=${week}`;
    }

    // const { data } = await instance.get(url);
    // console.log(`Data fetched for ${selectedCategory}:`, data);
    // return data;
    try {
        const { data } = await instance.get(url);
        console.log(`Data fetched for ${selectedCategory}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data for ${selectedCategory}:`, error);
        throw new Error(error.response?.data?.message || 'Error fetching data');
    }
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

    const { data: products, isLoading } = useQuery(
        ['products', selectedCategory, timeFrame, year, month, week],
        () => fetchProducts(selectedCategory, timeFrame, year, month, week),
        {
            enabled: year !== '' && (timeFrame === 'year' || (timeFrame === 'month' && month !== '') || (timeFrame === 'week' && week !== '')),
        }
    );
    console.log('Products:', products);

    const renderComponent = () => {
        const [isLoading, setIsLoading] = useState(true);
        const [dataAvailable, setDataAvailable] = useState(true); // Ban đầu giả định dữ liệu có sẵn

        useEffect(() => {
            if (products && Array.isArray(products.data) && products.data.length === 0) {
                setDataAvailable(false); // Không có dữ liệu
            }
            setIsLoading(false); // Ngừng loading khi đã có dữ liệu trả về hoặc không có dữ liệu
        }, [products]);

        // Kiểm tra xem có dữ liệu không và có bị lỗi không
        if (!dataAvailable) {
            return <div>No data available</div>;
        }

        if (isLoading) {
            return <div>Loading...</div>;
        }

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
