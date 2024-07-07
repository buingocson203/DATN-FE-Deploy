import React from 'react'
import StatisticsByWeek from './StatisticsByWeek'
import StatisticsByMonth from './StatisticsByMonth'
import StatisticsByYear from './StatisticsByYear'

const RevenueStatistics = () => {
    return (
        <>
            <StatisticsByWeek />
            <StatisticsByMonth />
            <StatisticsByYear />
        </>
    )
}

export default RevenueStatistics
