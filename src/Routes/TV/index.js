import styled from "styled-components";
import Section from "components/Section";
import Loader from "components/Loader";
import Message from "components/Message";
import Poster from "components/Poster";
import Helmet from "react-helmet";
import { useFetch } from "hooks/useFetch";
import { tvApi } from "api";
import { useTopRatedQuery } from "queries/tv/useTopRatedQuery";
import { usePopularQuery } from "queries/tv/usePopularQuery";

const Container = styled.div`
  padding: 20px;
`;

const TV = () => {
  const {
    isLoading: isTopRatedLoading,
    data: topRated,
    error: topRatedErr,
  } = useTopRatedQuery();
  const {
    isLoading: isTVPopularLoading,
    data: tvPopular,
    error: tvPopularErr,
  } = usePopularQuery();
  const {
    isLoading: isAiringToday,
    data: airingToday,
    error: airingTodayErr,
  } = useFetch(tvApi.airingToday);

  return (
    <>
      <Helmet>
        <title>TV Shows | Nomflix</title>
      </Helmet>
      <Container>
        {isTopRatedLoading ? (
          <Loader />
        ) : (
          <>
            {topRated && topRated.results.length > 0 && (
              <Section title="Top Rated Shows">
                {topRated.results.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    title={show.original_name}
                    imageUrl={show.poster_path}
                    rating={show.vote_average}
                    year={
                      show.first_air_date && show.first_air_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {isTVPopularLoading ? (
          <Loader />
        ) : (
          <>
            {tvPopular && tvPopular.results.length > 0 && (
              <Section title="Popular Shows">
                {tvPopular.results.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    title={show.original_name}
                    imageUrl={show.poster_path}
                    rating={show.vote_average}
                    year={
                      show.first_air_date && show.first_air_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {isAiringToday ? (
          <Loader />
        ) : (
          <>
            {airingToday && airingToday.length > 0 && (
              <Section title="Airing Today">
                {airingToday.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    title={show.original_name}
                    imageUrl={show.poster_path}
                    rating={show.vote_average}
                    year={
                      show.first_air_date && show.first_air_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {topRatedErr && <Message color="#e74c3c" text={topRatedErr} />}
        {airingTodayErr && <Message color="#e74c3c" text={airingTodayErr} />}
        {tvPopularErr && <Message color="#e74c3c" text={tvPopularErr} />}
      </Container>
    </>
  );
};

export default TV;
