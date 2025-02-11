import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASEURL, TESTURL } from '../../../path/internalPath'
import { IDataFetch } from '../../type/type'

export function useSearch(query: string, pageNumber: number | string) {
  const [data, setData] = useState<IDataFetch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  console.log(data)

  useEffect(() => {
    setData([])
  }, [query])

  useEffect(() => {
    setError(false)
    let cancel: unknown
    axios({
      method: 'GET',
      // url: BASEURL.base,
      url: BASEURL.base,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
        setHasMore(res.data.length > 0)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
        console.log(e)
      })
    return () => cancel()
  }, [query, pageNumber])

  const handleChangeCheck = (id: string | number) => {
    const isCheck = data.map((item) => {
      if (item.id === id) {
        console.log('test')

        return {
          ...item,
          isChorse: !item.isChorse,
        }
      } else {
        return data
      }
    })
    return isCheck
  }

  return {
    data,
    isLoading,
    error,
    hasMore,
    handleChangeCheck,
  }
}
