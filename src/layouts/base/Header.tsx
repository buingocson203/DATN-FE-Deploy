import { useState, useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, Bell, ChevronDownIcon, ChevronRightIcon, MenuIcon, SearchIcon, ShoppingBagIcon, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import instance from '@/core/api'
import { useLocalStorage } from '@/hooks/useStorage'
import { updateAllCartQuantityStore } from '../../store/actions.js'
import logo from '../../assets/1-01.png'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getAllCategory } from '@/services/category/requests'
import debounce from 'lodash.debounce' // Import debounce from lodash

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
    productId: string;
    nameProduct: string;
    images: { imageUrl: string }[];
    productDetails: {
        importPrice: number;
        price: number;
    }[];
}
export default function Header() {
    const dispatch = useDispatch()
    const cartQuantity = useSelector((state) => state.cart)
    const getUserID = () => {
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : {}
        return user?._id || ''
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await instance.get(`api/cart/${getUserID()}`)
            let quantity = response.data.data.reduce((total, item) => total + item.totalQuantity, 0)
            dispatch(updateAllCartQuantityStore(quantity))
        }
        fetchData()
    }, [dispatch])

    const [open, setOpen] = useState(false)
    const [user] = useLocalStorage('user', null)

    const { data: categories } = useQuery({ queryFn: getAllCategory, queryKey: ['/categories'] })
    const navigate = useNavigate()

    const handleCategoryClick = (categoryId) => {
        navigate('/collections/' + categoryId, { replace: true })
        window.location.reload() // reload the page
    }

    // Trạng thái mới cho chức năng tìm kiếm

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        debouncedSearch(event.target.value)
    }

    // Sử dụng debounce cho hàm tìm kiếm
    const fetchSearchResults = async (term: any) => {
        setLoading(true)
        try {
            const response = await instance.get(`/api/infoProduct?name=${term}`)
            setSearchResults(response.data.data)
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error)
        }
        setLoading(false)
    }

    //Debounce hàm tìm kiếm với delay 700ms
    const debouncedSearch = useCallback(debounce((term: any) => fetchSearchResults(term), 700), [])

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([])
        }
    }, [searchTerm])

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const response = await instance.get(`/api/infoProduct?name=${searchTerm}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        }
        setLoading(false);
    };


    return (
        <header>
            <div className='bg-black py-2 text-white text-xs'>
                <div className='app-container flex items-center justify-between'>
                    <div className='flex gap-3'>
                        <span>Hotline: (+84) 977.826.896</span>
                        <span className='border-l border-neutral-400 pl-3'>Liên hệ</span>
                    </div>
                    <div className='flex gap-2'>
                        <div className='relative'>
                            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center'>
                                1
                            </span>
                            <Bell size={20} />
                        </div>
                        <span>Thông báo của tôi</span>
                    </div>
                </div>
            </div>

            <div className='flex app-container border-b border-neutral-200 py-3 gap-5'>
                <div className='block md:hidden'>
                    <Sheet>
                        <SheetTrigger>
                            <MenuIcon size={26} className='cursor-pointer' onClick={() => setOpen((prev) => !prev)} />
                        </SheetTrigger>
                        <SheetContent side={'left'}>
                            <h2 className='text-left text-xl font-semibold border-b border-neutral-300 pb-3'>Danh mục</h2>
                            <ul className='mt-4 flex flex-col gap-2'>
                                <li>
                                    <Link to='/' className='text-sm text-neutral-900'>Hàng mới về</Link>
                                </li>
                                <li>
                                    <Link to='/' className='text-sm text-neutral-900'>Mua 1 tặng 1</Link>
                                </li>
                                <li>
                                    <Link to='/' className='text-sm text-neutral-900'>Hệ thống cửa hàng</Link>
                                </li>
                                <li>
                                    <Accordion type='single' collapsible>
                                        <AccordionItem value='item-1' className='bg-transparent border-none text-sm text-neutral-900 p-0 m-0'>
                                            <AccordionTrigger className='text-sm text-neutral-900 font-normal no-underline p-0 m-0'>
                                                Chính sách
                                            </AccordionTrigger>
                                            <AccordionContent className=''>
                                                <Link to='/' className='text-sm text-neutral-900 block my-2'>Quy Chế</Link>
                                                <Link to='/' className='text-sm text-neutral-900 block my-2'>Quy Chế</Link>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className='md:w-[200px] flex-1 md:flex-none flex justify-center'>
                    <Link to='/'>
                        <img src={logo} alt='' className='w-[100px] md:w-auto object-contain' />
                    </Link>
                </div>
                <div className='hidden md:block flex-1'>
                    <form onSubmit={handleSearch}>
                        <label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
                            Tìm kiếm
                        </label>
                        <div className='relative'>
                            <input
                                type='search'
                                id='search'
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className='block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-800 focus:border-neutral-800'
                                placeholder='Tìm kiếm sản phẩm'
                                required
                            />
                            <button
                                type='submit'
                                className='text-white absolute end-2.5 bottom-2.5 bg-neutral-800 hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
                            >
                                <SearchIcon size={20} />
                            </button>
                        </div>
                    </form>
                    {loading && <p className='text-sm text-gray-500'>Loading...</p>}
                    {searchResults.length > 0 && (
                        <div className='border border-gray-300 bg-white rounded-lg mt-2 p-4 absolute z-50 w-full max-w-4xl'>
                            <ul>
                                {searchResults.map((product) => (
                                    <li key={product.productId} className='flex justify-between items-center border-b border-gray-200 py-1'>
                                        <div>
                                            <Link to={`/products/${product.productId}`} className='cursor-pointer' onClick={() => {
                                                setTimeout(() => {
                                                    location.reload()
                                                }, 200)
                                            }}>
                                                <span>{product.nameProduct}</span>
                                                <div>
                                                    <span className='text-red-500 text-sm pr-4'>
                                                        {product.productDetails[0]?.importPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </span>
                                                    <span className='text-neutral-300 text-xs line-through'>
                                                        {product.productDetails[0]?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div>
                                            <img src={product.images[0]?.imageUrl} alt={product.nameProduct} className='w-10 h-10 object-cover' />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className='flex gap-3 text-xs my-3'>
                        <div className='flex gap-1 items-center'>
                            <img src='/badge.webp' alt='' className='w-5 h-5' />
                            <span>Đảm bảo chất lượng</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <img src='/check.webp' alt='' className='w-5 h-5' />
                            <span>Mở hộp kiểm tra nhận hàng</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <img src='/car.webp' alt='' className='w-5 h-5' />
                            <span>Vận chuyển nhanh 2 giờ</span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-3'>
                    {user?.userName ? (
                        <Link to={user?.role === 'admin' ? '/admin' : '/profile'} className='flex gap-1 text-sm hover:opacity-90 items-center h-fit'>
                            <User2 size={26} />
                            <p className='hidden md:block'>{user?.userName}</p>
                        </Link>
                    ) : (
                        <Link to='/signin' className='flex gap-1 text-sm hover:opacity-90 items-center h-fit'>
                            <User2 size={26} />
                            <p className='hidden md:block'>Đăng nhập / Đăng ký</p>
                        </Link>
                    )}
                    <Link to='/orders' className='flex gap-1 text-sm hover:opacity-90 items-center h-fit' style={{ marginTop: '4px' }}>
                        <p className='hidden md:block'>Đơn hàng</p>
                    </Link>
                    <div className='relative'>
                        <Link to='/cart'>
                            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer'>
                                {cartQuantity}
                            </span>
                            <ShoppingBagIcon size={26} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='app-container md:flex justify-center text-neutral-700 my-2 hidden text-[15px]'>
                <ul className='flex justify-center items-center gap-8'>
                    <li>
                        <Link to='/collections/croon' className='hover:text-neutral-900'>Trang chủ</Link>
                    </li>
                    <li>
                        <Link to='/products' className='flex items-center justify-center gap-1 item-hover relative'>
                            <span className='relative hover:text-neutral-700'>Sản phẩm</span>
                            <ChevronDownIcon className='w-3 transition-all group-hover:rotate-180 duration-300' />
                            <ul className='absolute top-full left-0 bg-white py-2 shadow-lg w-[200px] text-neutral-600 z-10 text-sm opacity-0 pointer-events-none item-child-hover'>
                                {categories?.map((category) => (
                                    <li key={category._id}>
                                        <Link
                                            className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                            to={'#'}
                                            onClick={() => handleCategoryClick(category._id)}
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    </li>
                    <li>
                        <Link to='/pages/blog' className='hover:text-neutral-900'>Blog</Link>
                    </li>
                    <li>
                        <Link to='/pages/lien-he' className='hover:text-neutral-900'>Giới thiệu</Link>
                    </li>
                    <li>
                        <Link to='/pages/chinh-sach-doi-tra-1' className='flex items-center justify-center gap-1 item-hover relative'>
                            <span className='relative hover:text-neutral-700'>Chính sách đổi trả</span>
                            <ChevronDownIcon className='w-3 transition-all group-hover:rotate-180 duration-300' />
                            <ul className='absolute top-full left-0 bg-white py-2 shadow-lg w-[200px] text-neutral-600 z-10 text-sm opacity-0 pointer-events-none item-child-hover'>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/pages/quy-cho-hoat-dong'
                                    >
                                        Quy chế hoạt động
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/pages/quy-tring-dat-hang-va-thanh-toan'
                                    >
                                        Chính sách đặt hàng và thanh toán
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/pages/policy'
                                    >
                                        Chính sách đổi trả và bảo hành
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/pages/policy'
                                    >
                                        Chính sách vận chuyển giao hàng
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/pages/chinh-sach-bao-mat-thong-tin'
                                    >
                                        Chính sách bảo mật thông tin
                                    </Link>
                                </li>
                            </ul>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
