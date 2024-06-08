import { useProductMutation } from '@/hooks/useProductMutation'
import { useToast } from '../../../components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select-category'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import React from 'react'
import instance from '@/core/api'
import { useNavigate } from 'react-router-dom'
import { useFieldArray } from 'react-hook-form'

const ThemSanPham = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { form, onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess: () => {
            toast({
                variant: 'success',
                title: 'Chúc mừng',
                description: 'Thêm sản phẩm thành công'
            })
            form.reset()
            navigate('/admin/products')
        }
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'IdImages'
    })
    console.log('fields - ', fields)
    console.log('form - ', form.getValues())
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
            <h2 className='text-xl font-bold'>Thêm sản phẩm</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5 gap-5 grid grid-cols-2'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Tên Sản Phẩm</FormLabel>
                                <FormControl>
                                    <Input placeholder='Tên sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Mô tả Sản Phẩm</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='Mô tả sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='categoryId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Danh mục</FormLabel>
                                <FormControl>
                                    <Select {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <div>
                        <FormLabel className='font-bold block'>Kích thước</FormLabel>
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
                                <FormLabel className='font-bold'>Hình ảnh</FormLabel>
                                <FormControl>
                                    <Input placeholder='Hình ảnh sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    {/* <FormField
                        control={form.control}
                        name='color'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Màu sắc</FormLabel>
                                <FormControl>
                                    <Input placeholder='Màu sắc sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField> */}
                    <FormField
                        control={form.control}
                        name='price'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Giá Sản Phẩm</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Giá sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='importPrice'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Giá Sản Phẩm nhập khẩu</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Giá sản phẩm nhập khẩu' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='promotionalPrice'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Giá Sản Phẩm khuyến mãi</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Giá sản phẩm khuyến mãi' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='quanity'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Số lượng sản phẩm</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Số lượng sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='font-bold'>Trạng thái sản phẩm</FormLabel>
                                <FormControl>
                                    <Input placeholder='Trạng thái sản phẩm' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <FormItem>
                        <div className='flex items-center'>
                            <FormLabel className='font-bold'>Danh sách hình ảnh</FormLabel>{' '}
                            <button
                                type='button'
                                onClick={() => append('')}
                                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-10'
                            >
                                Thêm
                            </button>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className='flex items-center'>
                                <input
                                    {...form.register(`IdImages.${index}`)}
                                    className='flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-black outline-none'
                                />
                                <button
                                    type='button'
                                    onClick={() => remove(index)}
                                    className='inline-flex items-center justify-center bg-red-500 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-red-400 h-10 px-4 py-2 ml-5'
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </FormItem>

                    <Button type='submit'>Thêm</Button>
                </form>
            </Form>
        </div>
    )
}

export default ThemSanPham
