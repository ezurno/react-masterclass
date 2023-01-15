import { useParams } from "react-router-dom";

// 1번째 방법 => interface로 오브젝트 형식을 만들어 반환 한다.
interface RouteParams {
  coinId: string;
}

// 2번째 방법 => usePrams의 args에 (coinId : string) 으로 직접 반환한다.

export default function Coin() {
  const { coinId } = useParams<RouteParams>();
  console.log(coinId);
  return <h1>Coin : {coinId}</h1>;
}
