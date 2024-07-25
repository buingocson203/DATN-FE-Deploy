import { Link } from 'react-router-dom'
import './App.css'
import Routers from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <>
            <Routers />
            <ToastContainer />
        </>
    )
}

export default App
