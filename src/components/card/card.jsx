/* eslint class-methods-use-this:
["error", { "exceptMethods": ["getMoedasInfo", "getIconPercent", "balance", "mountCardInfo"] }] */
/* eslint-env es6 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// lodash
import sortBy from 'lodash/sortBy';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// moedas
import { moedas } from '../../constantes/moedas';

// action creators
import { callApiCurrencies, setMoedaAtual, callApiOrderBook } from '../../reducers/criptoActions';

import BuySellBarBottom from './buySellBarBottom';

// utils
import { formatCurrencyToBr, capitalize, convertToSlug, convertStringToLower } from '../../utils/utils';

class Card extends Component {
  componentWillMount() {
    this.props.callApiCurrencies();
    document.title = 'API Braziliex - Home';
  }

  getMoedasInfo(props) {
    return Object.values(moedas).filter(moeda => moeda.sigla === props);
  }

  getMarket(marketName) {
    const market = this.getMoedasInfo(marketName);
    const mktExist = market.length > 0 ?
      market : false;
    const nameMarket = (mktExist !== false) ? mktExist[0].nome : marketName;
    const imageMarket = (mktExist !== false) ? mktExist[0].logo : '';

    return { nameMarket, imageMarket };
  }

  getIconPercent(num) {
    let icon = 'fa-minus';
    if (num < 0) {
      icon = 'fa-caret-down';
    } else if (num >= 1) {
      icon = 'fa-caret-up';
    }
    return icon;
  }

  changeCoin(name) {
    this.props.setMoedaAtual(name);
    this.props.callApiOrderBook(name);
  }

  balance(name, price) {
    const values = this.props.privateBalance;
    const item = values.balance[name.split('_')[0]];
    return (item !== undefined) ? (
      <div className="saldo">
        <span className="reais">
          {formatCurrencyToBr(item * price)}
        </span>
        <span className="quantidade">
          QTD: {formatCurrencyToBr(item).replace('R$', ' ')}
        </span>
      </div>
    )
      : '';
  }

  mountCardImageName(props) {
    const {
      market, last, name, image,
    } = props;
    return (
      <div className="card-image p-4">
        {this.balance(market, last)}
        <h5
          className="card-title text-center"
        >
          <Link to={`/coin/${convertToSlug(name)}`} onClick={() => this.changeCoin(convertStringToLower(name))}>
            <img
              src={image}
              alt={name}
              title={name}
              width="52"
              height="52"
            />
          </Link>
        </h5>
        <h6
          className="card-subtitle text-center"
        >
          {capitalize(name)}
        </h6>
      </div>
    );
  }

  mountCardInfo(props) {
    const {
      quoteVolume24, last,
    } = props;
    return (
      <div className="card-text text-right">
        <div
          className="volume animateTop"
          title="Volume"
        >
          <span>
            {formatCurrencyToBr(quoteVolume24 || 0)}
          </span>
          <span>
            Volume 24h
          </span>
        </div>
        <div className="valor animateTop" title="Último Preço">
          <span>
            {formatCurrencyToBr(last || 0)}
          </span>
          <span>
            Último Preço
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { currencies } = this.props || [];
    const splitToBRL = Object.values(currencies).slice(0, 22);
    const limitToBRL = sortBy(splitToBRL, obj => parseInt(obj.quoteVolume24, 10)).reverse();
    const market = Object.values(limitToBRL).map((k) => {
      const { imageMarket, nameMarket } = this.getMarket(k.market);
      const colorPercent = k.percentChange >= 0 ? 'color-blue' : 'color-red';
      const iconPercent = this.getIconPercent(k.percentChange);
      return (
        <div key={Math.random()} className="col-12 col-md-6 col-xl-3 col-lg-4">
          <div className="card mt-3 mb-3">
            <div
              className="d-flex justify-content-around align-items-center"
            >
              {this.mountCardImageName({
                market: k.market, last: k.last, name: nameMarket, image: imageMarket,
              })}
              <div className="card-body card-body-home">
                {this.mountCardInfo({
                  quoteVolume24: k.quoteVolume24, last: k.last,
                })}

                <div
                  className={`variacao text-right animateTop ${colorPercent}`}
                  title="Variação"
                >
                  <span>
                    <i
                      className={`fa w-10 mr-2 ${colorPercent} ${iconPercent}`}
                    />
                    {k.percentChange} %
                  </span>
                  <span>
                    Variação 24h
                  </span>
                </div>
                <div className="text-right">
                  <Link
                    to={`/coin/${convertToSlug(nameMarket)}`}
                    onClick={() => this.changeCoin(convertStringToLower(nameMarket))}
                    className="mt-4 btn btn-sm btn-outline-primary"
                  >
                    Negociações
                  </Link>
                </div>
              </div>
            </div>
            <BuySellBarBottom
              highestBid24={k.highestBid24}
              lowestAsk24={k.lowestAsk24}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        {market}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state.cripto.currencies,
  moedaAtual: state.cripto.moedaAtual,
  orderbook: state.cripto.orderbook,
  privateBalance: state.cripto.privateBalance,
});

const mapDispatchToProps =
dispatch => bindActionCreators({
  callApiCurrencies,
  setMoedaAtual,
  callApiOrderBook,
}, dispatch);

Card.propTypes = {
  callApiCurrencies: PropTypes.func.isRequired,
  setMoedaAtual: PropTypes.func.isRequired,
  callApiOrderBook: PropTypes.func.isRequired,
  privateBalance: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
