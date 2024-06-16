import instance from '@/core/api'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const PayMent = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    console.log(searchParams)

    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay'>('cod')
    const exmapleBody = {
        address: 'Nghệ An',
        phone: '0987754123',
        user_id: '66671b3baa76694e64bf608c',
        products: [
            { product_id: '6665ebfbaeb64196d817c50c', quantity: 2 },
            { product_id: '666678c9fc5976b672b49918', quantity: 1 }
        ],
        total_price: 200000
        // payment_type: 'cod'
    }

    const handleOrder = async (payment_type?: 'cod' | 'vnpay') => {
        try {
            await instance.post('/api/order/create-order', { ...exmapleBody, payment_type })
            toast.success('Đặt hàng thành công')
            navigate('/')
        } catch (error) {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
        }
    }

    const handleOrderVnPay = async () => {
        try {
            const { data } = await instance.post('/api/order/create-order-vnpay', {
                total: 100000
            })
            window.open(data.url, '_self')
            // console.log(data.url)
        } catch (error) {
            toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau')
        }
    }
    useEffect(() => {
        if (searchParams.get('vnp_ResponseCode') === '00') {
            toast.success('Đặt hàng thành công')
            console.log('create order')
            handleOrder('vnpay')
        }
    }, [])
    return (
        <div className='my-[50px]'>
            <div className='max-w-screen-xl m-auto text-[20px]'>
                <div className='grid grid-cols-4 gap-5 mx-0 my-5 cart'>
                    <div className='col-span-2 cart__content'>
                        <div className='nav__link flex items-center gap-2 text-[18px]'>
                            <Link to='/cart' className='flex items-center gap-2 text-sky-500'>
                                Giỏ hàng
                                <Icon className='text-gray-400 text-[18px]' icon='mingcute:right-line' />
                            </Link>
                            <Link to='/formaddress' className='flex items-center gap-2 text-sky-500'>
                                Thông tin giao hàng
                                <Icon className='text-gray-400 text-[18px]' icon='mingcute:right-line' />
                            </Link>
                            <p className='flex items-center text-gray-400'>Phương thức thanh toán</p>
                        </div>

                        <h2 className='mt-8 mb-5 text-[20px] font-normal'>Phương thức thanh toán</h2>
                        <div className='py-4 border-2 border-solid rounded '>
                            <div className='flex items-center gap-2 pb-4 pl-4'>
                                <input
                                    value={'cod'}
                                    type='radio'
                                    name='paymentMethod'
                                    defaultChecked
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value as 'cod')
                                    }}
                                />
                                <img
                                    src='https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6'
                                    alt=''
                                />
                                <p className='text-gray-500 text-[18px]'>Thanh toán khi giao hàng (COD)</p>
                            </div>
                            <hr />
                            <div className='flex items-center gap-2 pt-4 pl-4'>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value={'vnpay'}
                                    onChange={(e) => {
                                        setPaymentMethod(e.target.value as 'vnpay')
                                    }}
                                />
                                <img
                                    src='https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6'
                                    alt=''
                                />
                                <p className='text-gray-500 text-[18px]'>Chuyển khoản ngân hàng</p>
                            </div>
                        </div>

                        <div className='pay__info'>
                            <div className='form__profile'>
                                <div className='flex items-center justify-between mt-4 pay__router'>
                                    <Link to='/cart' className='text-sky-600 text-[18px]'>
                                        Giỏ hàng
                                    </Link>
                                    <button
                                        className='text-white bg-sky-700 px-5 py-3 rounded text-[18px]'
                                        onClick={() => {
                                            paymentMethod === 'cod' ? handleOrder() : handleOrderVnPay()
                                        }}
                                    >
                                        Hoàn tất đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-[50px]' />
                        <p className=' text-center text-[18px] text-gray-500 mt-3'>Powered by Haravan</p>
                    </div>
                    <div className='col-span-2 border-l cart__info border-slate-400 '>
                        <div className='relative flex items-center gap-4 ml-8 desc '>
                            <div className='oder--item-img w-[100px] h-[100px]overflow-hidden'>
                                <img
                                    src='https://product.hstatic.net/200000690551/product/br4_a36fe1712e2c4fb09fbc18e6de41c154_medium.jpg'
                                    alt=''
                                    className='rounded-lg imgfluid'
                                />
                                <p className='absolute bottom-[80px] left-[80px] bg-gray-200 border border-solid border-slate-400 rounded-full flex justify-center text-[16px] px-3 py-1'>
                                    1
                                </p>
                            </div>
                            <div className='flex items-center justify-between gap-8 item-desc-inf'>
                                <div>
                                    <p className='desc-inf-title text-[15px]'>
                                        [CHÍNH HÃNG] Giày Sneaker Revo Gen 1 Low - Brown
                                    </p>
                                    <p className='mb-4 text-[16px] font-normal text-gray-500'>38</p>
                                </div>
                                <p className='text-gray-600 font-medium text-[16px]'>750.000đ</p>
                            </div>
                        </div>
                        <hr className='mx-4 mt-4 border-dashed' />
                        <div className='mx-4 mt-4 pay__provisional'>
                            <div className='flex justify-between mb-3 payy__provisional--money'>
                                <p className='text-[18px] text-gray-500'>Tạm tính</p>
                                <p className='text-[18px] text-gray-500'>750.000đ</p>
                            </div>
                            <div className='flex justify-between payy__provisional--transport'>
                                <p className='text-[18px] text-gray-500'>Phí vận chuyển</p>
                                <p className='text-[18px] text-gray-500'>
                                    <Icon icon='bi:dash' />
                                </p>
                            </div>
                        </div>
                        <hr className='mx-4 mt-4 border-dashed' />
                        <div className='flex justify-between mx-4 mt-4 payy__provisional--total'>
                            <p className='text-[18px] text-gray-500'>Tổng cộng</p>
                            <p>
                                <span className='text-[16px] text-gray-500 mr-2'>VNĐ</span> 750.000đ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayMent
