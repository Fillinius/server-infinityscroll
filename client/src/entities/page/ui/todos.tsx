import { SetStateAction, useCallback, useRef, useState } from 'react'
import { TodoListPage } from '../todo/TodoListPage'
import { useSearch } from '../../../shared/lib/hooks/useSearch'

export const Todos = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [search, setSearch] = useState('')
  const { data, error, isLoading, hasMore, handleChangeCheck } = useSearch(
    search,
    pageNumber
  )
  // console.log(data)

  const listLoad = 20 // по сколько эл-тов будет загружаться

  // поиск по ссылке на dom узел
  const observer = useRef<IntersectionObserver | null>(null)
  const lastNodeRef = useCallback(
    (node: Element) => {
      if (isLoading) return
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('visible')

          setPageNumber((prev) => prev + 1)
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [isLoading, hasMore]
  )

  const handleAcs = () => {
    setPageNumber((p) => p + 1)
  }
  const handleDesc = () => {
    setPageNumber((p) => (p === 1 ? p : p - 1))
  }
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div>
        <button onClick={handleDesc}>PreviesPage</button>
        <button onClick={handleAcs}>NextPage</button>
        {<p>{pageNumber}</p>}
      </div>
      {error && <p>Ошибка получения данных</p>}
      {data.length === 0 && <p>Список пуст</p>}
      {
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Поиск по серверу"
        />
      }
      {isLoading && <h1>Загрузка данных</h1>}
      {data &&
        data.map((item, index) => {
          if (data.length - listLoad === index + 1) {
            return (
              <div ref={lastNodeRef} key={item.id}>
                <TodoListPage
                  data={item}
                  handleChangeCheck={handleChangeCheck}
                />
              </div>
            )
          } else {
            return (
              <div key={item.id}>
                <TodoListPage
                  data={item}
                  handleChangeCheck={handleChangeCheck}
                />
              </div>
            )
          }
        })}
    </>
  )
}
