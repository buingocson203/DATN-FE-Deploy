import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-bar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getAllCategory } from "@/services/category/requests";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { normalizeHash } from "@remix-run/router/dist/utils";
import { ChevronDown } from "lucide";
import { Bell, ChevronDownIcon, ChevronRightIcon, MenuIcon, SearchIcon, ShoppingBagIcon, User2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/1-01.png";
import { useLocalStorage } from '@/hooks/useStorage';
export default function Header() {
    const [open, setOpen] = useState(false)
    const [user] = useLocalStorage('user', null)


    const { data: categories } = useQuery({ queryFn: getAllCategory, queryKey: ['/categories'] })
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId: string) => {
        navigate('/collections/' + categoryId, { replace: true });
        window.location.reload(); // reload the page
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
                            <h2 className='text-left text-xl font-semibold border-b border-neutral-300 pb-3'>
                                Danh mục
                            </h2>
                            <ul className='mt-4 flex flex-col gap-2'>
                                <li>
                                    <Link to='/' className='text-sm text-neutral-900'>
                                        Hàng mới về
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' className='text-sm text-neutral-900'>
                                        Mua 1 tặng 1
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/' className='text-sm text-neutral-900'>
                                        Hệ thống cửa hàng
                                    </Link>
                                </li>
                                <li>
                                    <Accordion type='single' collapsible>
                                        <AccordionItem
                                            value='item-1'
                                            className='bg-transparent border-none text-sm text-neutral-900 p-0 m-0'
                                        >
                                            <AccordionTrigger className='text-sm text-neutral-900 font-normal no-underline  p-0 m-0'>
                                                Chính sách
                                            </AccordionTrigger>
                                            <AccordionContent className=''>
                                                <Link to='/' className='text-sm text-neutral-900 block my-2'>
                                                    Quy Chế
                                                </Link>
                                                <Link to='/' className='text-sm text-neutral-900 block my-2'>
                                                    Quy Chế
                                                </Link>
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
                    <form>
                        <label
                            htmlFor='search'
                            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                        >
                            Search
                        </label>
                        <div className='relative'>
                            <input
                                type='search'
                                id='search'
                                className='block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-800 focus:border-neuring-neutral-800 '
                                placeholder='Tìm kiếm sản phẩm'
                                required
                            />
                            <button
                                type='submit'
                                className='text-white absolute end-2.5 bottom-2.5 bg-neutral-800 hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                            >
                                <SearchIcon size={20} />
                            </button>
                        </div>
                    </form>
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
                        <Link
                            to={user?.role === 'admin' ? '/admin' : '/profile'}
                            className='flex gap-1 text-sm hover:opacity-90 items-center h-fit'
                        >
                            <User2 size={26} />
                            <p className='hidden md:block'>{user?.userName}</p>
                        </Link>
                    ) : (
                        <Link to='/signin' className='flex gap-1 text-sm hover:opacity-90 items-center h-fit'>
                            <User2 size={26} />
                            <p className='hidden md:block'>Đăng nhập/Đăng ký</p>
                        </Link>
                    )}
                    <Link
                        to='/orders'
                        className='flex gap-1 text-sm hover:opacity-90 items-center h-fit'
                        style={{ marginTop: '4px' }}
                    >
                        <p className='hidden md:block'>Đơn hàng</p>
                    </Link>
                    <div className='relative'>
                        <Link to='/cart'>
                            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer'>
                                1
                            </span>
                            <ShoppingBagIcon size={26} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='app-container md:flex justify-center text-neutral-700 my-2 hidden text-[15px]'>
                <ul className='flex justify-center items-center gap-8'>
                    <li>
                        <Link to='/collections/croon' className='hover:text-neutral-900'>
                            Hàng mới về
                        </Link>
                    </li>
                    <li>
                        <Link to='/products' className='flex items-center justify-center gap-1 item-hover relative'>
                            <span className='relative  hover:text-neutral-700'>Sản phẩm</span>
                            <ChevronDownIcon className='w-3 transition-all group-hover:rotate-180 duration-300' />

                            <ul className='absolute top-full left-0 bg-white py-2 shadow-lg w-[200px] text-neutral-600 z-10 text-sm opacity-0 pointer-events-none item-child-hover'>

                                {categories?.map(category =>
                                    <li key={category._id}>
                                        <Link
                                            className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                            to={'#'} // use # to prevent Link default behavior
                                            onClick={() => handleCategoryClick(category._id)}
                                        >
                                            {category.name}
                                        </Link>
                                    </li>)}
                                {/* <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover'
                                        to='/collections/nike'
                                    >
                                        <span className='flex-1'>Nike</span>
                                        <ChevronRightIcon className='w-3 ml-1' />
                                        <ul className='item-child-hover absolute top-0 left-full w-[200px] bg-white z-10 py-2 shadow-lg'>
                                            <li>
                                                <Link
                                                    className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                                    to='/collections/af1'
                                                >
                                                    AF1
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                                    to='/collections/jordan'
                                                >
                                                    Jordan
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                                    to='/collections/blazer'
                                                >
                                                    Blazer
                                                </Link>
                                            </li>
                                        </ul>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/collections/ascis-puma'
                                    >
                                        Ascis - Puma
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/collections/mlb'
                                    >
                                        MLB
                                    </Link>
                                </li> */}

                            </ul>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to='/products' className='hover:text-neutral-900'>
                            Sản phẩm
                        </Link>
                    </li> */}
                    <li>
                        <Link to='/collections/mua-1-tang-1' className='hover:text-neutral-900'>
                            Hàng mới về
                        </Link>
                    </li>
                    <li>
                        <Link to='/pages/lien-he' className='hover:text-neutral-900'>
                            Hệ thống cửa hàng
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/pages/chinh-sach-doi-tra-1'
                            className='flex items-center justify-center gap-1 item-hover relative'
                        >
                            <span className='relative  hover:text-neutral-700'>Chính sách đổi trả</span>
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
                                        to='/pages/chinh-sach-doi-tra-1'
                                    >
                                        Chính sách đổi trả và bảo hành
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='px-5 py-2 flex items-center relative item-hover hover:text-neutral-700'
                                        to='/pages/chinh-sach-van-chuyen-giao-hang'
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

                {/* <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Hàng mới về
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="hover:bg-transparent">Sản phẩm</NavigationMenuTrigger>
                        <NavigationMenuContent className="py-3 w-[300px]">
                            <Link className="w-[200px] block" to="collections/nike">
                                <NavigationMenuLink className="text-sm p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer relative flex items-center group" >
                                    <span className="flex-1">Nike</span>
                                    <ChevronRightIcon className="size-2 text-neutral-400 w-4 h-4"></ChevronRightIcon>
                                    <div className="absolute top-0 w-[200px] right-full w-200px">
                                        <Link className="block" to="collections/nike">
                                            AF1
                                        </Link>
                                    </div>
                                </NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/adidas">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Adidas</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/asics-puma">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Asics - Puma</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/mlb">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >MLB</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/croon">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >CROON</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/fila">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >New Balance - Fila</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/luxury">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Luxury</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/converse">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Converse - Vans</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/chinh-hang">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Chính hãng</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="collections/phu-kien">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Phụ kiện</NavigationMenuLink>
                            </Link>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Mua 1 tặng 1
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Hệ thống cửa hàng
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:bg-transparent">Chính sách</NavigationMenuTrigger>
                        <NavigationMenuContent className="py-3 w-[300px]">
                            <Link className="w-[200px] block" to="/quy-che-hoat-dong">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Quy chế hoạt động</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="/chinh-sach-dat-hang">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Chính sách đặt hàng và thanh toán</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="/chinh-sach-doi-tra">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Chính sách đổi trả và bảo hành</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="/chinh-sach-can-chuyen">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Chính sách vận chuyển giao hàng</NavigationMenuLink>
                            </Link>
                            <Link className="w-[200px] block" to="/chinh-sach-bao-mat">
                                <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer" >Chính sách bảo mật thông tin</NavigationMenuLink>
                            </Link>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu> */}
            </div>
        </header>
    )
}
