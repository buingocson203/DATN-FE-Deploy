
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from './components/ui/toaster.tsx'
import { AuthProvider } from './hooks/AuthContext.js'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <BrowserRouter>
      <App />

    </BrowserRouter>
    </AuthProvider>
     <Toaster/>
     <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  
    
  
)
