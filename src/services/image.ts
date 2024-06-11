import { IImageUpload } from '@/common/interfaces/productDetail'
import instance from '@/core/api'

export const addImages = async (data: IImageUpload[]) => {
    try {
        const response = await instance.post(`api/image`, {
            images: data
        })

        console.log(response.data, ' da')
        return response.data
    } catch (error) {
        console.log(error)
    }
}
