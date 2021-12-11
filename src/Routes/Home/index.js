import React from 'react'
import styled from 'styled-components'
import Section from 'Components/Section'
import Loader from 'Components/Loader'
import Message from 'Components/Message'
import Poster from 'Components/Poster'
import Helmet from 'react-helmet'
import { useNowPlaying } from 'hooks/useNowPlaying'
import { useUpcoming } from 'hooks/useUpcoming'
import { usePopular } from 'hooks/usePopular'

const Home = () => {
  const { isLoading: isNowPlayLoading, nowPlaying, error: nowPlayingErr } = useNowPlaying()
  const { isLoading: isUpcomingLoading, upcoming, error: upcomingErr } = useUpcoming()
  const { isLoading: isPopularLoading, popular, error: popularErr } = usePopular()

  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      <Container>
        {isNowPlayLoading ? <Loader /> : <>
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
        </>
        }
        {isUpcomingLoading ? <Loader /> : <>
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
        </>}
        {
          isPopularLoading ? <Loader /> : <>
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
          </>
        }
      {nowPlayingErr && <Message color='#e74c3c' text={nowPlayingErr} />}
      {upcomingErr && <Message color='#e74c3c' text={upcomingErr} />}
      {popularErr && <Message color='#e74c3c' text={popularErr} />}
    </Container>
    </>
  )
}

const Container = styled.div`
  padding: 20px;
`;

export default Home;