import { useState, useEffect } from 'react'

export const useFetch = (apiInstance) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchApi = async () => {
    setIsLoading(true)
    try {
      const { data: { results } } = await apiInstance()
      setData(results)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return {
    isLoading,
    data,
    error
  }
}
