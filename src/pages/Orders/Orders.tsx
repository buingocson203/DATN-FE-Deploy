import { useEffect, useState } from 'react'
import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
import instance from '@/core/api'
import { Link } from 'react-router-dom'

const Orders = () => {
    const [lstOrders, setLstOrders] = useState([])
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [detailOrder, setDetailOrder] = useState(null)
    const getUserID = () => {
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : {}
        const userID = user?._id || ''
        return userID
    }

    const [reviewObj, setReviewObj] = useState({
        userId: getUserID(),
        orderId: '', //id của oder
        reviews: []
    })
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }
    const formatMoney = (money: number) => {
        return money?.toLocaleString() || 0
    }

    const breadcrumb: IBreadCrumb[] = [
        {
            title: 'Lịch sử đơn hàng',
            link: '/orders'
        }
    ]
    const fetchData = async () => {
        try {
            const response = await instance.get('api/order/orders')
            setLstOrders(response.data.data)
        } catch (error) {
            console.log(error)
            alert('Lỗi không lấy được dữ liệu đơn hàng')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const cancelOrder = async (orderID: any) => {
        event?.stopPropagation()
        try {
            await instance.patch(`api/order/update-order/${orderID}`, {
                orderStatus: 'cancel'
            })
            alert('Hủy đơn hàng thành công')
            fetchData()
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra')
        }
    }

    const onSelectOrderToReview = (order: any) => {
        event?.stopPropagation()
        setReviewObj({
            userId: getUserID(),
            orderId: order._id,
            reviews: order.productDetails?.map((x: any) => {
                return {
                    productId: x.productId,
                    content: ''
                }
            })
        })
        console.log(reviewObj)

        setDetailOrder(order)
        setShowReviewForm(true)
    }

    const submitReview = async () => {
        console.log(reviewObj)
        try {
            await instance.post('api/review/reviews', reviewObj)
            alert('Bạn đã đánh giá thành công')
            setShowReviewForm(false)
            fetchData()
        } catch (error) {
            console.log(error)
            alert('Có lỗi xảy ra')
        }
    }

    return (
        <div>
            <BreadCrumb links={breadcrumb} />
            {/* Form Danh gia */}
            {showReviewForm ? (
                <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                    {/* Overlay */}
                    <div
                        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                        aria-hidden='true'
                    ></div>
                    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div
                                            className='mt-3 text-center sm:mt-0 sm:text-left'
                                            style={{ width: '100%' }}
                                        >
                                            {/* TITLE */}
                                            <h3
                                                className='text-base font-semibold leading-6 text-gray-900 text-[24px]'
                                                id='modal-title'
                                            >
                                                Đánh giá đơn hàng của bạn
                                            </h3>
                                            {/* CONTENT POPUP */}
                                            <div className='box-product h-[400px]' style={{ overflowY: 'auto' }}>
                                                {detailOrder?.productDetails?.map((product, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className='my-2 border border-1 p-2 rounded border-gray'
                                                        >
                                                            <h4 className='font-bold'>{product.productName}</h4>
                                                            <textarea
                                                                style={{ width: '100%' }}
                                                                className='border border-1 p-2 w-100 mt-1'
                                                                placeholder='Your comment'
                                                                onChange={(e) => {
                                                                    reviewObj.reviews[index].content = e.target.value
                                                                }}
                                                            ></textarea>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        onClick={() => submitReview()}
                                        type='button'
                                        className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => setShowReviewForm(false)}
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            {/* Danh sach don hang */}
            <div className='max-w-screen-xl m-auto text-[20px] '>
                <div className='cart my-5 mx-0'>
                    <div className='cart__content '>
                        <div className='cart__content--title py-4 flex justify-between'>
                            <h2 className='content--title text-[36px] font-bold'>Lịch sử đơn hàng</h2>
                        </div>
                        <div className='cart__content--oder rounded'>
                            {lstOrders.map((order) => {
                                return (
                                    <div
                                        className='order-box border border-2 rounded mx-[24px] mb-5 border-slate-300'
                                        key={order._id}
                                    >
                                        {order?.productDetails.map((product, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className='order-box__info flex items-center justify-between px-[16px]'
                                                >
                                                    <div className='order-detail-info flex items-center mt-2'>
                                                        <img
                                                            src={product.image}
                                                            alt=''
                                                            className='h-[86px] w-[86px] '
                                                        />
                                                        <div className='order-detail-info__content ml-5'>
                                                            <h3 className='font-bold text-[18px]'>
                                                                {product.productName}
                                                            </h3>
                                                            <p className='text-[16px]'>
                                                                Phân loại hàng: {product.sizeName}
                                                            </p>
                                                            <p className='text-[18px]'>x{product.quantityOrders}</p>
                                                        </div>
                                                    </div>
                                                    <div className='order-detail-price flex items-center gap-x-[12px]'>
                                                        <span className='line-through text-[14px]'>
                                                            {formatMoney(product.price)}
                                                        </span>
                                                        <h4 className='text-red-500'>
                                                            {formatMoney(product.promotionalPrice)}
                                                        </h4>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className='flex items-center justify-between pl-[16px] mt-3'>
                                            <h4 className='text-[14px] italic'>
                                                Mã đơn hàng: <b>{order?.codeOrders || 'Chưa có'}</b> - Ngày đặt đơn:{' '}
                                                {formatDate(order?.createdAt)}
                                            </h4>
                                            <h3 className='text-right pr-[16px] text-[18px] mb-1'>
                                                Thành tiền:{' '}
                                                <span className='text-red-500'>
                                                    {formatMoney(order?.total_price || 0)}
                                                </span>
                                            </h3>
                                        </div>
                                        <div
                                            className='order-box__tool flex items-center px-[16px] justify-between py-[12px] bg-stone-200'
                                            style={{ borderTop: '1px solid #ddd' }}
                                        >
                                            <div className='order-status text-[16px]'>
                                                Tình trạng:{' '}
                                                <span className='font-bold'>
                                                    {(() => {
                                                        switch (order.orderStatus) {
                                                            case 'pending':
                                                                return 'Đang xử lý'
                                                            case 'waiting':
                                                                return 'Đang chờ lấy hàng'
                                                            case 'cancel':
                                                                return 'Đã hủy đơn'
                                                            case 'delivering':
                                                                return 'Đã giao hàng'
                                                            case 'done':
                                                                return 'Đã hoàn thành'
                                                            default:
                                                                return order.orderStatus
                                                        }
                                                    })()}
                                                </span>
                                            </div>
                                            <div className='order-box__tool--btn flex gap-x-[12px]'>
                                                {(() => {
                                                    if (['pending', 'waiting'].includes(order.orderStatus)) {
                                                        return (
                                                            <button
                                                                onClick={() => cancelOrder(order._id)}
                                                                className='h-[36px] border border-red-500 text-red-500 bg-white outline-none hover:bg-red-500 hover:text-white transition-all rounded-md w-[160px] text-[16px]'
                                                            >
                                                                Hủy đơn hàng
                                                            </button>
                                                        )
                                                    }
                                                })()}
                                                {(() => {
                                                    if (order.orderStatus == 'done' && !order.isRated) {
                                                        return (
                                                            <button
                                                                onClick={() => onSelectOrderToReview(order)}
                                                                className='text-[16px] h-[36px] border border-red-500 text-white bg-red-500 outline-none hover:opacity-90 transition-all rounded-md w-[120px]'
                                                            >
                                                                Đánh giá
                                                            </button>
                                                        )
                                                    } else if (order.isRated && order.orderStatus == 'done') {
                                                        return (
                                                            <div className='text-[14px] text-red-500'>
                                                                Đơn hàng đã được đánh giá
                                                            </div>
                                                        )
                                                    }
                                                })()}
                                                <Link to={`/orders/${order._id}`}>
                                                    <button className='h-[36px] border border-red-500 outline-none bg-red-500 text-white transition-all rounded-md w-[80px] text-[16px]'>
                                                        Chi tiết
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
