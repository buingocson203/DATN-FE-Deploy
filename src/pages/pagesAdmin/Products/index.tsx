import { useEffect, useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Space, Table, message } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

import { Link, useNavigate } from 'react-router-dom';

import Dragger from 'antd/es/upload/Dragger';
import axios from 'axios';
import { Option } from 'antd/es/mentions';
import Highlighter from 'react-highlight-words';
import instance from '@/core/api';
import dayjs from 'dayjs';
import { formatPrice } from '@/lib/utils';
import confirm from 'antd/es/modal/confirm';


type InputRef = GetRef<typeof Input>;

interface DataType {
    "_id": string,
    "name": string,
    "price": number,
    "description": string,
    "image": string,
    "categoryId": string,
    "sizeId": string[],
    "color": string,
    "priceSale": number,
    "createdAt": Date,
    "updatedAt": Date
}

type DataIndex = keyof DataType;

// const data: DataType[] = [
//     {
//         key: '1',
//         name: 'John Brown',
//         category: 'New York No. 1 Lake Park',
//         date: "12/2/2222",
//         sold: 727,
//         status: "còn hàng",
//         soluong: 100,
//         image: 'https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg',
//     },
//     {
//         key: '2',
//         name: 'Joe Black',
//         date: "12/2/2222",
//         category: 'London No. 1 Lake Park',
//         sold: 727,
//         status: "hết hàng",
//         soluong: 1000,
//         image: 'https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg',
//     },
//     {
//         key: '3',
//         name: 'Jim Green',
//         date: "12/2/2222",
//         category: 'Sydney No. 1 Lake Park',
//         sold: 727,
//         status: "hết hàng",
//         soluong: 200,
//         image: 'https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg',
//     },

