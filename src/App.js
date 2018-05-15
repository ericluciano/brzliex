import React, { Component } from 'react';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// action creators
import { callApiMercado, callApiHistorico, checkLoading, callApiCurrencies } from './reducers/criptoActions';

// components
import BarFixedTop from './components/barFixedTop/barFixedTop';
import Header from './components/header/header';
import ModalCurrency from './components/modalCurrency/modalCurrency';
import BarAfterHeader from './components/barAfterHeader/barAfterHeader';
import Tabs from './components/tabs/tabs';

// utils
import { formatCurrencyToBr } from './utils/utils';

class App extends Component {
  static mountValuesFixedTop(v) {
    const item = {
      uc: formatCurrencyToBr(v.dataMercado.last || 0),
      cma: formatCurrencyToBr(v.dataMercado.highestBid24 || 0),
      cmb: formatCurrencyToBr(v.dataMercado.lowestAsk24 || 0),
      volume: formatCurrencyToBr(v.dataMercado.quoteVolume24 || 0),
      active: v.barTopActive,
    };
    return item;
  }

  constructor(props) {
    super(props);

    this.state = {
      tempo: 60000 * 5,
    };
  }

  componentWillMount() {
    this.call();
  }

  componentDidMount() {
    setInterval(() => {
      this.call();
    }, this.state.tempo);
  }

  getCompra(type) {
    const dados = this.props.dataHistorico;

    let i = 0;
    let totalCompra = parseFloat(0);
    let totalVenda = parseFloat(0);

    dados.forEach((f) => {
      if (f.type === 'buy') {
        i += 1;
        totalCompra += Number(f.total);
      }
      totalVenda += Number(f.total);
    });

    const items = {
      buy: i,
      sell: 100 - i,
      total: 100,
      totalCompra: formatCurrencyToBr(totalCompra),
      totalVenda: formatCurrencyToBr(totalVenda),
      totalGeral: formatCurrencyToBr(totalVenda + totalCompra),
    };

    return items[type];
  }

  call() {
    this.props.checkLoading(true);
    this.props.callApiMercado(this.props.moedaAtual);
    this.props.callApiHistorico(this.props.moedaAtual);
    // this.props.callApiCurrencies();
  }

  load() {
    const load = this.props.loading === true ?
      'active' : 'inactive';

    return (
      <div className={`loading ${load}`}>
        <div className="spinner" />
        <div className="message">{this.props.errorMessage}</div>
      </div>
    );
  }

  render() {
    const bar = App.mountValuesFixedTop(this.props);
    return (
      <div className="container-fluid">
        {this.load()}
        <BarFixedTop
          uc={bar.uc}
          cma={bar.cma}
          cmb={bar.cmb}
          volume={bar.volume}
          active={bar.active}
        />
        <div className="row">
          <Header moedaLogo={this.props.moedaAtual} />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <BarAfterHeader compra={this.getCompra('buy')} venda={this.getCompra('sell')} total={this.getCompra('total')} totalCompra={this.getCompra('totalCompra')} totalVenda={this.getCompra('totalVenda')} totalMontante={this.getCompra('totalGeral')} />
            <Tabs />
          </div>
        </div>
        <ModalCurrency />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  moedaAtual: state.cripto.moedaAtual,
  modalChangeCripto: state.cripto.modalChangeCripto,
  dataMercado: state.cripto.dataMercado,
  dataHistorico: state.cripto.dataHistorico,
  loading: state.cripto.loading,
  barTopActive: state.cripto.barTopActive,
  errorMessage: state.cripto.errorMessage,
  currencies: state.cripto.currencies,
});

const mapDispatchToProps =
dispatch => bindActionCreators({
  callApiMercado,
  callApiHistorico,
  checkLoading,
  callApiCurrencies,
}, dispatch);

App.defaultProps = {
  dataHistorico: {},
  errorMessage: '',
};

App.propTypes = {
  callApiMercado: PropTypes.func.isRequired,
  callApiHistorico: PropTypes.func.isRequired,
  // callApiCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  moedaAtual: PropTypes.string.isRequired,
  dataHistorico: PropTypes.instanceOf(Object),
  checkLoading: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
