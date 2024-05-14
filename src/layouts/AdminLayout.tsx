
import { Outlet } from 'react-router-dom'


const AdminLayout = () => {
  return (
    <div>
      <aside>Aside Admin</aside>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout