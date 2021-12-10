import { moviesApi } from 'api'
import { useState, useEffect } from 'react'

export const useNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getNowPlaying = async () => {
    setIsLoading(true)
    try {
      const { data } = await moviesApi.nowPlaying()
      setNowPlaying(data)
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getNowPlaying()
  }, [])

  return {
    isLoading,
    nowPlaying,
    error
  }
}
