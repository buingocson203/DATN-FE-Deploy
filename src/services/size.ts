import { ISize } from '@/common/type'
import instance from '../core/api'
export const getSizes = async () => {
    try {
        const response = await instance.get('/api/variant')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(`['FETCHS_SIZES_ERROR']`, error)
    }
}

export const getSize = async (_id: string) => {
    try {
        const response = await instance.get(`/api/variant/${_id}`)
        return response.data.data
    } catch (error) {
        console.log(`['FETCHS_SIZE_ERROR']`, error)
    }
}

export const addSize = async (size: ISize) => {
    try {
        const response = await instance.post('/api/variant', size)
        return response.data
    } catch (error) {
        console.log(`['ADD_SIZE_ERROR']`, error)
    }
}

export const updateSize = async ({_id,size, slug, ...sizes}: ISize) => {
    console.log("data size: ", size)
    try {
        const response = await instance.put(`/api/variant/${_id}`, {size, slug})
        console.log(response.data)

        return response.data
    } catch (error) {
        console.log(`['UPDATE_SIZE_ERROR']`, error)
    }
}

export const deleteSize = async (size: ISize) => {
    try {
        await instance.delete(`/api/variant/${size._id}`)
    } catch (error) {
        console.log(`['DELETE_SIZES_ERROR']`, error)
    }
}
