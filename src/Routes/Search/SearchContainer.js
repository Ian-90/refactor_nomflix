import React, { useState } from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from 'api';

const SearchContainer = () => {
  const [movieResults, setMovieResults] = useState(null)
  const [tvResults, setTVResults] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchByTerm = async () => {
    setIsLoading(true)
    try {
      const {
        data: { results: movieApiResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvApiResults }
      } = await tvApi.search(searchTerm);
      setMovieResults(movieApiResults)
      setTVResults(tvApiResults)
    } catch {
      setError("Can't find results.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm !== '') {
      searchByTerm()
    }
  }

  const updateTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      searchTerm={searchTerm}
      error={error}
      loading={isLoading}
      handleSubmit={handleSubmit}
      updateTerm={updateTerm}
    />
  )
}

export default SearchContainer
