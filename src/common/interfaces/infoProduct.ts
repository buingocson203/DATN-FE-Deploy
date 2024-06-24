import { IImageType } from './common'
import { IProductDetail } from './productDetail'

export interface IInfoProduct {
    nameProduct: string
    productId: string
    categoryId: string
    nameCategory: string
    descript: string
    images: { imageUrl: string; type: IImageType }[]
    productDetails: Array<
        Omit<IProductDetail, '_id'> & {
            productDetailID: string
        }
    >
}
