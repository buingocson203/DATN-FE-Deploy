
import { Outlet } from 'react-router-dom'

type Props = {}

const BaseLayout = (props: Props) => {
  return (
    <div>
      <header>header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  )
}

export default BaseLayout