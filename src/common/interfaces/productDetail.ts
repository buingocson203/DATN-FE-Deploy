import { IImageType } from './common'

export interface IProductDetail {
    _id?: string
    quantity: number
    price: number
    importPrice: number
    promotionalPrice: number
    product: string
    sizes: string
}

export interface IImageUpload {
    image: string
    type: IImageType
    productId: string
}
