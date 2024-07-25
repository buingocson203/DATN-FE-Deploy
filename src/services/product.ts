import { IProduct } from '@/common/type'
import instance from '../core/api'
import { cachedDataVersionTag } from 'v8'

export const getProducts = async () => {
    try {
        const response = await instance.get('/product')
        return response.data.datas.docs
    } catch (error) {
        console.log(`['FETCH_PRODUCTS_ERROR']`, error)
    }
}

export const getProduct = async (id: string) => {
    try {
        const response = await instance.get(`api/product/${id}`)
        return response.data.datas
    } catch (error) {
        console.log(`['FETCH_PRODUCTS_ERROR']`, error)
    }
}

export const updateProduct = async (id, product) => {
    const response = await instance.put(`api/product/${id}`, product)
    return response.data
}

export const addProduct = async (product: IAddProductBody): Promise<IAddProductResponse> => {
    const response = await instance.post(`api/product`, product)
    return response.data
}

export const deleteProduct = async (productId: string) => {
    try {
        const response = await instance.delete(`api/product/${productId}`)
        return response.data
    } catch (error) {
        console.log(`['DELETE_PRODUCTS_ERROR']`, error)
    }
}
