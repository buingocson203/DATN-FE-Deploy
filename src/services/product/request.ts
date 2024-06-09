import instance from '@/core/api'
import { IProductDetail } from './types'

export const getProductDetail = async (params: any): Promise<IProductDetail[]> => {
    const { data } = await instance.get(`api/productDetail`)
    return data.data
}
