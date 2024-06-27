import React from 'react'

import { DOTS, usePagination } from '../../hooks/usePagination'
import { Button } from './button'

import { Button as DefaultButton } from 'antd'

type Props = {
    onPageChange: (pageNumber: number) => void
    totalCount: number
    siblingCount?: number
    currentPage: number
    pageSize: number
    className?: string
}

const Pagination = (props: Props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })

    if (paginationRange?.length === 0) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    const lastPage = paginationRange[paginationRange.length - 1]

    return (
        <>
            <div className='flex items-center justify-center gap-3 py-3'>
                <DefaultButton
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                    className='stroke-[#333333] px-0 hover:stroke-white lg:px-4'
                >
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path d='M15 18L9 12L15 6' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                </DefaultButton>

                {paginationRange.map((pageNumber, i) => {
                    if (pageNumber === DOTS) {
                        return (
                            <div className='hidden md:block ' key={pageNumber + i}>
                                {pageNumber}
                            </div>
                        )
                    }

                    return (
                        <DefaultButton
                            style={{ backgroundColor: pageNumber === currentPage ? '#1677ff' : undefined }}
                            type={pageNumber === currentPage ? 'primary' : 'default'}
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber as number)}
                        >
                            {pageNumber}
                        </DefaultButton>
                        // <Button
                        //     size={'sm'}
                        //     key={pageNumber}
                        //     className='w-8 px-0 lg:px-5'
                        //     onClick={() => onPageChange(pageNumber as number)}
                        // >
                        //     {pageNumber}
                        // </Button>
                    )
                })}
                <DefaultButton
                    onClick={onNext}
                    disabled={currentPage === lastPage}
                    className='stroke-[#333333] px-0  hover:stroke-white lg:px-4'
                >
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path d='M9 6L15 12L9 18' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                </DefaultButton>
            </div>
            <p className='text-foreground min-w-[9.375rem] text-center md:hidden'>
                Page <b>1</b> of <b>10</b>
            </p>
        </>
    )
}

export default Pagination
