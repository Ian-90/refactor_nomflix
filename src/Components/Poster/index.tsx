import { Link } from "react-router-dom";
import * as S from "./styled";

interface IPosterProps {
  id: number;
  imageUrl: string | null;
  title: string;
  rating: number;
  year: string;
  isMovie: boolean;
}

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
}: IPosterProps) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <S.Container>
      <S.ImageContainer>
        <S.Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <S.Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>
          {rating}/10
        </S.Rating>
      </S.ImageContainer>
      <S.Title>
        {title.length > 15 ? `${title.substring(0, 15)}...` : title}
      </S.Title>
      <S.Year>{year}</S.Year>
    </S.Container>
  </Link>
);

export default Poster;
