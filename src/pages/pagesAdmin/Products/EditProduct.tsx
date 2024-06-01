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
import { useFieldArray } from 'react-hook-form'
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
            form.reset()
            navigate('/admin/products')
        }
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'IdImages'
    })
    useEffect(() => {
        if (data && form) {
            form.reset({
                name: data?.name || '',
                description: data?.description || '',
                price: data?.price || 0,
                image: data?.image || '',
                color: data?.color || '',
                categoryId: data?.categoryId?._id || '',
                sizeId: data?.sizeId.map((item: any) => item._id),
                promotionalPrice: data?.promotionalPrice || 0,
                importPrice: data?.importPrice || 0,
                quanity: data?.quanity || 0,
                status: data?.status || '',
                IdImages: data?.IdImages || []
            })
        }
    }, [data, form])
    console.log('form - ', form.getValues())
    console.log('error - ', form.formState.errors)
    const [sizes, setSizes] = React.useState<{ _id: string; size: string }[]>([])
    React.useEffect(() => {
        ;(async () => {
            try {
                const response = await instance.get('api/variant')
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
                    onSubmit={form.handleSubmit((value) => {
                        console.log('value - ', value)
                        if (value.promotionalPrice >= value.price) {
                            toast({
                                variant: 'destructive',
                                title: 'Chuc mung thanh nien',
                                description: 'Gia khuyen mai khong duoc lon hon hoac bang gia goc'
                            })
                        } else {
                            onSubmit({ _id: data?._id, ...value })
                        }
                    })}
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
                                    <Input type='number' placeholder='Gia san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='importPrice'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Gia San Pham nhap khau</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Gia san pham nhap khau' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='promotionalPrice'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Gia San Pham khuyen mai</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Gia san phamkhuyen mai' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='quanity'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>So luong san pham</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='So luong san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Trang thai san pham</FormLabel>
                                <FormControl>
                                    <Input placeholder='Trang thai san pham' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormItem>
                        <div className='flex items-center'>
                            <FormLabel className='font-bold'>Danh sach hinh anh</FormLabel>{' '}
                            <button
                                type='button'
                                onClick={() => append('')}
                                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-10'
                            >
                                Add
                            </button>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className='flex items-center'>
                                <input
                                    {...form.register(`IdImages.${index}`)}
                                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                />
                                <button
                                    type='button'
                                    onClick={() => remove(index)}
                                    className='inline-flex items-center justify-center bg-red-500 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-red-400 h-10 px-4 py-2 ml-5'
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </FormItem>
                    <Button type='submit'>Sua san pham</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditProduct
