import React, { useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
import { Link } from 'react-router-dom'
import instance from '@/core/api'

const Cart = () => {
    const getUserID = () => {
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : {}
        const userID = user?._id || ''
        return userID
    }
    interface CartItem {
        idCart: string
        nameProduct: string
        price: number
        promotionalPrice: number
        totalQuantity: number
        size: number
        totalPrice: number
        imageProduct: string
    }

    const [cartList, setCartList] = useState<CartItem[]>([])
    const [forceRender, setForceRender] = useState(0)
    const [lstSelected, setLstSelected] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get(`api/cart/${getUserID()}`)
            setCartList(response.data.data)
        }
        fetchData()
    }, [])
    const breadcrumb: IBreadCrumb[] = [
        {
            title: 'Giỏ hàng',
            link: '/cart'
        }
    ]
    const handleQuantity = (itemID: string, type: Number) => {
        const fetchData = async (newQuantity: Number) => {
            try {
                await instance.put(`api/cart/updateCart`, {
                    idCart: itemID,
                    quantity: newQuantity
                })
            } catch (error) {
                alert('Số lượng yêu cầu vượt quá số lượng trong kho')
            }
        }
        const newCartList = cartList?.map((item) => {
            if (item.idCart === itemID) {
                if (type == 1) {
                    fetchData(item.totalQuantity + 1)
                    return { ...item, totalQuantity: item.totalQuantity + 1 }
                } else if (item.totalQuantity > 1 && type == 2) {
                    fetchData(item.totalQuantity - 1)
                    return { ...item, totalQuantity: item.totalQuantity - 1 }
                }
            }
            return item
        })
        setCartList(newCartList)
        setForceRender(forceRender + 1)
    }
    const removeCart = (itemID: string) => {
        const fetchData = async (ids: string[]) => {
            await instance.delete(`api/cart/deteCart`, {
                data: { idCart: ids }
            })
        }
        cartList?.forEach((item, index) => {
            if (item.idCart === itemID) {
                fetchData([itemID])
                const updatedCart = [...cartList] // Create a copy of the cart array
                updatedCart.splice(index, 1)
                setCartList(updatedCart)
            }
        })
        setForceRender(forceRender + 1)
    }
    const handleSelectCart = (event: any, idCart: any) => {
        console.log(event.target.checked, idCart)
        if (event.target.checked) {
            setLstSelected([...lstSelected, idCart])
        } else {
            const index = lstSelected.indexOf(idCart)
            if (index > -1) {
                lstSelected.splice(index, 1)
            }
            setLstSelected([...lstSelected])
        }
        console.log(lstSelected)
    }
    const removeCartList = () => {
        const fetchData = async (ids: string[]) => {
            try {
                await instance.delete(`api/cart/deteCart`, {
                    data: { idCart: ids }
                })
                alert('Cart deleted successfully')
            } catch (error) {
                alert('Error deleting')
            }
        }
        fetchData(lstSelected)
        setCartList([])
        setForceRender(forceRender + 1)
    }
    const totalPrice = useMemo(() => {
        let count = 0
        cartList?.forEach((item) => {
            count += item.price * item.totalQuantity
        })
        return count
    }, [cartList])
    return (
        <div>
            <BreadCrumb links={breadcrumb} />
            <div className='max-w-screen-xl m-auto text-[20px] '>
                <div className='cart grid grid-cols-3 gap-5 my-5 mx-0'>
                    <div className='cart__content col-span-2'>
                        <div className='cart__content--title py-4 flex justify-between'>
                            <h2 className='content--title text-[20px] font-bold mb-[20px]'>Giỏ hàng của bạn</h2>
                            <p>
                                Bạn đang có <strong> {cartList?.length} sản phẩm </strong>trong giỏ hàng
                            </p>
                        </div>
                        <button
                            className='bg-red-500 text-center py-2 px-4 mb-4 text-white'
                            onClick={() => removeCartList()}
                        >
                            Xóa giỏ hàng
                        </button>

                        <div className='cart__content--oder border-2 rounded'>
                            {cartList?.map((item) => {
                                return (
                                    <div className='content--oder--item relative flex justify-between items-center  p-5'>
                                        <div className='desc flex gap-8 items-center '>
                                            <input
                                                type='checkbox'
                                                name=''
                                                id=''
                                                style={{ transform: 'scale(2)' }}
                                                onChange={() => handleSelectCart(event, item.idCart)}
                                            />
                                            <div className='oder--item-img w-[150px] h-[150px]'>
                                                <img
                                                    src={item.imageProduct}
                                                    alt=''
                                                    className='imgfluid'
                                                    style={{ height: '100%' }}
                                                />
                                                <button
                                                    onClick={() => removeCart(item.idCart)}
                                                    className='absolute top-[15px] left-[10px] bg-gray-200 border border-solid border-slate-400 rounded'
                                                >
                                                    <Icon icon='ic:baseline-delete' />
                                                </button>
                                            </div>
                                            <div className='item-desc-inf'>
                                                <h3 className='desc-inf-title'>{item.nameProduct}</h3>
                                                <p className='mb-4 text-[16px] font-semibold'>Size: {item.size}</p>
                                                <p className='text-gray-600 font-semibold'>
                                                    Price: {item.price}đ
                                                    <strike className='text-[16px] text-gray-400 ml-1'>
                                                        {item.promotionalPrice}
                                                    </strike>
                                                </p>
                                            </div>
                                        </div>

                                        <div className='item-desc-price'>
                                            <p className='text-right font-semibold mb-3'>
                                                {item.price * item.totalQuantity}đ
                                            </p>
                                            <div className='flex items-center space-x-4 border-solid border'>
                                                <button
                                                    id='decrement'
                                                    className='bg-gray-200 text-center text-gray-500 px-4 py-1 hover:bg-gray-600'
                                                    onClick={() => handleQuantity(item.idCart, 2)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    id='quantity'
                                                    className='text-[18px] font-semibold w-[30px] outline-0'
                                                    value={item.totalQuantity}
                                                />

                                                <button
                                                    id='increment'
                                                    className='bg-gray-200 text-center text-gray-500 px-3 py-1 hover:bg-gray-600'
                                                    onClick={() => handleQuantity(item.idCart, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className='cart__info border-2 h-[300px] fixed right-[80px] z-40 bg-white'>
                        <div className='cart__info--detail p-4'>
                            <h2 className='font-semibold text-2xl mb-3'>Thông tin đơn hàng</h2>
                            <hr className='mb-3 border-dashed' />
                            <div className='info--detail-price flex justify-between py-4'>
                                <p className='text-[20px] font-bold'>Tổng tiền:</p>
                                <p className='font-semibold text-red-500'>{totalPrice}đ</p>
                            </div>
                            <hr className='mb-3 border-dashed' />
                            <div className='info--detail-note text-[16px] text-gray-600'>
                                <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                                <li>Mua thật nhiều nhận nhiều ưu đãi</li>
                            </div>
                            <div className='info--detail-btn bg-red-500 text-center py-2 mt-4'>
                                <Link to='/checkout' className='text-white uppercase'>
                                    Thanh toán
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
