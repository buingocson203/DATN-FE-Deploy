import React, { useEffect, useState } from 'react'

import { IImageUpload, IProductDetail } from '@/common/interfaces/productDetail'
import { ISize } from '@/common/interfaces/size'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select-category'
import { SelectProductDetailStatus } from '@/components/ui/select-product-detail-status'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useProductMutation } from '@/hooks/useProductMutation'
import { addImages } from '@/services/image'
import { addProductDetail } from '@/services/productDetail'
import { getSizes } from '@/services/size'

import ModalAddProductDetailVariant from './ModalAddProductDetailVariant'
import ModalUploadImages from './ModalUploadImages'

const AddProduct = () => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [openModalUpload, setOpenModalUpload] = useState(false)
    const [productId, setProductId] = useState<string>()
    const { form, onSubmit } = useProductMutation({
        action: 'ADD',
        onSuccess: (res) => {
            toast({
                variant: 'success',
                title: 'Thông báo',
                description: 'Thêm sản phẩm thành công'
            })
            const productElement = res.datas
            console.log(productElement._id)
            setProductId(productElement._id)
            setOpenModalUpload(true)
        }
    })

    const [sizes, setSizes] = React.useState<ISize[]>([])

    const fetchSizes = async () => {
        const res = await getSizes()
        const result = res.data
        setSizes(result)
    }

    const handleCreateDetail = async (data: IProductDetail[]) => {
        const newData = data.map((e) => {
            return {
                ...e,
                product: productId
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

    const handleUploadImage = async (data: IImageUpload[]) => {
        const res = await addImages(data)

        if (res?.message) {
            toast({
                variant: 'success',
                title: 'Thông báo',
                description: res.message
            })

            setOpenModalUpload(false)
            setOpen(true)
        }
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

    const renderFormAddProductDetail = () => {
        return <>{open && <ModalAddProductDetailVariant onOk={handleCreateDetail} open={open} sizes={sizes} />}</>
    }

    const renderModalUploadImages = () => {
        return (
            <>
                {openModalUpload && productId && (
                    <ModalUploadImages onOk={handleUploadImage} open={openModalUpload} productId={productId} />
                )}
            </>
        )
    }

    return (
        <div className='border p-6'>
            {renderFormAddProduct()}
            {renderFormAddProductDetail()}
            {renderModalUploadImages()}
        </div>
    )
}

export default AddProduct
