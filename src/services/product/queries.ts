import { useQuery, UseQueryOptions } from "react-query"
import { getProductDetailById } from "./request"

export const useProductDetail = async (productId: string, options?: any) => {
    return useQuery({ queryFn: getProductDetailById(productId), queryKey: ['/productDetail', productId], ...options })
}