import { sortAtoZ, sortDescending, sortUpAscending } from '@/common/FuctionHandle/arrange'
import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { filterProductByPrice, getAllProduct } from '@/services/product/queries'
import { getAllSize, getProductbySize } from '@/services/size/size.requeries'
import { IFProducts } from '@/types/product'
import { IFSize } from '@/types/size.type'
import { EyeIcon, FilterIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { SetStateAction, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface IFSlider {
    sliderVal: number
    setsliderVal: React.Dispatch<SetStateAction<number>>
    setListProduct: React.Dispatch<SetStateAction<IFProducts[]>>
}

const ProductsPage = () => {
    const [sliderVal, setsliderVal] = useState(1000000)
    const [listProduct, setListProduct] = useState<IFProducts[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 12

    useEffect(() => {
        getAllProduct().then((vals) => {
            setListProduct(vals)
        })
    }, [])

    const breadcrumb: IBreadCrumb[] = [
        {
            title: (listProduct && listProduct[0]?.nameCategory) || ''
        }
    ]

    const handArrangeProduct = async (nameArrange: string) => {
        if (nameArrange === "asc") {
            const data = sortUpAscending(listProduct);
            setListProduct(data);
        } else if (nameArrange === "desc") {
            const data = sortDescending(listProduct);
            setListProduct(data);
        } else {
            const data = sortAtoZ(listProduct);
            setListProduct(data);
        }

    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const renderItemProduct = (vals: IFProducts) => {
        const takeTwoImage = vals.images.slice(0, 2);
        return (
            <Link
                key={vals.productId}
                to={`/products/${vals.productId}`}
                className='cursor-pointer group'
            >
                <div className='pt-6 relative pb-3 overflow-hidden'>
                    <div className='relative rounded-md overflow-hidden'>
                        {takeTwoImage.map((itemImage, index) => <img
                            key={index}
                            className={`w-full h-[300px] ${index == 1 ? 'absolute top-0 left-0 right-0 bottom-0 object-cover opacity-0 group-hover:opacity-100 duration-500  transition-all' : ''}`}
                            src={itemImage.imageUrl}
                            alt='Ảnh không tồn tại'
                        />)}
                    </div>
                    <div className='absolute group-hover:bottom-4 transition-all group-hover:opacity-100 opacity-0 duration-500 -bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-2'>
                        <button
                            className='w-10 h-10 flex items-center justify-center text-neutral-950 bg-white hover:bg-neutral-950 hover:text-white outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none flex-1'
                            title='Xem nhanh'
                        >
                            <ShoppingCartIcon className='size-3 mr-2 text-xs' />
                            Thêm vào giỏ
                        </button>
                        <button
                            className='w-10 h-10 flex items-center justify-center border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none'
                            title='Xem nhanh'
                        >
                            <EyeIcon></EyeIcon>
                        </button>
                    </div>
                </div>
                <div>
                    <span className='text-xs'>+{vals.productDetails?.length || 0} kích thước</span>
                    <p className='text-md my-1'>{vals.nameProduct}</p>
                    <div className='flex items-center gap-2'>
                        <span className='text-red-500 font-semibold text-sm'>{vals.productDetails[0].promotionalPrice}đ</span>
                        <span className='text-neutral-300 text-sm line-through'>
                            {vals.productDetails[0].price}đ
                        </span>
                    </div>
                </div>
            </Link>
        )
    }

    // Tính toán chỉ số của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = listProduct.slice(indexOfFirstProduct, indexOfLastProduct)

    // Tính tổng số trang
    const totalPages = Math.ceil(listProduct.length / productsPerPage)

    return (
        <div className='pb-10'>
            <BreadCrumb links={breadcrumb} />
            <div className='app-container text-[#333] flex gap-10 pt-5'>
                <div className='w-[300px] h-20 md:block hidden'>
                    <FilerSection setsliderVal={setsliderVal} sliderVal={sliderVal} setListProduct={setListProduct} />
                </div>
                <div className='flex-1'>
                    <div className='flex md:items-center gap-3 flex-col md:flex-row'>
                        <div className='flex-1 flex items-center gap-3'>
                            <h1 className='text-2xl'>Tất cả sản phẩm</h1>
                            <p className='text-sm relative top-1 flex-1'>{listProduct?.length || 0} sản phẩm </p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='flex-1 md:hidden'>
                                <Sheet>
                                    <SheetTrigger>
                                        <button className='outline-none flex gap-2 items-center border border-neutral-200 py-2 px-4 rounded-md text-sm'>
                                            Bộ Lọc
                                            <FilterIcon size={16} />
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side={'left'}>
                                        <FilerSection
                                            setsliderVal={setsliderVal}
                                            sliderVal={sliderVal}
                                            setListProduct={setListProduct}
                                        />
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className='flex gap-3 items-center justify-center'>
                                <p className='text-base relative top-1 flex-1'>Sắp xếp theo</p>
                                <Select onValueChange={(e: any) => handArrangeProduct(e)}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Tên A-Z' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='name'>
                                            <div className='cursor-pointer hover:text-teal-900'>Tên A-Z</div>
                                        </SelectItem>
                                        <SelectItem value='asc'>
                                            <div className='cursor-pointer hover:text-teal-900'>Giá tăng dần</div>
                                        </SelectItem>
                                        <SelectItem value='desc'>
                                            <div className='cursor-pointer hover:text-teal-900'>Giá giảm dần</div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                        {listProduct?.map((product) => renderItemProduct(product))}
                    </div>
                    {listProduct && listProduct?.length < 1 && (
                        <div className='w-full h-[300px] flex justify-center items-center'>Không tìm thấy</div>
                    )}
                    <div className='flex justify-center mt-5'>
                        <button
                            className='px-3 py-1 border rounded mx-1 flex items-center'
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeftIcon className='w-4 h-4' />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 border rounded mx-1 ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className='px-3 py-1 border rounded mx-1 flex items-center'
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRightIcon className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FilerSection = ({ setsliderVal, sliderVal, setListProduct }: IFSlider) => {
    const [sizeShoe, setSizeShoe] = useState<IFSize[] | null>(null);
    const [currSizeShoe, setCurrSizeShoe] = useState<string | null>(null);

    const handleValueCommit = async (e: number[]) => {
        const data = await filterProductByPrice(currSizeShoe, 0, e[0]);
        setListProduct(data);
    }
    const handFilterSizeShoe = async (id: string) => {
        const data = await getProductbySize(id, 0, sliderVal);
        setCurrSizeShoe(id);
        setListProduct(data);
    }

    useEffect(() => {
        getAllSize().then((data) => {
            setSizeShoe(data)
        });
    }, [])

    return (
        <>
            <h1 className='text-2xl'>Bộ lọc</h1>
            <div>
                <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>Khoảng giá</AccordionTrigger>
                        <AccordionContent className='py-4'>
                            <Slider
                                defaultValue={[sliderVal]}
                                onValueChange={(e) => {
                                    setsliderVal(e[0])
                                }}
                                onValueCommit={handleValueCommit}
                                max={5000000}
                                step={1}
                                min={0}
                            />

                            <div className='mt-4 flex items-center justify-between'>
                                <span className='text-sm font-bold'>1.000.000 đ</span>
                                <span className='text-sm font-bold'>5.000.000 đ</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>Size</AccordionTrigger>
                        <AccordionContent className='flex flex-wrap gap-3'>
                            {sizeShoe && sizeShoe.map((itemSize) => (
                                <div
                                    onClick={() => handFilterSizeShoe(itemSize._id)}
                                    key={itemSize._id}
                                    className='flex items-center space-x-2 w-12 h-12 border rounded-md border-neutral-400 justify-center text-neutral-700 cursor-pointer hover:bg-neutral-700 hover:text-white'
                                >
                                    {itemSize.size}
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}
export default ProductsPage
