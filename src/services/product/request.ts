import instance from '@/core/api'
import { IProductDetail } from './types'

export const getNewProducts = async () => {
    const { data } = await instance({ url: '/api/product', method: 'GET', params: { limit: 8 } })
    return data.datas
}

export const getProductById = async (id: string) => {
    const { data } = await instance.get(`api/product/${id}`)
    return data.datas
}

export const getProductDetail = async (params: any): Promise<IProductDetail[]> => {
    const { data } = await instance.get(`api/productDetail`)
    return data.data
}

export const getProductDetailById = async (id: string): Promise<IProductDetail> => {
    const { data } = await instance.get(`api/productDetail/${id}`)
    return data.data?.[0] || {}
}