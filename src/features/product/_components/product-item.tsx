import { EyeIcon, ShoppingCartIcon, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductItem() {
    return <Link to="/products/giay-nike" className="cursor-pointer group">
        <div className="pt-6 relative pb-3 overflow-hidden">
            <span className='absolute text-xs p-1 px-2 bg-red-500 rounded-full inline-flex item-center gap-1 text-white items-center w-fit top-0 left-2'>
                <Zap size={10} />
                -53%
            </span>
            <div className="relative rounded-md overflow-hidden">
                <img src="https://product.hstatic.net/200000690551/product/mule_outfit3_ad305b65207844f38ea799b8e69b0d24_large.png" alt="" />
                <img src="https://product.hstatic.net/200000690551/product/gr1_3065ae8062014890a39116134a1aa31c_large.jpg" alt="" className="absolute top-0 left-0 right-0 bottom-0 object-cover opacity-0 group-hover:opacity-100 duration-500  transition-all" />
            </div>
            {/* Another image show opacity when hover */}
            <div className="absolute group-hover:bottom-4 transition-all group-hover:opacity-100 opacity-0 duration-500 -bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-2">
                <button className="w-10 h-10 flex items-center justify-center text-neutral-950 bg-white hover:bg-neutral-950 hover:text-white outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none flex-1" title="Xem nhanh">
                    <ShoppingCartIcon className="size-3 mr-2 text-xs" />
                    Thêm vào giỏ
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none" title="Xem nhanh">
                    <EyeIcon></EyeIcon>
                </button>
            </div>
        </div>
        <div>
            <span className="text-xs">+5 kích thước</span>
            <p className="text-md my-1">Giày sneaker chính hãng </p>
            <div className="flex items-center gap-1">
                <span className="text-red-500 text-sm">750,000đ</span>
                <span className="text-neutral-300 text-xs line-through">1,500,000đ</span>
            </div>
        </div>
    </Link>
}
