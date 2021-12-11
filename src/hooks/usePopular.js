import { moviesApi } from 'api'
import { useState, useEffect } from 'react'

export const usePopular = () => {
  const [popular, setPopular] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getPopular = async () => {
    setIsLoading(true)
    try {
      const { data: { results } } = await moviesApi.popular()
      setPopular(results)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPopular()
  }, [])

  return {
    isLoading,
    popular,
    error
  }
}
