import StatisticsByWeek from './StatisticsByWeek'
import StatisticsByMonth from './StatisticsByMonth'
import StatisticsByYear from './StatisticsByYear'
import { ConfigProvider } from 'antd'

import locale from 'antd/locale/vi_VN'
import dayjs from 'dayjs'

import 'dayjs/locale/vi'

dayjs.locale('vi')

const RevenueStatistics = () => {
    return (
        <ConfigProvider locale={locale}>
            <StatisticsByWeek />
            <StatisticsByMonth />
            <StatisticsByYear />
        </ConfigProvider>
    )
}

export default RevenueStatistics
