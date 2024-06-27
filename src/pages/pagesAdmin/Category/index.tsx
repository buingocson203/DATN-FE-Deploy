import { useRef, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Space, Table, message } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

import { Link } from 'react-router-dom';

import Dragger from 'antd/es/upload/Dragger';
import axios from 'axios';
import { Option } from 'antd/es/mentions';
import Highlighter from 'react-highlight-words';
import ModalForm from '@/components/ModalForm/ModalForm';


type InputRef = GetRef<typeof Input>;

interface DataType {
    key: string;

    category: string
}

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
        key: '1',
        category: 'New York No. 1 Lake Park',

    },
    {
        key: '2',

        category: 'London No. 1 Lake Park',

    },
    {
        key: '3',

        category: 'Sydney No. 1 Lake Park',

    },

];
const Category = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('');


    const confirmDelete = async (productId: string) => {
        message.success("xoá thành công")
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
            title: 'Tên Danh Mục',
            dataIndex: 'category',
            key: 'category',
            width: '15%',
            ...getColumnSearchProps('category'),
        },



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
                            const post = posts?.find((post: IPost) => post._id === record._id);

                            form.setFieldsValue({
                              _id: post?._id,
                              title: post?.title,
                              images: post?.images,
                              description: post?.description,
                            });
                            showModal('edit');
                        }}
                        ghost
                    >
                        <EditOutlined style={{ display: 'inline-flex' }} />
                    </Button>

                    <Popconfirm
                        placement="topRight"
                        title="Xóa bài viết?"
                        description="Bạn có chắc chắn xóa bài viết này không?"
                        onConfirm={() => confirm(record.key)}
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

            //   await dispatch(updatePostMid({ _id, post }));
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
        <div>
            <div className='flex justify-between items-center mx-[50px] my-4'>
                <div>
                    <p className='text-[30px]' style={{ fontWeight: 900 }}>
                        Danh mục sản phẩm 
                    </p>
                </div>
                <div className="flex justify-end mb-2">
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        size={'large'}
                        className="bg-[#1677ff]"
                        onClick={() => {
                            form.resetFields();
                            showModal('add');
                        }}
                    ></Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
            {<ModalForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                form={form}
                modalMode={modalMode}
                classNames="!w-[1100px]"
            >
                <Form
                    form={form}
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                    className="flex gap-3 w-full"
                >
                    {modalMode === 'edit' && (
                        <Form.Item name="_id" style={{ display: 'none' }}>
                            <Input />
                        </Form.Item>
                    )}
                    <div className=" w-full ">
                        <Form.Item name="name" label="Tên" rules={[{ required: true }, { whitespace: true, message: '${label} is required!' }]}>
                            <Input.TextArea rows={2} placeholder="Name " />
                        </Form.Item>
                        
                    </div>

                    


                    
                </Form>
            </ModalForm> }
        </div>
    )
}

export default Category