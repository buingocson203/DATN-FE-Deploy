import instance from '@/core/api'

export const getNewProducts = async () => {
    const { data } = await instance({ url: '/api/product', method: 'GET', params: { limit: 8 } })
    return data.datas
}

export const getProductById = async (id: string) => {
    const { data } = await instance.get(`api/product/${id}`)
    return data.datas
}
