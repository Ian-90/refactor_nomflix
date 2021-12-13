import { tvApi } from 'api'
import { useState, useEffect } from 'react'

export const useTopRated = () => {
  const [topRated, setTopRated] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getTopRated = async () => {
    setIsLoading(true)
    try {
      const { data: { results } } = await tvApi.topRated()
      setTopRated(results)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTopRated()
  }, [])

  return {
    isLoading,
    topRated,
    error
  }
}
