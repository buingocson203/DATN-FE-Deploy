import React from 'react';

const BestSellingProducts = ({ products }) => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Top 5 Sản Phẩm Bán Chạy Nhất</h2>
            <div className="grid grid-cols-2 mb-2 font-semibold text-gray-700">
                <div className="text-left">Sản Phẩm</div>
                <div className="text-right">Số Lượng Bán</div>
            </div>
            <ul className="space-y-2">
                {products.map((product, index) => (
                    <li key={index} className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 shadow-sm rounded-lg transition duration-300">
                        <div className="flex items-center w-full">
                            <img className="w-12 h-12 object-cover rounded mr-4" src={product.image} alt={product.name} />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            </div>
                            <div className="text-lg font-bold text-right text-green-700">
                                {product.sales}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BestSellingProducts;
