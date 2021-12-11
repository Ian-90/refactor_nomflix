import { moviesApi } from 'api'
import { useState, useEffect } from 'react'

export const useUpcoming = () => {
  const [upcoming, setUpcoming] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getUpcoming = async () => {
    setIsLoading(true)
    try {
      const { data: { results } } = await moviesApi.upcoming()
      setUpcoming(results)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUpcoming()
  }, [])

  return {
    isLoading,
    upcoming,
    error
  }
}
