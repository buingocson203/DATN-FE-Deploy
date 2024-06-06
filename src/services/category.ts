import { ICategory } from '@/common/type'
import instance from '../core/api'
import { toast } from 'react-toastify'

export const getCategorys = async () => {
    try {
        const response = await instance.get('/api/categories')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(`['FETCHS_CATEGORYS_ERROR']`, error)
    }
}

export const getCategory = async (_id: string) => {
    try {
        const response = await instance.get(`/api/categories/${_id}`)   
        return response.data
    } catch (error) {
        console.log(`['FETCHS_CATEGORY_ERROR']`, error)
    }
}

export const addCategory = async (category: ICategory) => {
    try {
        const response = await instance.post('/api/categories', category)
        if (response.status === 200) {
            toast.success('Thêm thành công')
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 500) {
            toast.error('Danh mục đã tồn tại!')
        } else {
            console.log(`['ADD_CATEGORY_ERROR']`, error)
        }
    }
}


export const updateCategory = async ({_id,name, slug, ...category}: ICategory) => {
    console.log("data size: ", name)
    try {
        const response = await instance.put(`/api/categories/${_id}`, {name, slug})
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(`['UPDATE_SIZE_ERROR']`, error)
    }
}


export const deleteCategory = async (category: ICategory) => {
    try {
        await instance.delete(`/api/categories/${category._id}`)
    } catch (error) {
        console.log(`['DELETE_CATEGORYS_ERROR']`, error)
    }
}