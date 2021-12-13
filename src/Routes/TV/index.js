import React from 'react';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import Helmet from 'react-helmet';
import { useTopRated } from 'hooks/useTopRated';
import { useAiringToday } from 'hooks/useAiringToday';
import { useTVPopular } from 'hooks/useTVPopular';

const Container = styled.div`
  padding: 20px;
`;

const TV = () => {
  const { isLoading: isTopRatedLoading, topRated, error: topRatedErr } = useTopRated()
  const { isLoading: isTVPopularLoading, tvPopular, error: tvPopularErr } = useTVPopular()
  const { isLoading: isAiringToday, airingToday, error: airingTodayErr } = useAiringToday()

  return (
    <>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
      <Container>
        {
          isTopRatedLoading ? <Loader /> :
            <>
              {topRated && topRated.length > 0 && (
                <Section title="Top Rated Shows">
                  {topRated.map(show => (
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
            </>
        }
        {
          isTVPopularLoading ? <Loader /> :
            <>
              {tvPopular && tvPopular.length > 0 && (
                <Section title="Popular Shows">
                  {tvPopular.map(show => (
                    <Poster
                      key={show.id}
                      id={show.id}
                      title={show.original_name}
                      imageUrl={show.poster_path}
                      rating={show.vote_average}
                      year={show.first_air_date && show.first_air_date.substring(0, 4)}
                    />))}
                </Section>
              )}
            </>
        }
        {
          isAiringToday ? <Loader /> :
          <>
            {airingToday && airingToday.length > 0 && (
              <Section title="Airing Today">
                {airingToday.map(show => (
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
          </>
        }
        {topRatedErr && <Message color='#e74c3c' text={topRatedErr} />}
        {airingTodayErr && <Message color='#e74c3c' text={airingTodayErr} />}
        {tvPopularErr && <Message color='#e74c3c' text={tvPopularErr} />}
      </Container>
    </>
  )
}

export default TV
