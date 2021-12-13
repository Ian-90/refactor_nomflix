import { tvApi } from 'api'
import { useState, useEffect } from 'react'

export const useAiringToday = () => {
  const [airingToday, setAiringToday] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAiringToday = async () => {
    setIsLoading(true)
    try {
      const { data: { results } } = await tvApi.airingToday()
      setAiringToday(results)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAiringToday()
  }, [])

  return {
    isLoading,
    airingToday,
    error
  }
}
