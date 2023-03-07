import * as S from "./styled";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation()
  return (
    <S.Header>
      <S.List>
        <S.Item current={pathname === "/"}>
          <S.SLink to="/">Movies</S.SLink>
        </S.Item>
        <S.Item current={pathname === "/tv"}>
          <S.SLink to="/tv">TV</S.SLink>
        </S.Item>
        <S.Item current={pathname === "/search"}>
          <S.SLink to="/search">Search</S.SLink>
        </S.Item>
      </S.List>
    </S.Header>
  );
};

export default Header;
