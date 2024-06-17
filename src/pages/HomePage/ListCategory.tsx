import ProductItem from '@/features/product/_components/product-item'
import { cn } from '@/lib/utils'
import { getAllCategory } from '@/services/category/requests'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { HomePageButton } from './HomePage'

const ListCategory = () => {
    const [activeTab, setActiveTab] = useState(0)

    const { data, isFetching } = useQuery({ queryFn: getAllCategory, queryKey: ['/categories'] })

    console.log('c', data)
    return (
        <div className='app-container'>
            <div className=' py-16 px-2'>
                <div>
                    <ul className='flex justify-center gap-8 '>
                        {data?.map((category, index) => (
                            <li
                                className={cn(
                                    'relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap',
                                    activeTab == index ? 'text-neutral-800 after:right-0' : ''
                                )}
                                key={category._id}
                                onClick={() => setActiveTab(index)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                    {data?.[activeTab]?.products?.map((product, index) => <ProductItem key={index} {...product} />)}
                </div>
                <Link to={'/collections/' + data?.[activeTab]?._id}>
                    <HomePageButton className='mt-10'>Xem tất cả&nbsp;{data?.[activeTab].name}</HomePageButton>
                </Link>
            </div>
        </div>
    )
}

export default ListCategory
