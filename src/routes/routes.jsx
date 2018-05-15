import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from '../pages/Home';
import Card from '../components/card/card';
import Coin from '../components/coin/coin';
import Test from '../pages/Test';

const Routes = () => (
  <div className="container-fluid mt-4 d-flex flex-wrap justify-content-evenly">
    <Switch>
      <Route exact path="/" component={Card} />
      <Route path="/test" component={Home} />
      <Route path="/coin/:name" component={Coin} />
      <Route path="/error" component={Test} />
      <Redirect from="*" to="/" />
    </Switch>
  </div>
);

export default Routes;
