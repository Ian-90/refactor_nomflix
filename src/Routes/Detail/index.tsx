import { useState, useEffect } from "react";
import { moviesApi, tvApi } from "../../api";
import styled from "styled-components";
import Loader from "components/Loader";
import Helmet from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div<{ bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div<{ bgImage: string }>`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Detail = () => {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMovie, setIsMovie] = useState(pathname.includes("/movie/"));

  const getDetailResults = async () => {
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parseId));
      } else {
        ({ data: result } = await tvApi.showDetail(parseId));
      }
    } catch {
      setError("Can't find anything.");
    } finally {
      setResult(result);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailResults();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Helmet>
            <title>Loading | Nomflix</title>
          </Helmet>
          <Loader />
        </>
      ) : (
        <Container>
          <Helmet>
            <title>
              {result && result.original_title
                ? result.original_title
                : result.original_name}{" "}
              | Nomflix
            </title>
          </Helmet>
          <Backdrop
            bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
          />
          <Content>
            <Cover
              bgImage={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                  : require("../../assets/noPosterSmall.png")
              }
            />
            <Data>
              <Title>
                {result.original_title
                  ? result.original_title
                  : result.original_name}
              </Title>
              <ItemContainer>
                <Item>
                  {result.release_date
                    ? result.release_date.substring(0, 4)
                    : result.first_air_date.substring(0, 4)}
                </Item>
                <Divider>∙</Divider>
                <Item>
                  {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                  min
                </Item>
                <Divider>∙</Divider>
                <Item>
                  {result.genres &&
                    result.genres.map((genre: { name: any; }, idx: number) =>
                      idx === result.genres.length - 1
                        ? genre.name
                        : `${genre.name} /`
                    )}
                </Item>
              </ItemContainer>
              <Overview>{result.overview}</Overview>
            </Data>
          </Content>
        </Container>
      )}
    </>
  );
};

export default Detail;
