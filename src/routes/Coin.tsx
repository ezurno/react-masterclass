import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

// 1번째 방법 => interface로 오브젝트 형식을 만들어 반환 한다.
interface RouteParams {
  coinId: string;
}

// 2번째 방법 => usePrams의 args에 (coinId : string) 으로 직접 반환한다.

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteState {
  name: string;
}

export default function Coin() {
  const [loading, setLoading] = useState(true);

  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  //
  console.log(coinId);
  console.log(state);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
