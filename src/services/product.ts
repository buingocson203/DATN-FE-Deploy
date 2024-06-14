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

export const updateProduct = async ({ _id, ...product }: IProduct) => {
    try {
        console.log('ok')
        const response = await instance.put(`api/product/${_id}`, product)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_PRODUCTS_ERROR']`, error)
    }
}

export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`api/product/`, product)
        return response.data
    } catch (error) {
        console.log(`['ADD_PRODUCTS_ERROR']`, error)
    }
}

export const deleteProduct = async (product: IProduct) => {
    try {
        await instance.delete(`api/product/${product._id}`)
    } catch (error) {
        console.log(`['DELETE_PRODUCTS_ERROR']`, error)
    }
}
