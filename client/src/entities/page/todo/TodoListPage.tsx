import { Link } from 'react-router-dom'
import { UI_LINKS } from '../../../path/internalPath'
import { styleList } from '../../../shared/style/style'
import { IDataFetch } from '../../../shared/type/type'

interface TodoListProp {
  data: IDataFetch
  handleChangeCheck: (id: string) => void
}

export function TodoListPage({ data, handleChangeCheck }: TodoListProp) {
  return (
    <div style={styleList}>
      <Link to={UI_LINKS.todosDetail(data.id)}>
        <p>{data.first_name}</p>
        <p>{data.title}</p>
      </Link>
      <form>
        <input
          type="checkbox"
          checked={data.isChorse}
          onChange={() => handleChangeCheck(data.id)}
        />
      </form>
    </div>
  )
}
