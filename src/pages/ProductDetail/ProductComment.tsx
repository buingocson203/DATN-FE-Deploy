import { Icon } from '@iconify/react'
import React from 'react'

const ProductComment = () => {
    return (
        <div>
            <div className='flex items-center gap-3 mb-5'>
                <img src='https://picsum.photos/300/300' className='w-11 h-11 rounded-full' alt='' />

                <div className='w-full'>
                    <form action="" className='w-full flex gap-4'>
                        <input type="text" placeholder='Viết đánh giá của bạn vào đây ....' className='w-full px-3 py-2 border rounded outline-none'/>
                        <button><Icon className='text-2xl' icon="mingcute:send-plane-fill" /></button>
                    </form>
                </div>
                
            </div>
            <hr className='mb-5 border-dashed'/>


            <div className='flex flex-col space-y-4'>


                <div className='flex items-center'>
                    <img src='https://picsum.photos/300/300' className='w-11 h-11 rounded-full' alt='' />

                    <div className='flex-1 ml-3'>
                        <h3 className='text-base font-semibold'>Nguyễn Văn Nam</h3>
                        <div className='text-sm'>Sản phẩm rất đẹp</div>
                    </div>
                </div>

                <hr />

                <div className='flex items-center'>
                    <img src='https://picsum.photos/300/300' className='w-11 h-11 rounded-full' alt='' />

                    <div className='flex-1 ml-3'>
                        <h3 className='text-base font-semibold'>Nguyễn Thùy Linh</h3>
                        <div className='text-sm'>Sản phẩm rất tôt</div>
                    </div>
                </div>

                <hr />

                <div className='flex items-center'>
                    <img src='https://picsum.photos/300/300' className='w-11 h-11 rounded-full' alt='' />

                    <div className='flex-1 ml-3'>
                        <h3 className='text-base font-semibold'>Nguyễn Hà Linh</h3>
                        <div className='text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, impedit cumque dolores illum quod
                            sunt facilis magni aspernatur velit modi, doloremque iusto porro repudiandae dicta consequatur
                            sint aperiam veritatis necessitatibus!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComment
