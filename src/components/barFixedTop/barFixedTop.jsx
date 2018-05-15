import React from 'react';
import PropTypes from 'prop-types';

const barFixedTop = props => (
  <div className={`row bar-fixed-top ${props.active}`}>
    <div className="col-xs-12">
      <ul className="currency-market">
        <li className="last">
          UC: <span className="info-last">{props.uc}</span>
        </li>
        <li className="volume24">
          VOL/24h:
          <span className="info-quoteVolume24">{props.volume}</span>
        </li>
        <li className="highestBid24">
          CMA/24h: <span className="info-highestBid24">{props.cma}</span>
        </li>
        <li className="lowestAsk24">
          CMB/24h: <span className="info-lowestAsk24">{props.cmb}</span>
        </li>
      </ul>
    </div>
  </div>

);

barFixedTop.defaultProps = {
  active: '',
  uc: 0,
  volume: 0,
  cma: 0,
  cmb: 0,
};

barFixedTop.propTypes = {
  active: PropTypes.string,
  uc: PropTypes.string,
  volume: PropTypes.string,
  cma: PropTypes.string,
  cmb: PropTypes.string,
};

export default barFixedTop;
