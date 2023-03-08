import styled from "styled-components";
import Section from "components/Section";
import Loader from "components/Loader";
import Message from "components/Message";
import Poster from "components/Poster";
import Helmet from "react-helmet";
import { useNowPlayingQuery } from "queries/movies/useNowPlayingQuery";
import { useUpcomingQuery } from "queries/movies/useUpcomingQuery";
import { usePopularQuery } from "queries/movies/usePopularQuery";

const Home = () => {
  const {
    isLoading: isNowPlayLoading,
    data: nowPlaying,
    error: nowPlayingErr,
  } = useNowPlayingQuery();
  const {
    isLoading: isUpcomingLoading,
    data: upcoming,
    error: upcomingErr,
  } = useUpcomingQuery();
  const {
    isLoading: isPopularLoading,
    data: popular,
    error: popularErr,
  } = usePopularQuery();

  return (
    <>
      <Helmet>
        <title>Movies | Nomflix</title>
      </Helmet>
      <Container>
        {isNowPlayLoading ? (
          <Loader />
        ) : (
          <>
            {nowPlaying && nowPlaying.results.length > 0 && (
              <Section title="Now Playing">
                {nowPlaying.results.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imageUrl={movie.poster_path}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {isUpcomingLoading ? (
          <Loader />
        ) : (
          <>
            {upcoming && upcoming.results.length > 0 && (
              <Section title="Upcoming Playing">
                {upcoming.results.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imageUrl={movie.poster_path}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {isPopularLoading ? (
          <Loader />
        ) : (
          <>
            {popular && popular.results.length > 0 && (
              <Section title="Popular Movies">
                {popular.results.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    title={movie.original_title}
                    imageUrl={movie.poster_path}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {nowPlayingErr && (
          <Message color="#e74c3c" text={nowPlayingErr.status_message} />
        )}
        {upcomingErr && (
          <Message color="#e74c3c" text={upcomingErr.status_message} />
        )}
        {popularErr && (
          <Message color="#e74c3c" text={popularErr.status_message} />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 20px;
`;

export default Home;
