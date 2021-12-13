import { tvApi } from 'api'
import { useState, useEffect } from 'react'

export const useTVPopular = () => {
  const [tvPopular, setTVPopular] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getTVPopular = async () => {
    setIsLoading(true)
    try {
      const { data: { results } } = await tvApi.popular()
      setTVPopular(results)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTVPopular()
  }, [])

  return {
    isLoading,
    tvPopular,
    error
  }
}
