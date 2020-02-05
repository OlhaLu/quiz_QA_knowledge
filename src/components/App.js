import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from '../routes';
import authOperations from '../redux/auth/authOperations';
/* import - components and pages */
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Loader from './Loader/Loader';
import PrivateRoute from '../servises/PrivateRoute';

const AuthPage = lazy(() =>
  import('../pages/AuthPage/AuthPage' /*webpackChunkName: "AuthPage"*/),
);

const MainPage = lazy(() =>
  import('../pages/MainPage/MainPage' /*webpackChunkName: "MainPage"*/),
);

const DashboardPage = lazy(() =>
  import(
    '../pages/DashboardPage/DashboardPageContainer' /*webpackChunkName: "DashboardPage"*/
  ),
);

const ResultPage = lazy(() =>
  import('../pages/ResultPage/ResultPage' /*webpackChunkName: "ResultPage"*/),
);

const MaterialsPage = lazy(() =>
  import(
    '../pages/MaterialsPage/MaterialsPage' /*webpackChunkName: "MaterialsPage"*/
  ),
);

const ContactsPage = lazy(() =>
  import(
    '../pages/ContactsPage/ContactsPage' /*webpackChunkName: "ContactsPage"*/
  ),
);

class App extends Component {
  componentDidMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Loader />
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={routes.AUTH_PAGE} component={AuthPage} />
            <PrivateRoute
              exact
              path={routes.DASHBOARD_PAGE}
              component={DashboardPage}
            />
            <PrivateRoute path={routes.RESULT_PAGE} component={ResultPage} />
            <PrivateRoute
              path={routes.MATERIALS_PAGE}
              component={MaterialsPage}
            />
            <PrivateRoute path={routes.MAIN_PAGE} component={MainPage} />

            <Route path={routes.CONTACTS_PAGE} component={ContactsPage} />

            <Redirect to={routes.MAIN_PAGE} />
          </Switch>
        </Suspense>
        <Footer />
      </BrowserRouter>
    );
  }
}

// const mapStateToProps=state=>({
// token
// })

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(authOperations.getCurrentUser()),
});

export default connect(null, mapDispatchToProps)(App);
