import React, { useState } from 'react';
import { moviesApi, tvApi } from 'api';
import styled from 'styled-components';
import Loader from 'components/Loader';
import Section from 'components/Section';
import Message from 'components/Message';
import Poster from 'components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
  `;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const Search = () => {
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
    <Container>
    <Helmet>
      <title>Search | Nomflix</title>
    </Helmet>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Movies or TV Shows..."
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {isLoading ? (
      <Loader />
      ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                imageUrl={movie.poster_path}
                rating={movie.vote_average}
                isMovie={true}
                year={movie.release_date && movie.release_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Shows Results">
            {tvResults.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                title={show.original_name}
                imageUrl={show.poster_path}
                rating={show.vote_average}
                year={show.first_air_date && show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {error && <Message color='#e74c3c' text={error} />}
        {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && <Message text="Noting found" color="#95a6a5" />}
      </>
      )}
  </Container>
  )
}

export default Search
