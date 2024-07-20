import { Link } from 'react-router-dom'
import './App.css'
import Routers from './routes'
import { ToastContainer } from 'react-toastify'
import ContactButton from './layouts/base/ContactButton'

function App() {
    return (
        <>
            <Routers />
            <ToastContainer />
            <ContactButton />
        </>
    )
}

export default App
