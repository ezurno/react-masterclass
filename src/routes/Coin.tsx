import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import Candle from "./Candle";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

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
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  background-color: ${(props) => props.theme.accentColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: "2021-11-10T16:51:15Z";
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isActive ? props.theme.textColor : props.theme.accentColor};
  padding: 7px 0px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
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

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const candleMatch = useRouteMatch("/:coinId/candle");
  // useRouteMatch??? url ??? ????????? ????????? object??? ???????????? hook, ????????? null??? return

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["ticker", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  ); // isLoading, data??? Info ??? tickers ??? ???????????? isLoading : rename ?????? ??????
  // key??? ???????????? ??????????????? ["", ] key, hash ????????? ??????
  // useQuery??? 3?????? args, ??????????????? ????????? ?????? refetch

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Link to={`/`}>
        <Head>HOME</Head>
      </Link>

      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name
            ? state.name.toUpperCase()
            : loading
            ? "Loading..."
            : infoData?.name.toUpperCase()}
          {/* state??? ???????????? name??? ?????????, ????????? ????????? loading????????? ?????? ??? ??? Loaing ??????, ?????? ?????? info??? name ?????? */}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={candleMatch !== null}>
              <Link to={`/${coinId}/candle`}>Candle</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price
                percent30m={tickersData?.quotes.USD.percent_change_30m}
                percent1h={tickersData?.quotes.USD.percent_change_1h}
                percent12h={tickersData?.quotes.USD.percent_change_12h}
                percent7d={tickersData?.quotes.USD.percent_change_7d}
                percent30d={tickersData?.quotes.USD.percent_change_30d}
                percent1y={tickersData?.quotes.USD.percent_change_1y}
              />
            </Route>
            <Route path={`/${coinId}/candle`}>
              <Candle coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
