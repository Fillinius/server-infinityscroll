import { Link } from 'react-router-dom'
import { UI_LINKS } from '../../path/internalPath'
import { styleList } from '../../shared/style/style'

export function NavBar() {
  return (
    <div style={styleList}>
      <div>
        <Link to={UI_LINKS.home}>Home</Link>
      </div>
      <ul>
        <li>
          <Link to={UI_LINKS.todos}>todo</Link>
        </li>
      </ul>
      <div>
        <Link to="#">SignIn</Link>
      </div>
    </div>
  )
}
