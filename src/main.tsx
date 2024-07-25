import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from './components/ui/toaster.tsx'
import { AuthProvider } from './hooks/AuthContext.js'
import { store } from './store/store'
import { ConfigProvider } from 'antd'
const queryClient = new QueryClient()

import locale from 'antd/locale/vi_VN'
import dayjs from 'dayjs'

dayjs.locale('zh-cn')
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={locale}>
            <AuthProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
        </ConfigProvider>
    </QueryClientProvider>
)
