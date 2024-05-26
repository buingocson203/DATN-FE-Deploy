
import { useProductQuery } from '@/hooks/useProductQuery'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductMutation } from '@/hooks/useProductMutation'
import { useToast } from '../../../components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select-category'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import React, { useEffect } from 'react'
import instance from '@/core/api'
type Props = {}

const EditProduct = (props: Props) => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const { data } = useProductQuery(productId)
    console.log('data - ', data)


    const { toast } = useToast()
    const { form, onSubmit } = useProductMutation({
        action: 'UPDATE',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chuc mung thanh nien',
                description: 'Them san pham thanh cong'
            })
            form.reset();
            navigate('/admin/products')
        }
    })
    useEffect(() => {
        if (data && form) {
            form.reset({
                name: data?.name || '',
                description: data?.description || '',
                price: data?.price || 0,
                image: data?.image || '',
                color: data?.color || '',
                priceSale: data?.priceSale || 0,
                categoryId: data?.categoryId?._id || '',
                sizeId: data?.sizeId.map((item: any) => item._id)
            })
        }
    }, [data, form])
    console.log('form - ', form.getValues())
    const [sizes, setSizes] = React.useState<{ _id: string, size: string }[]>([])
    React.useEffect(() => {
        ; (async () => {
            try {
                const response = await instance.get('/variant')
                setSizes(response.data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div className='border p-6'>
            <h2 className='text-xl font-bold'>Sua san pham</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(
                        (value) => {
                            if (value.priceSale >= value.price) {
                                toast({
                                    variant: 'destructive',
                                    title: 'Chuc mung thanh nien',
                                    description: 'Gia khuyen mai khong duoc lon hon hoac bang gia goc'
                                })
                            } else {
                                onSubmit({ _id: data?._id, ...value })
                            }
                        }
                    )}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Ten San Pham</FormLabel>
                                <FormControl>
                                    <Input placeholder='Ten san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Mo ta San Pham</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Mo ta san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Danh muc</FormLabel>
                                <FormControl>
                                    <Select {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <div>
                        <FormLabel className='font-bold block'>Kich thuoc</FormLabel>
                        <div className='flex items-center gap-10 mt-2'>
                            {sizes.map((item) => (
                                <label key={item._id} className='block'>
                                    <input type='checkbox' value={item._id} {...form.register('sizeId')} />
                                    {item.size}
                                </label>
                            ))}
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Hinh anh</FormLabel>
                                <FormControl>
                                    <Input placeholder='Hinh anh san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='color'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Mau sac</FormLabel>
                                <FormControl>
                                    <Input placeholder='Mau sac san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Gia San Pham</FormLabel>
                                <FormControl>
                                    <Input placeholder='Gia san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='priceSale'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Gia khuyen mai San Pham</FormLabel>
                                <FormControl>
                                    <Input placeholder='Gia khuyen mai san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <Button type='submit'>Sua san pham</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditProduct
