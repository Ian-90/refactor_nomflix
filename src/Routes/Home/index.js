import React, { useState, useEffect } from 'react'
import { moviesApi } from 'api'
import styled from 'styled-components'
import Section from 'Components/Section'
import Loader from 'Components/Loader'
import Message from 'Components/Message'
import Poster from 'Components/Poster'
import Helmet from 'react-helmet'

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [upcoming, setUpcoming] = useState(null)
  const [popular, setPopular] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      const {
        data: { results: nowPlayingData }
      } = await moviesApi.nowPlaying();

      const {
        data: { results: upcomingData}
      } = await moviesApi.upcoming();

      const {
        data: { results: popularData}
      } = await moviesApi.popular();
        setNowPlaying(nowPlayingData)
        setUpcoming(upcomingData)
        setPopular(popularData)
    } catch {
      setError("Can't find movies information.")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      {loading ? <Loader /> :
        <Container>
          <Helmet>
            <title>Movies | Nomflix</title>
          </Helmet>
          {nowPlaying && nowPlaying.length > 0 && <Section title="Now Playing">
            {nowPlaying.map(movie => (
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
          </Section>}
          {upcoming && upcoming.length > 0 && <Section title="Upcoming Playing">
            {upcoming.map(movie => (
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
          </Section>}
          {popular && popular.length > 0 && <Section title="Popular Movies">
            {popular.map(movie => (
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
          </Section>}
        {error && <Message color='#e74c3c' text={error} />}
      </Container>}
    </>
  )
}

const Container = styled.div`
  padding: 20px;
`;

export default Home;