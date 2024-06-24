import { IProduct } from '@/common/interfaces/product'
import { IReview } from '@/common/interfaces/review'
import { GetProductsResponse, getProducts } from '@/services/product'
import { getReviews } from '@/services/review'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ReviewList = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [productInfo, setProductInfo] = useState<Omit<GetProductsResponse['datas'], 'docs'>>()

    const [reviews, setReviews] = useState<IReview[]>([])

    const fetchProducts = async () => {
        const response = await getProducts()
        setProducts(response?.datas?.docs)

        if (response?.datas) {
            const producInfoOmit: Omit<GetProductsResponse['datas'], 'docs'> = omit(response?.datas, ['docs'])
            setProductInfo(producInfoOmit)
        }
    }

    const fetchReviews = async () => {
        setIsLoadingReview(true)

        const input = searchParams.get('product_id') || form.getFieldValue('status')

        console.log(input, 'input')
        const response = await getReviews(input)
        const data = response?.data

        if (data) {
            setReviews(data)
        }
        setIsLoadingReview(false)
    }

    const getProductsPage = async (page: number) => {
        const response = await getProducts({
            _page: page
        })
        setProducts([...products, ...response?.datas?.docs])

        const producInfoOmit: Omit<GetProductsResponse['datas'], 'docs'> = omit(response?.datas, ['docs'])
        setProductInfo(producInfoOmit)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (searchParams.get('product_id')) {
            fetchReviews()
        }
    }, [])

    const navigateToDetail = (id: string) => {
        navigate(`/admin/reviews/detail/${id}`)
    }

    const columns: TableProps<IReview>['columns'] = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: Date) => value && dayjs(value).format('HH:MM DD-MM-YYYY')
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content'
        },
        {
            title: 'Người đánh giá',
            dataIndex: 'idAccount',
            key: 'idAccount',
            render: (value: IReview['idAccount']) => value && value?.userName
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        onClick={() => {
                            navigateToDetail(record._id)
                        }}
                        ghost
                    >
                        <InfoCircleOutlined style={{ display: 'inline-flex' }} />
                    </Button>
                </Space>
            )
        }
    ]

    return (
        <div className='border p-6'>
            <Form form={form} layout='vertical'>
                <Form.Item name='status' label='Sản phẩm'>
                    <Select
                        defaultValue={searchParams.get('product_id')}
                        placeholder={'Chọn sản phẩm'}
                        options={products}
                        fieldNames={{
                            value: '_id',
                            label: 'name'
                        }}
                        onChange={() => {
                            setSearchParams({ product_id: form.getFieldValue('status') })

                            fetchReviews()
                        }}
                        onPopupScroll={(event) => {
                            const target: any = event.target
                            if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 32 && productInfo) {
                                if (productInfo?.page >= productInfo?.nextPage && isLoading === true) return
                                getProductsPage(productInfo.nextPage)
                                setIsLoading(true)
                            }
                        }}
                    />
                </Form.Item>
            </Form>
            <Table<IReview> dataSource={reviews} columns={columns} loading={isLoadingReview} />
        </div>
    )
}

export default ReviewList
