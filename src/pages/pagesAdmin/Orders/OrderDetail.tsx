import { IOrder } from '@/common/interfaces/order'
import Detail from '@/components/crud/detail'
import { ORDER_PAYMENT_NAMES, ORDER_PAYMENT_STATUS_NAMES, ORDER_STATUS_NAMES } from '@/constants/data'
import { formatPrice } from '@/lib/utils'
import { getOrder } from '@/services/order'
import { AntDesignOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, DescriptionsProps, Form, Input, List, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface FieldType {
    code: string
    createdAt: string
    updatedAt: string
    paymentType: string
    totalAmountPaid: string
    totalPrice: string
    orderStatus: string
    paymentStatus: string
    address: string
}

const OrderDetail = () => {
    const { orderId } = useParams()
    const [form] = Form.useForm()

    const [data, setData] = useState<IOrder>()

    const fetchOrder = async () => {
        const res = await getOrder(orderId)
        if (res?.data) {
            console.log(res.data)
            const data: IOrder = res.data
            setData(data)
            form.setFieldsValue({
                code: data.codeOrders,
                createdAt: data?.createdAt && dayjs(data.createdAt).format('HH:MM DD-MM-YYYY'),
                updatedAt: data?.updatedAt && dayjs(data.updatedAt).format('HH:MM DD-MM-YYYY'),
                paymentType: data?.paymentMethod && ORDER_PAYMENT_NAMES[data.paymentMethod],
                totalAmountPaid: data?.total_amount_paid && formatPrice(data.total_amount_paid),
                totalPrice: data?.total_price && formatPrice(data.total_price),
                orderStatus: data?.orderStatus && ORDER_STATUS_NAMES[data.orderStatus],
                paymentStatus: data?.paymentStatus && ORDER_PAYMENT_STATUS_NAMES[data.paymentStatus]
            })
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    const items: DescriptionsProps['items'] = [
        {
            label: 'Khách hàng',
            children: data?.user_id?.userName
        },
        {
            label: 'Số điện thoại',
            children: data?.phone
        },
        {
            label: 'Địa chỉ',
            children: data?.address
        }
    ]

    const renderForm = () => {
        return (
            <>
                <Form form={form} layout='vertical'>
                    <Form.Item<FieldType> name='createdAt' label='Ngày tạo đơn'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='updatedAt' label='Ngày chỉnh sửa'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='paymentType' label='Hình thức thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='totalAmountPaid' label='Tổng số tiền thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='totalPrice' label='Tống số chi trả'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='orderStatus' label='Trạng thái'>
                        <Input readOnly disabled />
                    </Form.Item>
                    <Form.Item<FieldType> name='paymentStatus' label='Trạng thái thanh toán'>
                        <Input readOnly disabled />
                    </Form.Item>
                </Form>
                <Typography>Danh sách sản phẩm:</Typography>
                <List
                    itemLayout='horizontal'
                    dataSource={data?.productDetails}
                    renderItem={(item, index) => (
                        <List.Item extra={item.quantityOrders && `x${item.quantityOrders}`}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        src={item.image}
                                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64, xxl: 64 }}
                                        icon={<AntDesignOutlined />}
                                    />
                                }
                                title={`${item.productName}` + (item.sizeName && ' (size ' + `${item.sizeName}` + ')')}
                                description={item?.price && formatPrice(item.price)}
                            />
                        </List.Item>
                    )}
                />
            </>
        )
    }

    return (
        <Detail name='Đặt hàng'>
            <Descriptions
                column={{
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 3,
                    xl: 3,
                    xxl: 3
                }}
                title={`Chi tiết đơn hàng: ${data?.codeOrders ?? ''}`}
                items={items}
            />
            {renderForm()}
        </Detail>
    )
}

export default OrderDetail
