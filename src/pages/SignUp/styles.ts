import styled from 'styled-components';
import { shade } from 'polished';
import BackGroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex; //um ao lado do outro
  align-items: stretch; //itens dentro do container terão tamanho total
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; //substitui o justify-content e align items center
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0 0 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #f4ede8;
    margin-top: 34px;
    transition: color 0.2s;
    align-items: center;
    display: flex;
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
export const BackGround = styled.div`
  flex: 1;
  background: url(${BackGroundImg}) no-repeat center;
  background-size: cover;
`;
