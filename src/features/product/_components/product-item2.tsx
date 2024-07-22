import { IProduct } from '@/services/product/types'
import { EyeIcon, ShoppingCartIcon, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
    product: any[],
}
const formatCurrency = (amount: number | bigint) => {
    // Định dạng số thành tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Tối thiểu số lẻ là 0
    });

    return formatter.format(amount);
};
export default function ProductItem({ product }: Props) {
    const takeTwoImage = product.images.slice(0, 2);
    return (
        <Link to={`/products/${product && product.productId}`} className='cursor-pointer group' onClick={() => {
            setTimeout(() => {
                location.reload()
            }, 200)
        }}>
            <div className='pt-6 relative pb-3 overflow-hidden'>
                <div className='relative rounded-md overflow-hidden'>
                    {takeTwoImage.map((itemImage, index) => <img
                        className={`w-full h-[240px] ${index == 1 ? 'absolute top-0 left-0 right-0 bottom-0 object-cover opacity-0 group-hover:opacity-100 duration-500  transition-all' : ''}`}
                        src={itemImage.imageUrl}
                        alt='Ảnh không tồn tại'
                    />)}

                </div>
                {/* Another image show opacity when hover */}
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
                <span className='text-xs'>+{product && product.productDetails.length || 0} kích thước</span>
                <p className='text-md my-1'>{product && product.nameProduct}</p>
                <div className='flex items-center gap-1'>
                    <span className='text-red-500 text-sm'>{formatCurrency(product && product.productDetails[0].promotionalPrice)}</span>
                    <span className='text-neutral-300 text-xs line-through'>{formatCurrency(product && product.productDetails[0].price)}</span>
                </div>
            </div>
        </Link>
    )
}