import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Space, Table, message, Modal } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Highlighter from 'react-highlight-words'
import instance from '@/core/api'
import dayjs from 'dayjs'
import { formatPrice } from '@/lib/utils'

type InputRef = Input

interface DataType {
    _id: string
    name: string
    price: number
    description: string
    image: string
    categoryId: string
    sizeId: string[]
    color: string
    priceSale: number
    createdAt: Date
    updatedAt: Date
}

type DataIndex = keyof DataType

const Product = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<DataType[]>([])
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState('')
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([])
    const [sizes, setSizes] = useState<{ _id: string; size: string }[]>([])

    const [form] = Form.useForm()

    useEffect(() => {
        fetchDataProduct()
        fetchCategories()
        fetchSizes()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await instance.get('api/categories')
            setCategories(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchSizes = async () => {
        try {
            const response = await instance.get('api/variant')
            setSizes(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchDataProduct = async () => {
        try {
            const response = await instance.get('api/product')
            setData(response.data.datas.docs)
        } catch (error) {
            console.error(error)
            setData([])
        }
    }

    const confirmDelete = async (productId: string) => {
        try {
            await instance.delete(`api/product/${productId}`)
            message.success('Xóa thành công')
            fetchDataProduct()
        } catch (error) {
            console.error(error)
        }
    }

    const cancelDelete = () => {
        message.error('Hủy xóa sản phẩm')
    }

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex: DataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Đặt lại
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false })
                            setSearchText((selectedKeys as string[])[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Lọc
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close()
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
    })

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%'
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            width: '10%',
            render: (image: string) => (
                <img src={image} alt='Product' className='w-16 aspect-square object-cover shrink-0' />
            )
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Danh Mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width: '10%',
            render: (categoryId: string) => <p>{categories.find((item) => item._id === categoryId)?.name}</p>
        },
        {
            title: 'Kích thước',
            dataIndex: 'sizeId',
            key: 'sizeId',
            width: '10%',
            render: (sizeId: string[]) => (
                <p>{sizeId.map((item) => sizes.find((i) => i._id === item)?.size || '').join(', ')}</p>
            )
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
            width: '10%',
            ...getColumnSearchProps('color')
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (price: number) => <p>{formatPrice(price)}</p>
        },
        {
            title: 'Giá khuyến mại',
            dataIndex: 'promotionalPrice',
            key: 'promotionalPrice',
            width: '10%',
            render: (promotionalPrice: number) => <p>{formatPrice(promotionalPrice)}</p>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
            render: (status: string) => {
                const statusColor = status === 'Còn hàng' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'
                return <p className={statusColor}>{status}</p>
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '20%',
            render: (createdAt: Date) => <p>{dayjs(createdAt).format('HH:MM DD-MM-YYYY')}</p>
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size='middle'>
                    <Button onClick={() => navigateToDetail(record._id)}>
                        <InfoCircleOutlined style={{ display: 'inline-flex' }} />
                    </Button>
                    <Button onClick={() => navigateToEdit(record._id)}>
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Button>
                    <Popconfirm
                        placement='topRight'
                        title='Xóa sản phẩm?'
                        description='Bạn có chắc chắn xóa sản phẩm này không?'
                        onConfirm={() => confirmDelete(record._id)}
                        onCancel={cancelDelete}
                        okText='Đồng ý'
                        cancelText='Không'
                    >
                        <Button danger>
                            <DeleteOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const showModal = (mode: string) => {
        setModalMode(mode)
        setIsModalOpen(true)
    }

    const handleOk = () => {
        form.submit()
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onFinish = async (values: any) => {
        try {
            if (modalMode === 'add') {
                await instance.post('api/product', values)
                message.success('Tạo sản phẩm thành công!')
            } else if (modalMode === 'edit') {
                await instance.put(`api/product/${values._id}`, values)
                message.success('Cập nhật sản phẩm thành công!')
            }
            fetchDataProduct()
        } catch (error) {
            console.error(error)
            message.error('Có lỗi xảy ra!')
        } finally {
            setIsModalOpen(false)
        }
    }

    return (
        <div>
            <div className='flex justify-between items-center mx-[50px] my-4'>
                <div>
                    <p className='text-[26px] uppercase font-semibold'>Quản lí sản phẩm</p>
                </div>
                <div className='flex justify-end mb-2'>
                    <Button
                        type='primary'
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className='bg-[#1677ff]'
                        onClick={() => {
                            form.resetFields()
                            showModal('add')
                            navigate('/admin/products/add')
                        }}
                    />
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowKey='_id' />
            <Modal
                title={modalMode === 'add' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical' name='productForm' onFinish={onFinish}>
                    {/* Add form fields here */}
                </Form>
            </Modal>
        </div>
    )
}

export default Product
