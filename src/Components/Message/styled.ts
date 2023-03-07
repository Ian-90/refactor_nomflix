import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const Text = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 600;
`;
