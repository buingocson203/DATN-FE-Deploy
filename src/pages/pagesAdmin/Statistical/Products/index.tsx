import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import BestSellingProducts from './ProductStatistical';
import HighestRevenueProducts from './TopRevenue';
import HighestProfitProducts from './TopProfit';
import instance from '@/core/api';

const fetchProducts = async (endpoint, filterBy, year, month, week) => {
    let url = `${endpoint}?filterBy=${filterBy}&year=${year}`;
    if (filterBy === 'month') {
        url += `&month=${month}`;
    } else if (filterBy === 'week') {
        url += `&week=${week}`;
    }

    try {
        const { data } = await instance.get(url);
        console.log(`Data fetched from ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw new Error(error.response?.data?.message || 'Error fetching data');
    }
};

const StatisticalProduct = () => {
    const [timeFrame, setTimeFrame] = useState('week');
    const [week, setWeek] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value);
    };

    const fetchBestSellingProducts = () => fetchProducts('api/order/top-5-product-best-seller', timeFrame, year, month, week);
    const fetchHighestRevenueProducts = () => fetchProducts('api/order/top-revenue-product', timeFrame, year, month, week);
    const fetchHighestProfitProducts = () => fetchProducts('api/order/topProfitableProducts', timeFrame, year, month, week);

    const { data: bestSellingProducts, isLoading: isLoadingBestSelling } = useQuery(
        ['bestSellingProducts', timeFrame, year, month, week],
        fetchBestSellingProducts,
        {
            enabled: year !== '' && (timeFrame === 'year' || (timeFrame === 'month' && month !== '') || (timeFrame === 'week' && week !== '')),
        }
    );

    const { data: highestRevenueProducts, isLoading: isLoadingHighestRevenue } = useQuery(
        ['highestRevenueProducts', timeFrame, year, month, week],
        fetchHighestRevenueProducts,
        {
            enabled: year !== '' && (timeFrame === 'year' || (timeFrame === 'month' && month !== '') || (timeFrame === 'week' && week !== '')),
        }
    );

    const { data: highestProfitProducts, isLoading: isLoadingHighestProfit } = useQuery(
        ['highestProfitProducts', timeFrame, year, month, week],
        fetchHighestProfitProducts,
        {
            enabled: year !== '' && (timeFrame === 'year' || (timeFrame === 'month' && month !== '') || (timeFrame === 'week' && week !== '')),
        }
    );

    const isLoading = isLoadingBestSelling || isLoadingHighestRevenue || isLoadingHighestProfit;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex flex-col justify-between items-center max-w-2xl mx-auto mb-4 space-y-4">
                <h1 className="text-3xl font-bold">Thứ Hạng Sản Phẩm</h1>
                <div className="flex space-x-4">
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
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Top 5 Sản Phẩm Bán Chạy Nhất</h2>
                        <BestSellingProducts products={bestSellingProducts} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Top 5 Sản Phẩm Có Doanh Thu Cao</h2>
                        <HighestRevenueProducts products={highestRevenueProducts} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Top 5 Sản Phẩm Có Lợi Nhuận Cao</h2>
                        <HighestProfitProducts products={highestProfitProducts} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticalProduct;
