import React from 'react'
import { Icon } from '@iconify/react';
import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb';
import { Link } from 'react-router-dom';
const Cart = () => {
    const breadcrumb: IBreadCrumb[] = [
        {
            title: 'Giỏ hàng',
            link: '/cart'
        }
    
    ]
  return (
    <div>
        <BreadCrumb links={breadcrumb} />
        <div className="max-w-screen-xl m-auto text-[20px] ">
        
        <div className="cart grid grid-cols-3 gap-5 my-5 mx-0">
            <div className="cart__content col-span-2">
                <div className="cart__content--title py-4 flex justify-between">
                    <h2 className="content--title text-[20px] font-bold mb-[20px]">
                        Giỏ hàng của bạn
                    </h2>
                    <p>Bạn đang có <strong> 1 sản phẩm </strong>trong giỏ hàng</p>
                </div>
                <div className="cart__content--oder border-2 rounded">
                    <div className="content--oder--item relative flex justify-between items-center  p-5">
                        <div className="desc flex gap-8 items-center ">
                            <div className="oder--item-img w-[150px] h-[150px]">
                                <img src="https://product.hstatic.net/200000690551/product/br4_a36fe1712e2c4fb09fbc18e6de41c154_medium.jpg"
                                    alt="" className="imgfluid" />
                                    <button className="absolute top-[15px] left-[10px] bg-gray-200 border border-solid border-slate-400 rounded"><Icon icon="ic:baseline-delete" /></button>
                            </div>
                            <div className="item-desc-inf">
                                <h3 className="desc-inf-title">
                                    [CHÍNH HÃNG] Giày Sneaker Revo Gen 1 Low - Brown
                                </h3>
                                <p className="mb-4 text-[16px] font-semibold">38</p>
                                <p className="text-gray-600 font-semibold">
                                    750.000đ
                                    <strike className="text-[16px] text-gray-400 ml-1">1.500.000đ</strike>
                                </p>
                            </div>
                        </div>

                        <div className="item-desc-price">
                            <p className="text-right font-semibold mb-3">750.000đ</p>
                            <div className="flex items-center space-x-4 border-solid border">
                                <button id="decrement"
                                    className="bg-gray-200 text-center text-gray-500 px-4 py-1 hover:bg-gray-600">
                                    -
                                </button>
                                <input id="quantity" className="text-[18px] font-semibold w-[10px] outline-0" value={1}/>

                                <button id="increment"
                                    className="bg-gray-200 text-center text-gray-500 px-3 py-1 hover:bg-gray-600">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content--oder--item relative flex justify-between items-center  p-5">
                        <div className="desc flex gap-8 items-center ">
                            <div className="oder--item-img w-[150px] h-[150px]">
                                <img src="https://product.hstatic.net/200000690551/product/br4_a36fe1712e2c4fb09fbc18e6de41c154_medium.jpg"
                                    alt="" className="imgfluid" />
                                    <button className="absolute top-[15px] left-[10px] bg-gray-200 border border-solid border-slate-400 rounded"><Icon icon="ic:baseline-delete" /></button>
                            </div>
                            <div className="item-desc-inf">
                                <h3 className="desc-inf-title">
                                    [CHÍNH HÃNG] Giày Sneaker Revo Gen 1 Low - Brown
                                </h3>
                                <p className="mb-4 text-[16px] font-semibold">38</p>
                                <p className="text-gray-600 font-semibold">
                                    750.000đ
                                    <strike className="text-[16px] text-gray-400 ml-1">1.500.000đ</strike>
                                </p>
                            </div>
                        </div>

                        <div className="item-desc-price">
                            <p className="text-right font-semibold mb-3">750.000đ</p>
                            <div className="flex items-center space-x-4 border-solid border">
                                <button id="decrement"
                                    className="bg-gray-200 text-center text-gray-500 px-4 py-1 hover:bg-gray-600">
                                    -
                                </button>
                                <input id="quantity" className="text-[18px] font-semibold w-[10px] outline-0" value={1}/>

                                <button id="increment"
                                    className="bg-gray-200 text-center text-gray-500 px-3 py-1 hover:bg-gray-600">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content--oder--item relative flex justify-between items-center  p-5">
                        <div className="desc flex gap-8 items-center ">
                            <div className="oder--item-img w-[150px] h-[150px]">
                                <img src="https://product.hstatic.net/200000690551/product/br4_a36fe1712e2c4fb09fbc18e6de41c154_medium.jpg"
                                    alt="" className="imgfluid" />
                                    <button className="absolute top-[15px] left-[10px] bg-gray-200 border border-solid border-slate-400 rounded"><Icon icon="ic:baseline-delete" /></button>
                            </div>
                            <div className="item-desc-inf">
                                <h3 className="desc-inf-title">
                                    [CHÍNH HÃNG] Giày Sneaker Revo Gen 1 Low - Brown
                                </h3>
                                <p className="mb-4 text-[16px] font-semibold">38</p>
                                <p className="text-gray-600 font-semibold">
                                    750.000đ
                                    <strike className="text-[16px] text-gray-400 ml-1">1.500.000đ</strike>
                                </p>
                            </div>
                        </div>

                        <div className="item-desc-price">
                            <p className="text-right font-semibold mb-3">750.000đ</p>
                            <div className="flex items-center space-x-4 border-solid border">
                                <button id="decrement"
                                    className="bg-gray-200 text-center text-gray-500 px-4 py-1 hover:bg-gray-600">
                                    -
                                </button>
                                <input id="quantity" className="text-[18px] font-semibold w-[10px] outline-0" value={1}/>

                                <button id="increment"
                                    className="bg-gray-200 text-center text-gray-500 px-3 py-1 hover:bg-gray-600">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="cart__info border-2 h-[300px] fixed right-[80px] z-40 bg-white">
                <div className="cart__info--detail p-4">
                    <h2 className="font-semibold text-2xl mb-3">Thông tin đơn hàng</h2>
                    <hr className="mb-3 border-dashed" />
                    <div className="info--detail-price flex justify-between py-4">
                        <p className="text-[20px] font-bold">Tổng tiền:</p>
                        <p className="font-semibold text-red-500">750.000đ</p>
                    </div>
                    <hr className="mb-3 border-dashed" />
                    <div className="info--detail-note text-[16px] text-gray-600">
                        <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                        <li>Mua thật nhiều nhận nhiều ưu đãi</li>
                    </div>
                    <div className="info--detail-btn bg-red-500 text-center py-2 mt-4">
                        <Link to='/formaddress' className="text-white uppercase">Thanh toán</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Cart