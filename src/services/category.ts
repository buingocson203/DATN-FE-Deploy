import { ICategory } from '@/common/type'
import instance from '../core/api'

export const getCategorys = async () => {
    try {
        const response = await instance.get('/api/categories')
        console.log(response.data)
        return response.data.payload
    } catch (error) {
        console.log(`['FETCHS_CATEGORYS_ERROR']`, error)
    }
}

export const getCategory = async (id: number) => {
    try {
        const response = await instance.get(`/api/categories/6554d04c9c38348cac99f965${id}`)
        return response.data
    } catch (error) {
        console.log(`['FETCHS_CATEGORY_ERROR']`, error)
    }
}

export const addCategory = async (category: ICategory) => {
    try {
        const response = await instance.post('/admin/category/create', category)
        return response.data
    } catch (error) {
        console.log(`['ADD_CATEGORY_ERROR']`, error)
    }
}

export const updateCategory = async (category: ICategory) => {
    console.log(category)
    try {
        const response = await instance.put(`/api/categories/6554d0939c38348cac99f968${category?.payload?._id}`, category.payload)
        console.log(response.data)

        return response.data.payload
    } catch (error) {
        console.log(`['UPDATE_CATEGORY_ERROR']`, error)
    }
}

export const deleteCategory = async (category: ICategory) => {
    try {
        await instance.delete(`/api/categories/6554d0939c38348cac99f968${category._id}`)
    } catch (error) {
        console.log(`['DELETE_CATEGORYS_ERROR']`, error)
    }
}