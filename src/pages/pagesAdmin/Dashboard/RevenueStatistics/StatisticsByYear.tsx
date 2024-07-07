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
    'T1/2024',
    'T2/2024',
    'T3/2024',
    'T4/2024',
    'T5/2024',
    'T6/2024',
    'T7/2024',
    'T8/2024',
    'T9/2024',
    'T10/2024',
    'T11/2024',
    'T12/2024'
]

export const data = {
    labels,
    datasets: [
        {
            label: 'Doanh thu',
            data: labels.map(() => Math.random() * 1000),
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }
    ]
}

const StatisticsByYear = () => {
    return (
        <div className='mb-4'>
            <div className='bg-white rounded-lg border'>
                <div className='px-3 py-4 border-b'>
                    <p className='font-semibold'>Thống kê doanh thu theo năm</p>
                </div>

                <div className='p-3'>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    )
}

export default StatisticsByYear
