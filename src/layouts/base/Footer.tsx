import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return <footer className="bg-[#f5f5f5] ">
        <div className="app-container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ">
            <div className="text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16">
                <h3 className="text-lg text-neutral-800 mb-5 font-semibold">Giới thiệu</h3>
                <p className="text-sm">
                    HỘ KINH DOANH THEBASIC.VN <br />
                    GPKD số: 41N8155036 do Phòng Tài Chính - Kế Toán UBND Quận Tân Bình cấp ngày 13/ 09/ 2022. <br /> <br />
                    THEBASIC.VN tự hào với nhiều năm kinh doanh về các loại giày sneaker. Uy tín và chất lượng luôn là hai thứ mà TheBasic.vn hướng đến.
                </p>
                <div className="flex gap-2  mt-2">
                    <Link to="/" className="w-8 h-8 border rounded-md border-neutral-200 flex items-center justify-center hover:opacity-90">
                        <FacebookIcon size={16} />
                    </Link>
                    <Link to="/" className="w-8 h-8 border rounded-md border-neutral-200 flex items-center justify-center hover:opacity-90">
                        <InstagramIcon size={16} />
                    </Link>
                    <Link to="/" className="w-8 h-8 border rounded-md border-neutral-200 flex items-center justify-center hover:opacity-90">
                        <YoutubeIcon size={16} />
                    </Link>
                </div>
            </div>
            <div className="text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16">
                <h3 className="text-lg text-neutral-800 mb-5 font-semibold">Thông tin liên hệ</h3>
                <p className="text-sm"><strong>Địa chỉ: </strong> Số 788 Cách Mạng Tháng Tám, Phường 5, Quận Tân Bình, Hồ Chí Minh, Việt Nam</p>
                <p className="text-sm my-2"><strong>Điện thoại: </strong> (+84) 977 826 896</p>
                <p className="text-sm"><strong>Email:</strong> thebasicvn@gmail.com</p>
                <p className="text-md mt-3">Phương thức vận chuyển</p>
                <div className="flex gap-3 mt-2">
                    <img className="border border-neutral-200" src="/img-ship-01.webp" alt="" />
                    <img className="border border-neutral-200" src="/img-ship-02.webp" alt="" />
                    <img className="border border-neutral-200" src="/img-ship-03.webp" alt="" />
                </div>
            </div>
            <div className="text-neutral-500 px-4 md:px-8 md:border-r md:border-neutral-200 py-4 md:py-16">
                <h3 className="text-lg text-neutral-800 mb-5 font-semibold">Chính sách</h3>
                <ul className="text-sm flex-col flex gap-2">
                    <li>・Quy chế hoạt động</li>
                    <li>・Chính sách đặt hàng và thanh toán</li>
                    <li>・Chính sách đổi trả và bảo hành</li>
                    <li>・Chính sách vận chuyển giao hàng</li>
                    <li>・Chính Sách Bảo Mật Thông Tin</li>
                </ul>
            </div>
            <div className="text-neutral-500 px-4 md:px-8 py-4 md:py-16">
                <h3 className="text-lg text-neutral-800 mb-5 font-semibold">Đăng ký nhận tin</h3>
                <p className="text-sm">Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.</p>
                <form action="" className="flex mt-4">
                    <input type="text" placeholder="Nhập email của bạn" className="w-[80%] border border-neutral-200 rounded-md p-2 flex-1 outline-none" />
                    <button className='p-2 py-1 border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none'>Đăng ký</button>
                </form>
            </div>
        </div>

    </footer>
}
