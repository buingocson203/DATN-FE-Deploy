import { getCategory, getCategorys } from '@/services/category'
import { useQuery } from 'react-query'

export const useCategoryQuery = (categoryId?: number | string) => {
    const { data, ...rest } = useQuery({
        queryKey: categoryId ? ['CATEGORY', categoryId] : ['CATEGORY'],
        queryFn: () => (categoryId ? getCategory(categoryId ? +categoryId : 0) : getCategorys())
    })
    return { data, ...rest }
}