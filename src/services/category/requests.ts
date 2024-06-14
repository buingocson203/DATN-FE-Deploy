import instance from '@/core/api'
import { ICategory } from './types'

export const getAllCategory = async (): Promise<ICategory[]> => {
    const { data } = await instance.get('/api/categories')
    return data.data
}

export const getCategory = async (_id: string): Promise<ICategory> => {
    const { data } = await instance.get(`/api/categories/${_id}`)
    return data.data
}
