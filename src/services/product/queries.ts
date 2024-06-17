import { useQuery } from 'react-query'
import { getProductDetailById } from './request'
import instance from '@/core/api'
import { IFProducts } from '@/types/product'

export const useProductDetail = async (productId: string, options?: any) => {
    return useQuery({ queryFn: getProductDetailById(productId), queryKey: ['/productDetail', productId], ...options })
}
export const getAllProduct = async (): Promise<IFProducts[]> => {
    const { data } = await instance.get('/api/infoProduct')
    return data.data
}
export const filterProductByPrice = async (min: number = 0, max: number = 200): Promise<IFProducts[]> => {
    const { data } = await instance.get(`/api/infoProduct?minPrice=${min}&maxPrice=${max}`)
    return data.data
}

export const arrangeProduct = async (name: string): Promise<IFProducts[]> => {
    const { data } = await instance.get(`/api/infoProduct?sort=${name}`)
    return data.data
}

export const filerProductByPrice = async (size: number): Promise<IFProducts[]> => {
    const { data } = await instance.get(`/api/infoProduct?size=${size}`)
    return data.data
}
