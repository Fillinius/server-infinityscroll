import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../lib/hooks/useFetch'

export function TodoCard() {
  const { todoId } = useParams()
  const { data, isLoading, error } = useFetch(todoId)
  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate('/todos', { replace: true })}>
        Return
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <p>UserId - {data.userId}</p>
      <p>Title- {data.title}</p>
    </>
  )
}
