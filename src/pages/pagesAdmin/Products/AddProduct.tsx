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

const AddProduct = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { form, onSubmit } = useProductMutation({
        action: 'ADD',
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
    console.log('field - ', fields)
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
            <h2 className='text-xl font-bold'>Them san pham</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                                    <Input  placeholder='Trang thai san pham' {...field} />
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

                    <Button type='submit'>Them</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddProduct

// import { Button, Form } from 'antd'
// import FormProduct from './FormProduct'

// const formItemLayout = {
//     labelCol: {
//         xs: { span: 24 },
//         sm: { span: 6 }
//     },
//     wrapperCol: {
//         xs: { span: 24 },
//         sm: { span: 14 }
//     }
// }

// const AddProduct = () => {
//     const onFinish = (values: any) => {
//         console.log('Form values:', values)
//     }

//     return (
//         <>
//             <div className='container'>
//                 <div className='title' style={{ fontSize: '25px', margin: '10px 0', fontWeight: '700' }}>
//                     <h2>Thêm mới sản phẩm</h2>
//                 </div>
//                 <div className='form'>
//                     <Form
//                         {...formItemLayout}
//                         variant='filled'
//                         onFinish={onFinish} // Set the onFinish callback
//                     >
//                         <div
//                             className='div'
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 padding: '0 5%'
//                             }}
//                         >
//                             <div className='form_left'>
//                                 <FormProduct />
//                             </div>
//                             <div className='form_right'></div>
//                         </div>

//                         <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ margin: '0 auto' }}>
//                             <Button type='primary' htmlType='submit'>
//                                 Thêm
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AddProduct
