/* eslint class-methods-use-this:
["error", { "exceptMethods": ["setDocumentTitle", "reloadPage"] }] */
/* eslint-env es6 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Map from 'lodash/map';

import TradingViewWidget from 'react-tradingview-widget';
import OrdersTable from './ordersTable';
import NegociacaoTable from './negociacaoTable';
import CoinNameAndLogo from './coinNameAndLogo';
import Mercado from './mercado';

// symbols
import { symbolsCoin, moedas } from '../../constantes/moedas';


// action creators
import { checkLoading, setMoedaAtual, callApiOrderBook, changeCripto } from '../../reducers/criptoActions';

// utils
import { convertStringToLower, capitalize, formatCurrencyToBr } from '../../utils/utils';

class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: this.props.match.params.name,
      sigla: '',
      key: Math.random(),
      listOfSymbols: symbolsCoin,
      expand: '',
    };
  }
  componentWillMount() {
    // this.props.checkLoading(true);
    // this.setState({
    //   routeName: this.props.match.params.name,
    //   sigla: this.state.listOfSymbols[convertStringToLower(this.props.match.params.name)],
    //   listOfSymbols: symbolsCoin,
    // });
    // this.setDocumentTitle(this.props.match.params.name);
    // this.call(this.props.match.params.name);
    const { name } = this.props.match.params;
    const { listOfSymbols } = this.state;
    const key = Math.random();
    const expand = '';

    if (listOfSymbols[convertStringToLower(name)] === undefined) {
      window.location.href = '/brzliex';
      return;
    }
    this.mountComponent({
      routeName: name,
      sigla: listOfSymbols[convertStringToLower(name)],
      listOfSymbols: symbolsCoin,
      key,
      expand,
    });
  }

  // componentDidMount() {
  //   this.reloadPage();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.name !== this.state.routeName) {
      const nome = nextProps.match.params.name || '';
      this.mountComponent({
        routeName: nome,
        listOfSymbols: this.state.listOfSymbols,
        sigla: this.state.listOfSymbols[convertStringToLower(nome)],
        key: Math.random(),
        expand: '',
      });
      window.scrollTo(0, 0);
      document.getElementById('navCoin').scrollTop = 0;
      this.forceUpdate();
    }
  }

  getCompra() {
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
      buy: (i).toString(),
      sell: (100 - i).toString(),
      total: (100).toString(),
      totalCompra: formatCurrencyToBr(totalCompra).toString(),
      totalVenda: formatCurrencyToBr(totalVenda).toString(),
      totalGeral: formatCurrencyToBr(totalVenda + totalCompra).toString(),
    };

    return items;
  }

  setDocumentTitle(name) {
    document.title = `API Braziliex - ${capitalize(name).replace('-', ' ')}`;
  }

  mountComponent({
    routeName, sigla, listOfSymbols, key, expand,
  }) {
    this.props.checkLoading(true);
    this.setState({
      routeName,
      sigla,
      listOfSymbols,
      key,
      expand,
    });
    this.setDocumentTitle(routeName);
    this.call(routeName);
  }

  reloadPage() {
    this.mountComponent(this.state);
  }

  expandTrandingView() {
    const expand = !this.state.expand ? 'full' : '';
    this.setState({
      expand,
    });
  }

  call(moedaNome) {
    this.props.setMoedaAtual(convertStringToLower(moedaNome));
    this.props.callApiOrderBook(convertStringToLower(moedaNome));
    this.props.changeCripto(convertStringToLower(moedaNome));
  }
  mountOrdersAsks() {
    const orders = this.props.orderbook || [];
    const items = Map(orders.asks, order => (
      {
        price: order.price,
        amount: order.amount,
        total: order.price * order.amount,
      }
    ));
    return items;
  }

  mountOrdersBids() {
    const orders = this.props.orderbook || [];
    const items = Map(orders.bids, order => (
      {
        price: order.price,
        amount: order.amount,
        total: order.price * order.amount,
      }
    ));
    return items;
  }

  render() {
    const coins = moedas[convertStringToLower(this.state.routeName)];
    const {
      buy, sell, total, totalCompra, totalVenda, totalGeral,
    } = this.getCompra();
    return (
      <div
        key={this.state.key}
        className="d-flex justify-content-evenly align-items-center flex-wrap w-100 h-100 coinView"
      >
        <CoinNameAndLogo coins={coins} reload={() => this.reloadPage()} />
        <div className="d-flex flex-wrap w-100">
          <div className="col-12 col-lg-6 col-xl-6">
            <div
              className={`card p-2 mt-2 d-flex justify-content-evenly align-items-center flex-column ${this.state.expand}`}
            >
              <button
                className="btn btn-xs btn-outline-primary coinGraphExpandButton"
                onClick={() => this.expandTrandingView()}
              >
                <i className={(!this.state.expand) ? 'fa fa-expand' : 'fa fa-times'} />
              </button>
              <div className="pt-2 pb-2">
                {this.state.sigla ? this.state.sigla : '*Não Disponível'}
              </div>
              <div className="d-table p-2 w-100 h-100 coinGraph">
                <TradingViewWidget
                  symbol={this.state.sigla}
                  locale="br"
                  autosize
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-6">
            <div className="card p-2 mt-2 text-center coinNegociacaoInfo">
              <div className="row">
                <div className="col-12 col-lg-6 col-xl-6">
                  <Mercado compra={buy} venda={sell} total={total} />
                </div>
                <div className="col-12 col-lg-6 col-xl-6">
                  <Mercado
                    compra={totalCompra}
                    venda={totalVenda}
                    total={totalGeral}
                  />
                </div>
              </div>
            </div>
            <div
              className="card p-2 mt-2 d-flex
              justify-content-evenly align-items-center flex-column"
            >
              <NegociacaoTable key={Math.random()} />
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap w-100 pt-3 mb-3">
          <OrdersTable
            data={this.mountOrdersAsks()}
            title="ORDENS DE VENDA"
            type="sell"
            ids={this.state.key + Math.random()}
          />
          <OrdersTable
            data={this.mountOrdersBids()}
            title="ORDENS DE COMPRA"
            type="buy"
            ids={this.state.key + Math.random()}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, { history, match }) => ({
  loading: state.cripto.loading,
  moedaAtual: state.cripto.moedaAtual,
  orderbook: state.cripto.orderbook,
  dataHistorico: state.cripto.dataHistorico,
  match,
  history,
});

const mapDispatchToProps =
dispatch => bindActionCreators({
  checkLoading,
  setMoedaAtual,
  callApiOrderBook,
  changeCripto,
}, dispatch);

Coin.defaultProps = {
  orderbook: {},
};

Coin.propTypes = {
  checkLoading: PropTypes.func.isRequired,
  setMoedaAtual: PropTypes.func.isRequired,
  callApiOrderBook: PropTypes.func.isRequired,
  changeCripto: PropTypes.func.isRequired,
  dataHistorico: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  // moedaAtual: PropTypes.string.isRequired,
  orderbook: PropTypes.instanceOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin);
