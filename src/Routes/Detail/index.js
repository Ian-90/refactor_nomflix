import React, { useState, useEffect } from "react";
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from "../../api";

const Detail = ({
  location: { pathname },
  match: { params: { id } },
  history: { push }
}) => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMovie, setIsMovie] = useState(pathname.includes('/movie/'))

  const getDetailResults = async () => {
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/")
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parseId));
      } else {
        ({ data: result} = await tvApi.showDetail(parseId));
      }
    } catch {
      setError("Can't find anything.")
    } finally {
      setResult(result)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDetailResults()
  }, [])

  return (
    <DetailPresenter
      result={result}
      error={error}
      loading={isLoading}
    />
  )
}

export default Detail
