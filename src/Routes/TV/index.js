import React, { useState, useEffect } from "react";
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

const TV = () => {
  const [topRated, setTopRated] = useState(null)
  const [popular, setPopular] = useState(null)
  const [airingToday, setAiringToday] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getTVData = async () => {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();
      const {
        data: { results: popular }
      } = await tvApi.popular();
      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();

      setTopRated(topRated)
      setPopular(popular)
      setAiringToday(airingToday)
    } catch {
      setError("Can't find TV information.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTVData()
  }, [])

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      error={error}
      loading={loading}
    />
  )
}

export default TV
