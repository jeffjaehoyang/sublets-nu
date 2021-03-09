import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import About from '../../pages/About';
import HousingDetail from '../../pages/HousingDetail';
import HousingList from '../../pages/HousingList';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import HousingCreate from '../../pages/HousingCreate';
import Saved from '../../pages/Saved';
import MyListings from '../../pages/MyListings';
import Layout from '../Layout';
import ModalWrapper from '../Modal';
import PrivateRoute from '../PrivateRoute';
import NotFound from '../NotFound';

import { Provider } from 'react-redux';
import store from '../../context/store.js';
import { checkAuthentication } from '../../actions/auth';
import { fetchHousingListAction } from '../../actions/housing';
import { GA_TRACKING_ID } from '../../constants';
import RouteChangeTracker from '../RouteChangeTracker';
import ReactGA from 'react-ga';
import HousingEdit from '../../pages/HousingEdit';

ReactGA.initialize(GA_TRACKING_ID);

const App = () => {
  useEffect(() => {
    // check authentication state on app mount
    store.dispatch(checkAuthentication());
    store.dispatch(fetchHousingListAction());
  }, []);

  return (
    <Provider store={store}>
      <Router basename="static">
        <RouteChangeTracker />
        <ModalWrapper />
        <Layout>
          <Switch>
            <Route exact path="/" component={HousingList} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/my_listings" component={MyListings} />
            <PrivateRoute exact path="/saved" component={Saved} />
            <PrivateRoute exact path="/housing/upload" component={HousingCreate} />
            <PrivateRoute exact path="/housing/:id" component={HousingDetail} />
            <PrivateRoute exact path="/housing/edit/:id" component={HousingEdit} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
