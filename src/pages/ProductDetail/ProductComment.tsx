import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import instance from '@/core/api'

const ProductComment = ({ productID }) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await instance.get(`api/review/reviews/${productID}/list-review`)
        setComments(response.data.data)
    }
    return (
        <div>
            <div className='flex items-center gap-3 mb-5'>
                <img src='https://picsum.photos/300/300' className='w-11 h-11 rounded-full' alt='' />

                <div className='w-full'>
                    <form action='' className='w-full flex gap-4'>
                        <input
                            type='text'
                            placeholder='Viết đánh giá của bạn vào đây ....'
                            className='w-full px-3 py-2 border rounded outline-none'
                        />
                        <button>
                            <Icon className='text-2xl' icon='mingcute:send-plane-fill' />
                        </button>
                    </form>
                </div>
            </div>
            <hr className='mb-5 border-dashed' />

            <div className='flex flex-col space-y-4'>
                {comments.length == 0 ? (
                    <div>Chưa có đánh giá nào</div>
                ) : (
                    comments.map((cmt) => {
                        return (
                            <>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <img
                                            src='https://picsum.photos/300/300'
                                            className='w-11 h-11 rounded-full'
                                            alt=''
                                        />

                                        <div className='flex-1 ml-3'>
                                            <h3 className='text-base font-semibold'>{cmt.idAccount.userName}</h3>
                                            <div className='text-sm'>{cmt.content}</div>
                                        </div>
                                    </div>
                                    <p>{new Date(cmt?.createdAt).toLocaleString()}</p>
                                </div>
                                <hr />
                            </>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default ProductComment
