import React from 'react';
import PropTypes from 'prop-types';

const mercado = ({ compra, venda, total }) => (
  <div>
    <span className="i-compra">
      <i className="far fa-fw fa-circle label-buy label-spacing" />
      {compra}
    </span>
    <span className="i-venda">
      <i className="far fa-fw fa-circle label-sell label-spacing" />
      {venda}
    </span>
    <span className="i-total">
      <i className="fa fa-fw fa-globe label-total label-spacing" />
      {total}
    </span>
  </div>
);

mercado.propTypes = {
  compra: PropTypes.string.isRequired,
  venda: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

export default mercado;
