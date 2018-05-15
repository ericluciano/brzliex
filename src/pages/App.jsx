import React, { Component } from 'react';
import PropTypes from 'prop-types';
// react router
import { BrowserRouter } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// action creators
import {
  // callApiMercado,
  // callApiHistorico,
  checkLoading } from '../reducers/criptoActions';

// file routes
import Routes from '../routes/routes';

// components
import Nav from '../components/nav/nav';


class App extends Component {
  load() {
    const load = this.props.loading === true ?
      'active' : 'inactive';

    return (
      <div className={`loading ${load}`}>
        <div className="spinner" />
      </div>
    );
  }
  render() {
    return (
      <BrowserRouter basename="/brzliex/">
        <div>
          <Nav />
          <Routes />
          {this.load()}
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = (state, { history, match }) => ({
  // moedaAtual: state.cripto.moedaAtual,
  // modalChangeCripto: state.cripto.modalChangeCripto,
  // dataMercado: state.cripto.dataMercado,
  // dataHistorico: state.cripto.dataHistorico,
  loading: state.cripto.loading,
  history,
  match,
  // barTopActive: state.cripto.barTopActive,
  // errorMessage: state.cripto.errorMessage,
  // currencies: state.cripto.currencies,
});

const mapDispatchToProps =
dispatch => bindActionCreators({
  // callApiMercado,
  // callApiHistorico,
  checkLoading,
  // callApiCurrencies,
}, dispatch);

App.defaultProps = {
  // dataHistorico: {},
  // errorMessage: '',
};

App.propTypes = {
  // callApiMercado: PropTypes.func.isRequired,
  // callApiHistorico: PropTypes.func.isRequired,
  // callApiCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // moedaAtual: PropTypes.string.isRequired,
  // dataHistorico: PropTypes.instanceOf(Object),
  // checkLoading: PropTypes.func.isRequired,
  // errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
