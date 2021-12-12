import React, { useState, useEffect } from "react";
import { tvApi } from 'api';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';
import Helmet from 'react-helmet';

const Container = styled.div`
  padding: 20px;
`;

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
    <>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
     {loading ? 
      <Loader /> :
        <Container>
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
          {popular && popular.length > 0 && (
            <Section title="Popular Shows">
              {popular.map(show => (
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
        {error && <Message color='#e74c3c' text={error} />}
      </Container>}
    </>
  )
}

export default TV
