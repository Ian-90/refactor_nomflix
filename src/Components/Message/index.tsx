import * as S from "./styled";

interface IMessageProps {
  text: string;
  color: string;
}

const Message = ({ text, color }: IMessageProps) => (
  <S.Container>
    <S.Text color={color}>{text}</S.Text>
  </S.Container>
);

export default Message;
