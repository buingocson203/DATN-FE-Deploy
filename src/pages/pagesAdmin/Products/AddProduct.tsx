import { useProductMutation } from '@/hooks/useProductMutation'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Select } from '../../../components/ui/select-category'
import { Textarea } from '../../../components/ui/textarea'
import { useToast } from '../../../components/ui/use-toast'

import { IProductDetail } from '@/common/interfaces/productDetail'
import { ISize } from '@/common/interfaces/size'
import { addProductDetail } from '@/services/productDetail'
import { getSizes } from '@/services/size'
import ModalAddProductDetailVariant from './ModalAddProductDetailVariant'
import { SelectProductDetailStatus } from '@/components/ui/select-product-detail-status'

const AddProduct = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState<string>()
    const { form, onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess: (res) => {
            toast({
                variant: 'success',
                title: 'Thông báo',
                description: 'Thêm sản phẩm thành công'
            })
            setOpen(true)
            const productElement = res.datas
            setProduct(productElement._id)
            // form.reset()
            // navigate('/admin/products')
        }
    })

    console.log(form.getValues())

    const [sizes, setSizes] = React.useState<ISize[]>([])

    const fetchSizes = async () => {
        const res = await getSizes()
        const result = res.data
        setSizes(result)
    }

    useEffect(() => {
        fetchSizes()
    }, [])

    const renderFormAddProduct = () => {
        return (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Tên sản phẩm</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Tên sản phẩm' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Mô tả sản phẩm</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Mô tả sản phẩm' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

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
                        />

                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-bold'>Trạng thái</FormLabel>
                                    <FormControl>
                                        <SelectProductDetailStatus {...field} />
                                        {/* <Input placeholder='Trạng thái' {...field} /> */}
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type='submit'>Thêm</Button>
                    </form>
                </Form>
            </>
        )
    }

    const handleOk = async (data: IProductDetail[]) => {
        const newData = data.map((e) => {
            return {
                ...e,
                product: product
            }
        }) as IProductDetail[]

        const res = await addProductDetail(newData)

        if (res?.message) {
            toast({
                variant: 'success',
                title: 'Thông báo',
                description: res.message
            })

            setOpen(false)
            form.reset()
        }
    }

    const renderFormAddProductDetail = () => {
        return (
            <>
                {open && (
                    <ModalAddProductDetailVariant
                        onOk={(data) => {
                            handleOk(data)
                        }}
                        open={open}
                        sizes={sizes}
                    />
                )}
            </>
        )
    }

    return (
        <div className='border p-6'>
            {renderFormAddProduct()}
            {renderFormAddProductDetail()}
        </div>
    )
}

export default AddProduct
