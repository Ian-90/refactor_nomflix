import styled from "styled-components";

export const Container = styled.div`
  font-size: 12px;
`;

export const Image = styled.div<{ bgUrl: string }>`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

export const Rating = styled.span`
  bottom: 5px;
  right: 4px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

export const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Rating} {
      opacity: 1;
    }
  }
`;

export const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

export const Year = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
`;
