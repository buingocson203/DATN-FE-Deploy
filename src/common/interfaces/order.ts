export type IPaymentMethod = 'cod' | 'vnpay'

export type IOrderStatus = 'pending' | 'waiting' | 'delivering' | 'done' | 'cancel'

export type IPaymentStatus = 'unpaid' | 'paid'

export interface IOrder {
    _id: string
    address: string
    codeOrders: string
    createdAt: Date
    orderStatus: IOrderStatus
    paymentMethod: IPaymentMethod
    paymentStatus: IPaymentStatus
    phone: number
    total_amount_paid: number
    total_price: number
    updatedAt: Date
    user_id: {
        email: string
        userName: string
        _id: string
    }
    productDetails: {
        image: string
        price: number
        productDetailId: string
        productId: string
        productName: string
        quantityOrders: number
        sizeId: string
        sizeName: string
    }[]
}
