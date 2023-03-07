import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Header from 'Components/Header';

const Router = () => (
  <BrowserRouter>
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tv" exact component={TV} />
        <Route path="/search" exact component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </> 
  </BrowserRouter>
)

export default Router
