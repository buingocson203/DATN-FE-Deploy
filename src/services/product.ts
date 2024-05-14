
import { IProduct } from "@/common/type"
import instance from "../core/api"

export const getProducts = async () => {
    try {
        const response = await instance.get('/products')
        return response.data
    } catch (error) {
        console.log(`['FETCH_PRODUCTS_ERROR']`, error)
    }
}

export const getProduct = async (id: number) => {
    try {
        const response = await instance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log(`['FETCH_PRODUCTS_ERROR']`, error)
    }
}

export const updateProduct = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/${product.id}`, product)
        return response.data
    } catch (error) {
        console.log(`['UPDATE_PRODUCTS_ERROR']`, error)
    }
}

export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products/`, product)
        return response.data
    } catch (error) {
        console.log(`['ADD_PRODUCTS_ERROR']`, error)
    }
}

export const deleteProduct = async (product: IProduct) => {
    try {
        await instance.delete(`/products/${product.id}`)
    } catch (error) {
        console.log(`['DELETE_PRODUCTS_ERROR']`, error)
    }
}