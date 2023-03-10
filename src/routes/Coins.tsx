import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { isDartAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(33, 1fr);
  gap: 5px;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in;

  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  :hover {
    background-color: #e8e8e8;
  }

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: grid;
    grid-template-rows: 1fr, 1fr;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Txt = styled.h3`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 35px;
    height: 35px;
    margin-bottom: 5px;
  }
`;

interface CoinsInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.textColor};
`;

const Head = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  display: inline;
  padding: 0px 10px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`;

function Coins() {
  const { isLoading, data } = useQuery<CoinsInterface[]>(
    ["allCoins"],
    fetchCoins
  );
  // [""]??? key name, array??? ?????????
  // isLoading??? boolean type????????? loading ????????? ?????? ???, fetchCoins??? ?????? ?????? data??? ?????? ??????
  // data??? type??? TS??? ??????????????? ????????? useQuery??? ????????? json??? CoinInterface??? ?????? ????????? ???????????? ?????????

  const setter = useSetRecoilState(isDartAtom); // isDarkAtom??? state??? ????????? useState??? set ?????? ??????
  const toggleBtn = () => {
    setter((current) => !current);
  };

  return (
    <Container>
      <Helmet>
        <title>COINS</title>
      </Helmet>
      <Head>
        <span onClick={toggleBtn}>Toggle</span>
      </Head>
      <Header>
        <Title>COINS</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 99).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                  // Link??? data ?????? ?????? ???????????? ????????? ??? ??????
                }}
              >
                <Img>
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                </Img>
                <Txt>{coin.name}</Txt>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
