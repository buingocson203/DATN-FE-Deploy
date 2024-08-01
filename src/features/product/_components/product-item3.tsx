import { IProduct } from '@/services/product/types';
import { EyeIcon, ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductDetailModal from './ProductDetailModal';

type Props = {
    product: IProduct,
};

export default function ProductItem({ product }: Props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const takeTwoImage = product.images.slice(0, 2);

    const formatCurrency = (amount: number | bigint) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        });

        return formatter.format(amount);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('blur-background');
        } else {
            document.body.classList.remove('blur-background');
        }

        return () => {
            document.body.classList.remove('blur-background');
        };
    }, [isModalOpen]);

    return (
        <>
            <div className={`cursor-pointer group`}>
                <div className='pt-6 relative pb-3 overflow-hidden'>
                    <div className='relative rounded-md overflow-hidden'>
                        <Link to={`/products/${product.productId}`} onClick={() => {
                            setTimeout(() => {
                                location.reload()
                            }, 200)
                        }}>
                            {takeTwoImage.map((itemImage, index) => (
                                <img
                                    key={index}
                                    className={`w-full h-[240px] ${index === 1 ? 'absolute top-0 left-0 right-0 bottom-0 object-cover opacity-0 group-hover:opacity-100 duration-500 transition-all' : ''}`}
                                    src={itemImage.imageUrl}
                                    alt='Ảnh không tồn tại'
                                />
                            ))}
                        </Link>
                    </div>
                    <div className='absolute group-hover:bottom-4 transition-all group-hover:opacity-100 opacity-0 duration-500 -bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-2'>
                        <button
                            className='w-10 h-10 flex items-center justify-center text-neutral-950 bg-white hover:bg-neutral-950 hover:text-white outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none flex-1'
                            title='Thêm vào giỏ'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation(); // Ngăn chặn sự kiện click tiếp tục lên các phần tử cha
                                console.log('Thêm vào giỏ sản phẩm ID:', product.productId);
                                setModalOpen(true);
                            }}
                        >
                            <ShoppingCartIcon className='size-3 mr-2 text-xs' />
                            Thêm vào giỏ
                        </button>
                        <Link to={`/products/${product.productId}`} className='w-10 h-10 flex items-center justify-center border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none ' onClick={() => {
                            setTimeout(() => {
                                location.reload()
                            }, 200)
                        }}>
                            <EyeIcon />
                        </Link>
                    </div>
                </div>
                <div className='p-2'>
                    <Link to={`/products/${product.productId}`} onClick={() => {
                        setTimeout(() => {
                            location.reload()
                        }, 200)
                    }}>
                        <p className='text-md my-1'>{product.nameProduct}</p>
                        <div className='flex items-center gap-1'>
                            <span className='text-red-500 text-sm'>{formatCurrency(product.productDetails[0].promotionalPrice)}</span>
                            <span className='text-neutral-300 text-xs line-through'>{formatCurrency(product.productDetails[0].price)}</span>
                        </div>
                    </Link>
                </div>
            </div>
            <ProductDetailModal
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
                productId={product.productId}
            />
        </>
    );
}
