import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, Button } from "@material-tailwind/react";
import { getInfoProductById } from '@/services/product/request';
import { IProduct, IProductSize } from '@/services/product/types';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import instance from '@/core/api';
import { cn, onMutateError } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';
import { useQuery } from 'react-query';
import { useProductFavoriteMutation, useProductFavoriteQuery } from '@/hooks/useProductFavorite';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carosel';

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, productId }) => {
    const { data: favoriteProduct, refetch } = useProductFavoriteQuery();
    const { mutate: onFavorite } = useProductFavoriteMutation({
        action: 'ADD',
        onSuccess: () => {
            message.success('Đã thêm SP vào danh sách yêu thích');
            refetch();
        }
    });
    const { mutate: onRemoveFavorite } = useProductFavoriteMutation({
        action: 'DELETE',
        onSuccess: () => {
            message.success('Đã xoá SP khỏi danh sách yêu thích');
            refetch();
        }
    });

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState<IProductSize | undefined>();
    const [modalIsOpen, setModalIsOpen] = useState(isOpen);

    const isFavorite = useMemo(() => {
        return favoriteProduct?.data.find((it) => it.productId === productId);
    }, [productId, favoriteProduct?.data]);

    const onToggleFavorite = () => {
        if (!getUserID()) {
            message.info('Vui lòng đăng nhập tài khoản!');
            return;
        }

        if (isFavorite) {
            onRemoveFavorite(productId);
        } else {
            onFavorite(productId);
        }
    };

    const { data: infoProduct, refetch: refetchProductDetail } = useQuery({
        queryFn: () => getInfoProductById(String(productId)),
        enabled: !!productId,
        onError: onMutateError
    });

    useEffect(() => {
        setModalIsOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            if (modalIsOpen) {
                mainContent.classList.add('blur-background', 'active');
            } else {
                mainContent.classList.remove('blur-background', 'active');
            }
        }
        return () => {
            if (mainContent) {
                mainContent.classList.remove('blur-background', 'active');
            }
        };
    }, [modalIsOpen]);

    const getUserID = () => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : {};
        const userID = user?._id || '';
        return userID;
    };

    const addToCart = (quantity: number) => {
        const fetchData = async (dataX: any) => {
            try {
                await instance.post(`api/cart`, dataX);
                variant?.productDetailId && dispatch(cartActions.addToCart(variant?.productDetailId));
                alert('Thêm sản phẩm vào giỏ hàng thành công');
            } catch (error) {
                console.log(error);
                alert('Số lượng yêu cầu vượt quá số lượng trong kho');
            }
        };
        fetchData({
            idUser: getUserID(),
            productDetailId: variant?.productDetailId,
            quantity: quantity
        });
    };

    useEffect(() => {
        if (!infoProduct) return;
        for (let index = 0; index < infoProduct?.data?.productDetails.length; index++) {
            const element = infoProduct?.data?.productDetails[index];
            if (element.quantity > 0) {
                setVariant(element);
                break;
            }
        }
    }, [infoProduct]);

    return (
        <Dialog open={isOpen} handler={onClose} className="relative z-40 max-w-4xl mx-auto">
            <div className='flex flex-col md:flex-row'>
                <div
                    onClick={onClose}
                    className='cursor-pointer absolute top-4 right-4 text-2xl'
                >
                    <XIcon />
                </div>
                <div className='flex-1 img-product-container relative group'>
                    <Carousel>
                        <CarouselContent>
                            {infoProduct?.data?.images?.map((image, index) => (
                                <CarouselItem key={index}>
                                    <img src={image.imageUrl} alt='product' />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    <div
                        onClick={onToggleFavorite}
                        className='cursor-pointer absolute top-4 right-16 inline-block h-auto text-2xl opacity-0 group-hover:opacity-100 transition'
                    >
                        {isFavorite ? <HeartFilled className='text-red-500' /> : <HeartOutlined />}
                    </div>
                </div>
                <div className='w-full md:w-[60%] py-5 px-3 border-l border-neutral-200 flex flex-col lg:flex-row gap-5'>
                    <div className='flex-1'>
                        <h1 className='text-2xl font-semibold'>{infoProduct?.data?.nameProduct}</h1>
                        <div className='mt-1 mb-5 text-sm'>
                            <span>Tình trạng: {variant?.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</span>
                            <span className='mx-2 text-neutral-200'>|</span>
                            <span>Thương hiệu: {infoProduct?.data?.nameCategory}</span>
                        </div>
                        <div className='p-4 bg-neutral-50 rounded-md flex items-center'>
                            <span className='w-[120px]'>Giá:</span>
                            <span className='text-red-500 font-medium text-xl mr-2'>
                                {variant?.promotionalPrice.toLocaleString() || 0}₫
                            </span>
                            <span className='line-through text-neutral-500 mr-4'>{variant?.price.toLocaleString() || 0}₫</span>
                        </div>
                        <div className='flex items-center justify-center mt-5'>
                            <span className='w-[120px]'>Kích thước:</span>
                            <div className='flex-1 flex flex-wrap gap-2'>
                                {infoProduct?.data &&
                                    infoProduct?.data?.productDetails &&
                                    infoProduct?.data?.productDetails
                                        ?.filter(
                                            (size: any, index: any, self: any) =>
                                                index === self.findIndex((t) => t.size === size.size)
                                        )
                                        .sort((a, b) => a.size - b.size)
                                        .map((size, index) => (
                                            <span
                                                className={cn(
                                                    'inline-block bg-neutral-50 px-5 text-sm py-2 rounded-md cursor-pointer border border-neutral-300 relative',
                                                    variant?.sizeId === size.sizeId && 'item-sale',
                                                    size.quantity === 0 && 'size-disabled'
                                                )}
                                                key={index}
                                                onClick={() => {
                                                    if (size.quantity > 0) {
                                                        setVariant(size);
                                                    }
                                                }}
                                            >
                                                {size.size}
                                            </span>
                                        ))}

                                {!infoProduct?.data?.productDetails && (
                                    <p className='text-sm text-sky-500 font-semibold'>
                                        Chưa có thông tin kích thước cho sản phẩm này!
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='flex items-center mt-5'>
                            <span className='w-[120px]'>Số lượng:</span>
                            <div className='flex'>
                                <div
                                    className='w-10 h-10 group border border-neutral-200 bg-neutral-100 cursor-pointer flex items-center justify-center'
                                    onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}
                                >
                                    <MinusIcon className='size-10 text-neutral-400 group-hover:text-neutral-800' />
                                </div>
                                <input
                                    type='number'
                                    value={quantity}
                                    id='quantity-detail'
                                    min={1}
                                    max={variant?.quantity || 1}
                                    className='w-16 text-center text-sm border-t border-b border-neutral-300 outline-none'
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value, 10);
                                        if (value >= 1 && value <= (variant?.quantity || 1)) {
                                            setQuantity(value);
                                        }
                                        if (value > (variant?.quantity || 1)) {
                                            alert('Không được vượt quá số lượng sản phẩm đang có');
                                        }
                                    }}
                                />
                                <div
                                    className='w-10 h-10 group border border-neutral-200 bg-neutral-100 cursor-pointer flex items-center justify-center'
                                    onClick={() =>
                                        setQuantity((prev) => {
                                            if (prev < variant?.quantity) {
                                                return prev + 1;
                                            }
                                            alert('Không được vượt quá số lượng sản phẩm đang có');
                                            return prev;
                                        })
                                    }
                                >
                                    <PlusIcon className='text-sm size-5 text-neutral-400 group-hover:text-neutral-800' />
                                </div>
                            </div>
                            <p className='text-red-500 ml-5'>Còn {variant?.quantity || 0} sản phẩm</p>
                        </div>
                        <div className='grid grid-cols-2 gap-x-4 mt-5'>
                            <button
                                onClick={() => addToCart(quantity)}
                                className='px-7 py-3 border border-red-500 text-red-500 bg-white outline-none hover:bg-red-500 hover:text-white transition-all rounded-md w-full'
                            >
                                THÊM VÀO GIỎ
                            </button>
                            {/* <Link
                                to={`/checkout-now/${variant?.productDetailId}?sizeId=${variant?.sizeId}&quantity=${quantity}`}
                            >
                                <button className='px-7 py-3 border border-red-500 text-white bg-red-500 outline-none hover:opacity-90 transition-all rounded-md w-full'>
                                    MUA NGAY
                                </button>
                            </Link> */}
                        </div>
                        <div className='flex items-center justify-center mt-5 gap-2'>
                            <p className='px-6 py-2 text-gray-700 transition-all w-full text-sm italic '>
                                * Bạn sẽ nhận được 1 đôi tất và 1 bình vệ sinh giày sau khi đặt hàng thành công
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ProductDetailModal;