// ];
const Product = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<DataType[]>([]);
    console.log('data - ', data)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('');
    const [categories, setCategories] = useState<{
        _id: string
        , name: string
    }[]>([]);
    const [sizes, setSizes] = useState<{ _id: string, size: string }[]>([])
    useEffect(() => {
        ; (async () => {
            try {
                const response = await instance.get('api/variant')
                setSizes(response.data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                const response = await instance.get('api/categories')
                setCategories(response.data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    useEffect(() => {
        fetchDataProduct()
    }, [])
    const fetchDataProduct = async () => {
        try {

            const response = await instance.get('api/product');
            setData(response.data.datas.docs)
        } catch (error) {
            console.log(error)
        }
    }
    const confirmDelete = async (productId: string) => {
        try {
            await instance.delete(`api/product/${productId}`)
        } catch (error) {
            console.log(error)
        } finally {
            fetchDataProduct()
            message.success("xoá thành công")
        }

    };
    const cancelDelete = () => {
        message.error('Product deletion cancelled');
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
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
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '2%',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image', width: '10%',
            render: (image) => <img src={image} alt="Product" className='w-16 !aspect-square object-cover shrink-0' />,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Danh Mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width: '10%',
            render: (categoryId) => <p>{categories.find(item => item._id === categoryId)?.name}</p>
        },
        {
            title: 'Kích thước',
            dataIndex: 'sizeId',
            key: 'sizeId',
            width: '15%',
            render: (sizeId: string[]) => <p>{sizeId.map(item => sizes.find(i => i._id === item)?.size || '').join(', ')}</p>
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
            width: '10%',
            ...getColumnSearchProps('color'),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (price) => <p>{formatPrice(price)}</p>
        },
        {
            title: 'Giá khuyến mại',
            dataIndex: 'priceSale',
            key: 'priceSale',
            width: '10%',
            render: (priceSale) => <p>{formatPrice(priceSale)}</p>
        },
        {
            title: 'Ngày',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
            // ...getColumnSearchProps('createdAt'),
            // sorter: (a, b) => a.createdAt.length - b.createdAt.length,
            // sortDirections: ['descend', 'ascend'],
            render: (createdAt) => <p>{dayjs(createdAt).format('HH:MM DD-MM-YYYY')}</p>
        },
        // {
        //     title: 'Số lượng',
        //     dataIndex: 'soluong',
        //     key: 'soluong',
        //     width: '10%',
        //     ...getColumnSearchProps(''),
        //     sorter: (a, b) => a.sold - b.sold,
        //     sortDirections: ['descend', 'ascend'],
        // },
        // {
        //     title: 'Đã bán',
        //     dataIndex: 'sold',
        //     key: 'sold',
        //     width: '10%',
        //     ...getColumnSearchProps('sold'),
        //     sorter: (a, b) => a.sold - b.sold,
        //     sortDirections: ['descend', 'ascend'],
        // },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: '10%',
        //     ...getColumnSearchProps(''),
        //     sorter: (a, b) => a.status.length - b.status.length,
        //     sortDirections: ['descend', 'ascend'],
        //     render: (status) => {
        //         const statusColor = status === 'còn hàng' ? 'text-green-500' : 'text-red-500';
        //         return <p className={statusColor}>{status}</p>;
        //     },
        // },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            // const post = posts?.find((post: IPost) => post._id === record._id);

                            // form.setFieldsValue({
                            //   _id: post?._id,
                            //   title: post?.title,
                            //   images: post?.images,
                            //   description: post?.description,
                            // });
                            // showModal('edit');
                            navigate(`/admin/products/edit/${record._id}`)
                        }}
                        ghost
                    >
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Button>

                    <Popconfirm
                        placement="topRight"
                        title="Xóa bài viết?"
                        description="Bạn có chắc chắn xóa bài viết này không?"
                        onConfirm={() => confirmDelete(record._id)}
                        onCancel={cancel}
                        okText="Đồng ý"
                        cancelText="Không"
                    >
                        <Button type="primary" danger>
                            <DeleteOutlined style={{ display: 'inline-flex' }} />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    const cancel = () => {
        message.error('Đã hủy!');
    };
    const showModal = (mode: string) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} chưa nhập!',
    };

    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        if (modalMode === 'add') {
            const images = values?.images?.fileList?.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ({ response }: any) => response.data.url
            );

            const newValues = { ...values, images };

            //call api
            message.success(`Tạo  thành công!`);
        } else if (modalMode === 'edit') {
            //console.log("values", values);

            const newImages = values.images.fileList
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                values.images.fileList.map(({ response }: any) => response.data.url)
                : values.images;

            const newValues = { ...values, images: newImages };
            const { _id, ...post } = newValues;

            //   await dispatch(updatePostMid({_id, post}));
            message.success(`Sửa  thành công!`);
        }
        setIsModalOpen(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFiles = async (file: any) => {
        if (file) {
            const CLOUD_NAME = 'clouur-your-name';
            const PRESET_NAME = 'clouur-your-name';
            const FOLDER_NAME = 'clouur-your-name';
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData();
            formData.append('upload_preset', PRESET_NAME);
            formData.append('folder', FOLDER_NAME);
            formData.append('file', file);

            const response = await axios.post(api, formData);

            return response;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customRequest = async ({ file, onSuccess, onError }: any) => {
        try {
            // Gọi hàm tải lên ảnh của bạn và chờ kết quả
            const response = await uploadFiles(file);
            // Kiểm tra kết quả và xử lý tùy theo trạng thái tải lên
            if (response?.status === 200) {
                message.success(`${file.name} uploaded successfully`);
                onSuccess(response, file);
            } else {
                message.error(`${file.name} upload failed.`);
                onError(response);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            message.error('An error occurred while uploading the image.');
            onError(error);
        }
    };
    return (
        <div >
            <div className='flex justify-between items-center mx-[50px] my-4'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Sản phẩm
                    </p>
                </div>
                <div className="flex justify-end mb-2">
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className="bg-[#1677ff]"
                        onClick={() => {
                            // form.resetFields();
                            // showModal('add');
                            navigate('/admin/products/add')
                        }}
                    ></Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />

        </div>
    )
}

export default Product
