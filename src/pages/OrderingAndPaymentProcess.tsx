import { Typography } from 'antd'

const { Paragraph, Title } = Typography

const OrderingAndPaymentProcess = () => {
    return (
        <div className='app-container'>
            <Title level={4}>Quy trình đặt hàng và thanh toán</Title>
            <Paragraph>Quy trình đặt hàng và thanh toán:</Paragraph>

            <Paragraph strong>Cách 1: Thanh toán sau (COD – giao hàng và thu tiền tận nơi):</Paragraph>
            <Paragraph>
                Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;
                <br />
                Bước 2: Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);
                <br />
                Bước 3: FSNEAKER SPORT xác nhận thông tin Người mua;
                <br />
                Bước 4: FSNEAKER SPORT chuyển hàng;
                <br />
                Bước 5: Người mua nhận hàng và thanh toán.
                <br />
                Với hình thức thanh toán khi nhận hàng, bạn sẽ chỉ thanh toán khi đơn hàng đến tay của bạn và bạn chỉ
                cần trả đúng số tiền in trên hóa đơn. Nếu bạn thấy giá trị trên hóa đơn không chính xác, bạn vui lòng
                liên hệ lại ngay cho chúng tôi qua số hotline: (+84) {``}
            </Paragraph>

            <Paragraph strong>Cách 2: Thanh toán online qua thẻ tín dụng, chuyển khoản:</Paragraph>
            <Paragraph>
                Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng tin;
                <br />
                Bước 2: Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);
                <br />
                Bước 3: Người bán xác nhận thông tin Người mua;
                <br />
                Bước 4: Ngưởi mua thanh toán qua số tài khoản do FSNEAKER SPORT cung cấp;
                <br />
                Bước 5: FSNEAKER SPORT chuyển hàng;
                <br />
                Bước 6: Người mua nhận hàng.
                <br />
                Đối với hình thức này, sau khi bạn đã tạo đơn hàng thành công ở trên website bạn vui lòng chuyển khoản
                tổng giá trị đơn hàng qua tài khoản sau đây:
                <br />
                Tên chủ tài khoản: {``}
                <br />
                Số tài khoản: {``}
                <br />
                Ngân hàng: {``}
                <br />
                Lưu ý: Khi bạn chuyển khoản, vui lòng nhập mã đơn hàng của bạn tại mục “Ghi chú”.
                <br />
                Sau khi bạn đã thanh toán và chuyển khoản xong, chúng tôi sẽ giao hàng đến cho bạn theo thời gian quy
                định tại “Chính Sách Giao Hàng” của chúng tôi.
            </Paragraph>
        </div>
    )
}

export default OrderingAndPaymentProcess
