import { addProduct, deleteProduct, updateProduct } from '@/services/product'
import { IProduct } from '@/common/type' 
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type formControlDataType = {
    _id: string
    name: string
    image: string
    price: number
    categoryId: string
    sizeId: string[]
    priceSale: number
    color: string
    description: string
}

const formSchema = Joi.object({
    name: Joi.string().min(6).max(50),
    image: Joi.string().min(1).required(),
    price: Joi.number().required().min(0),
    categoryId: Joi.string().required(),
    sizeId: Joi.array().items(Joi.string().required()).required(),
    priceSale: Joi.number(),
    color: Joi.string().required(),
    description: Joi.string().required()
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IProduct
    onSuccess?: () => void
}

export const useProductMutation = ({
    action,
    defaultValues = { name: '', price: 0 },
    onSuccess
}: useProductMutationProps) => {
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: IProduct) => {
            switch (action) {
                case 'ADD':
                    return await addProduct(product)
                case 'UPDATE':
                    return await updateProduct(product)
                case 'DELETE':
                    return await deleteProduct(product)
                default:
                    return null
            }
        },
        onSuccess: () => {
            onSuccess && onSuccess()
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT']
            })
        }
    })
    const form = useForm({
        resolver: joiResolver(formSchema),
        defaultValues
    })
    const onSubmit: SubmitHandler<formControlDataType> = (values) => {
        console.log(values)
        mutate(values)
    }
    const onRemove = (product: IProduct) => {
        mutate(product)
    }
    return {
        form,
        onSubmit,
        onRemove,
        ...rest
    }
}
