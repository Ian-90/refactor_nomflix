import * as S from "./styled";
import { PropsWithChildren } from "react";

interface ISectionProps {
  title: string;
}

const Section = ({ title, children }: PropsWithChildren<ISectionProps>) => (
  <S.Container>
    <S.Title>{title}</S.Title>
    <S.Grid>{children}</S.Grid>
  </S.Container>
);

export default Section;
