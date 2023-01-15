import { useParams } from "react-router-dom";

export default function Coins() {
  const params = useParams();
  console.log(params);
  return <h1>Coins</h1>;
}
