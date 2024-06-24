import { addProduct, deleteProduct, updateProduct } from '@/services/product'
import { IProduct } from '@/common/type'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

type formControlDataType = {
    _id: string
    name: string
    // image: string
    // price: number
    categoryId: string
    // sizeId: string[]
    // color: string
    description: string
    // importPrice: number
    // promotionalPrice: number
    // IdImages: string[]
    // quanity: string
    status: string
}

const formSchema = Joi.object({
    name: Joi.string().min(6).max(50),
    // image: Joi.string().min(1).required(),
    // price: Joi.number().required().min(0),
    categoryId: Joi.string().required(),
    // sizeId: Joi.array().items(Joi.string().required()).required(),
    // color: Joi.string().required(),
    description: Joi.string().required(),
    // importPrice: Joi.number().required().min(0),
    // import { message } from 'antd';
    // promotionalPrice: Joi.number().required().min(0),
    // IdImages: Joi.array().items(Joi.string().required()).required(),
    // quanity: Joi.number().required().min(0),
    status: Joi.string().required()
})

type useProductMutationProps = {
    action: 'ADD' | 'UPDATE' | 'DELETE'
    defaultValues?: IProduct
    onSuccess?: (data: { datas: IProduct }) => void
}

export const useProductMutation = ({
    action,
    defaultValues = { name: '', description: '', categoryId: '', status: '' },
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
        onSuccess: (data) => {
            console.log('dsf')
            onSuccess && onSuccess(data)
            queryClient.invalidateQueries({
                queryKey: ['PRODUCT']
            })
        },
        onError: () => {
            console.log('error')
        }
    })

    const form = useForm({
        resolver: joiResolver(formSchema),
        defaultValues
    })

    const onSubmit: SubmitHandler<formControlDataType> = (values) => {
        console.log('vo')
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
