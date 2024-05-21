import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-bar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, MenuIcon, SearchIcon, ShoppingBagIcon, User2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false)

    return <header>
        <div className="bg-black py-2 text-white text-xs">
            <div className="app-container flex items-center justify-between">
                <div className="flex gap-3">
                    <span>Hotline: (+84) 977.826.896</span>
                    <span className="border-l border-neutral-400 pl-3">Liên hệ</span>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">1</span>
                        <Bell size={20} />
                    </div>
                    <span>Thông báo của tôi</span>
                </div>
            </div>
        </div>

        <div className="flex app-container border-b border-neutral-200 py-3 gap-5">
            <div className="block md:hidden">
                <Sheet >
                    <SheetTrigger>
                        <MenuIcon size={26} className="cursor-pointer" onClick={()=>setOpen(prev=>!prev)}/>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <h2 className="text-left text-xl font-semibold border-b border-neutral-300 pb-3">Danh mục</h2>
                        <ul className="mt-4 flex flex-col gap-2">
                            <li>
                                <Link to="/" className="text-sm text-neutral-900">Hàng mới về</Link>
                            </li>
                            <li><Link to="/" className="text-sm text-neutral-900">Mua 1 tặng 1</Link></li>
                            <li><Link to="/" className="text-sm text-neutral-900">Hệ thống cửa hàng</Link></li>
                            <li>
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1" className="bg-transparent border-none text-sm text-neutral-900 p-0 m-0">
                                <AccordionTrigger className="text-sm text-neutral-900 font-normal no-underline  p-0 m-0">Chính sách</AccordionTrigger>
                                <AccordionContent className="">
                                <Link to="/" className="text-sm text-neutral-900 block my-2">Quy Chế</Link>
                                <Link to="/" className="text-sm text-neutral-900 block my-2">Quy Chế</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                            </li>
                        </ul>
                    </SheetContent>
                </Sheet>
            </div>
            
            <div className="md:w-[200px] flex-1 md:flex-none flex justify-center">
                <img src="https://theme.hstatic.net/200000690551/1001033677/14/logo.png?v=292" alt="" className="w-[100px] md:w-auto object-contain"/>
            </div>
            <div className="hidden md:block flex-1">
                <form>   
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <input type="search" id="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-neutral-800 focus:border-neuring-neutral-800 " placeholder="Tìm kiếm sản phẩm" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-neutral-800 hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">
                            <SearchIcon size={20} />
                        </button>
                    </div>
                </form>
                <div className="flex gap-3 text-xs my-3">
                    <div className="flex gap-1 items-center">
                        <img src="/badge.webp" alt="" className="w-5 h-5" />
                        <span>Đảm bảo chất lượng</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <img src="/check.webp" alt="" className="w-5 h-5" />
                        <span>Mở hộp kiểm tra nhận hàng</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <img src="/car.webp" alt="" className="w-5 h-5" />
                        <span>Vận chuyển nhanh 2 giờ</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <Link to="/signin" className="flex gap-1 text-sm hover:opacity-90 items-center h-fit">
                    <User2 size={26} />
                    <p className="hidden md:block">Đăng nhập/Đăng ký</p>
                </Link>
                <div className="relative">
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">1</span>
                    <ShoppingBagIcon size={26} />
                </div>
            </div>
        </div>

        <div className="app-container md:flex justify-center text-neutral-500 my-2 hidden">
            <NavigationMenu>
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
                        <NavigationMenuContent className="py-3">
                            <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer">Nike</NavigationMenuLink>
                            <NavigationMenuLink className="text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer">Adidas</NavigationMenuLink>
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
                            <NavigationMenuLink className="whitespace-nowrap text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer">Quy chế hoạt động</NavigationMenuLink>
                            <NavigationMenuLink className="whitespace-nowrap text-sm block p-2 px-5 hover:bg-neutral-100 transition-all cursor-pointer">Chính sách đặt hàng</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </header>
}
