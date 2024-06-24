import { IInfoProduct } from '@/common/interfaces/infoProduct'
import { IReview } from '@/common/interfaces/review'
import instance from '@/core/api'

export const getReviews = async (productId: string) => {
    const response = await instance.get(`api/review/reviews/${productId}/list-review`)
    const data = response.data
    return data
}

export const getReview = async (reviewId: string) => {
    const response = await instance.get(`api/review/reviews/${reviewId}`)
    const data = response.data
    return data
}
