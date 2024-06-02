import { getCategory, getCategorys } from "@/services/category";
import { useQuery } from "react-query";


export const useCategoryQuery = (categoryId?: string) => {
    const { data, error, ...rest } = useQuery({
        
        
        queryKey: categoryId ? ['CATEGORY', categoryId] : ['CATEGORY'],
        queryFn: () => (categoryId ? getCategory(categoryId) : getCategorys()),
        refetchOnReconnect: true,
        onError: (err) => {
            console.error('Error fetching category data:', err);
        },
    });
    return { data, error, ...rest };
};