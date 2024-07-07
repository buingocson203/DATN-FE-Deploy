import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart'
        }
    }
}

const labels = [
    '01/07',
    '02/07',
    '03/07',
    '04/07',
    '05/07',
    '06/07',
    '07/07',
    '20/07',
    '25/07',
    '26/07',
    '27/07',
    '28/07',
    '29/07',
    '30/07',
    '31/07'
]

export const data = {
    labels,
    datasets: [
        {
            label: 'Doanh thu',
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: 'rgba(54, 162, 235, 0.2)'
        }
    ]
}

const StatisticsByMonth = () => {
    return (
        <div className='mb-4'>
            <div className='bg-white rounded-lg border'>
                <div className='px-3 py-4 border-b'>
                    <p className='font-semibold'>Thống kê doanh thu theo tháng</p>
                </div>

                <div className='p-3'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    )
}

export default StatisticsByMonth
