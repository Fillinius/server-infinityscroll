import { useEffect, useState } from 'react'
import { BASEURL, TESTURL } from '../../../path/internalPath'
import { IDataFetch, INITIALDATA } from '../../type/type'

export const useFetch = (QUERY: string) => {
  const [data, setData] = useState<IDataFetch>(INITIALDATA)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<boolean | null | unknown>(null)

  useEffect(() => {
    getAsyncData(QUERY)
  }, [QUERY])

  useEffect(() => {
    if (error !== null) {
      setError(true)
      setIsLoading(false)
    }
  }, [error])

  async function getAsyncData(query: string, startpoint = TESTURL) {
    try {
      setIsLoading(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-self-assign
      query ? (query = query) : (query = '')
      await fetch(`${startpoint}/${query}`)
        .then((res) => {
          if (!res.ok) throw new Error('Ошибка получения данных')
          return res.json()
        })
        .then((data) => setData(data))
      setIsLoading(false)
    } catch (error) {
      setError(error)
    }
  }
  return {
    data,
    isLoading,
    error,
  }
}
