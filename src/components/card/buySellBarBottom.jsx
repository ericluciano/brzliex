import React from 'react';
import PropTypes from 'prop-types';
// utils
import { formatCurrencyToBr } from '../../utils/utils';

const buySellBarBottom = ({ highestBid24, lowestAsk24 }) => (
  <div
    className="info-top p-2 pr-4 pl-4 d-flex justify-content-between"
  >
    <span className="color-green" title="Compra mais alta em 24h">
      {formatCurrencyToBr(highestBid24 || 0)}
    </span>
    <span className="color-red" title="Compra mais baixa em 24h">
      {formatCurrencyToBr(lowestAsk24 || 0)}
    </span>
  </div>
);

buySellBarBottom.propTypes = {
  highestBid24: PropTypes.string.isRequired,
  lowestAsk24: PropTypes.string.isRequired,
};

export default buySellBarBottom;
