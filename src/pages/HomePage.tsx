import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carosel'
import ProductItem from '@/features/product/_components/product-item'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const HomePage = (props: Props) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ["SẢN PHẨM KHUYẾN MÃI", "SẢN PHẨM NỔI BẬT", "HÀNG CHÍNH HÃNG"]
  return (
    <main className='app-container'>
      <div>
        <Carousel opts={{ loop: true, duration: 1000 }}>
          <CarouselContent className="">
            <CarouselItem className="">
              <img src="/slide1.jpeg" alt="Slider" />
            </CarouselItem>
            <CarouselItem className="">
              <img src="/slide2.jpeg" alt="Slider" />
            </CarouselItem>
            <CarouselItem className="">
              <img src="/slide3.webp" alt="Slider" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='hidden' />
          <CarouselNext className='hidden' />
        </Carousel>
      </div>
      <div className='py-16 px-2'>
        <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
          Danh mục nổi bật
        </h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
          <Link to="/" className='relative group'>
            <div className='h-fit overflow-hidden'>
              <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_1_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
            </div>
            <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
              <p className='flex-1'>Nike</p>
              <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                <ArrowRight size={24} />
              </button>
            </div>
          </Link>
          <Link to="/" className='relative group'>
            <div className='h-fit overflow-hidden'>
              <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_2_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
            </div>
            <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
              <p className='flex-1'>New Balance</p>
              <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                <ArrowRight size={24} />
              </button>
            </div>
          </Link>
          <Link to="/" className='relative group'>
            <div className='h-fit overflow-hidden'>
              <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_3_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
            </div>
            <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
              <p className='flex-1'>Adidas</p>
              <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                <ArrowRight size={24} />
              </button>
            </div>
          </Link>
          <Link to="/" className='relative group'>
            <div className='h-fit overflow-hidden'>
              <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_category_4_img.jpg?v=292" alt="" className='group-hover:scale-125 transition-all duration-300' />
            </div>
            <div className='absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-center bg-white/60'>
              <p className='flex-1'>MLB</p>
              <button className='w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white'>
                <ArrowRight size={24} />
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div className='bg-pink-50 py-16 px-2'>
        <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>
          <span className="animate-ping inline-flex w-2 h-2 rounded-full bg-yellow-500 opacity-75 align-middle relative bottom-1 mr-5"></span>
          Mua 1 tặng 1
        </h1>
        <div className='px-5'>
          <Carousel>
            <CarouselContent className="-ml-2 md:-ml-4">
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
              <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4"><ProductItem /></CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' />
            <CarouselNext className='absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2' />
          </Carousel>
        </div>
      </div>

      <div className=' py-16 px-2'>
        <div>
          <ul className='flex justify-center gap-5 overflow-auto'>
            {tabs.map((tab, index) => <li className={cn('relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap', activeTab == index ? 'text-neutral-800 after:right-0' : '')} key={tab} onClick={() => setActiveTab(index)}>{tab}</li>)}
          </ul>
        </div>
        <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
          {
            activeTab == 0 && new Array(4).fill(0).map((_, index) => <ProductItem key={index} />)
          }
          {
            activeTab == 1 && new Array(6).fill(0).map((_, index) => <ProductItem key={index} />)
          }
          {
            activeTab == 2 && new Array(8).fill(0).map((_, index) => <ProductItem key={index} />)
          }
        </div>
      </div>

      <div className='py-16 px-2 grid lg:grid-cols-4 md:grid-cols-2 gap-4'>
        <div className='flex justify-center items-start gap-3'>
          <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_1.png?v=292" alt="" className='block w-14' />
          <div className='flex-1'>
            <p className='mb-1'>Miễn phí vận chuyển</p>
            <p className='text-sm'>Miễn phí vận chuyển nội thành HCM cho đơn hàng từ 1000k</p>
          </div>
        </div>
        <div className='flex justify-center items-start gap-3'>
          <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_2.png?v=292" alt="" className='block w-14' />
          <div className='flex-1'>
            <p className='mb-1'>Đổi dễ dàng</p>
            <p className='text-sm'>Đổi hàng sau 30 ngày nếu không hài lòng</p>
          </div>
        </div>
        <div className='flex justify-center items-start gap-3'>
          <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_3.png?v=292" alt="" className='block w-14' />
          <div className='flex-1'>
            <p className='mb-1'>Hỗ trợ</p>
            <p className='text-sm'>Gọi hotline 0977 826 896 để được tư vấn</p>
          </div>
        </div>
        <div className='flex justify-center items-start gap-3'>
          <img src="https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_4.png?v=292" alt="" className='block w-14' />
          <div className='flex-1'>
            <p className='mb-1'>Thanh toán đa dạng</p>
            <p className='text-sm'>Nhiều phương thức thanh toán đa dạng như: Tiền Mặt, Cà Thẻ, Chuyển Khoản, Apple Pay, Momo...</p>
          </div>
        </div>


      </div>

    </main>
  )
}

export default HomePage
