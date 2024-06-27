import { IQueryParams } from '@/common/interfaces/common'
import { IProduct } from '@/common/type'
import instance from '../core/api'

export interface GetProductsResponse {
    datas: {
        docs: IProduct[]
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        nextPage: number
        page: number
        pagingCounter: number
        prevPage: number | null
        totalDocs: number
        totalPages: number
    }
}

export const getProducts = async (query?: IQueryParams): Promise<GetProductsResponse> => {
    const response = await instance.get('api/product', {
        params: query
    })
    const data = response.data
    return data
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
