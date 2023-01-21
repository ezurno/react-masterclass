import { HashRouter, Route, Switch } from "react-router-dom";
// error 발생 시 typescript 전용 react-router-dom을 설치
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
