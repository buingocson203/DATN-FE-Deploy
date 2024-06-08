import { IProductDetail } from '@/common/interfaces/productDetail'
import instance from '@/core/api'

export const addProductDetail = async (products: IProductDetail[]) => {
    try {
        const response = await instance.post(`api/productDetail/`, {
            productDetails: products
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}
