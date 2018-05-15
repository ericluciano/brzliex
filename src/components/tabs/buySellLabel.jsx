import React from 'react';
import PropTypes from 'prop-types';

const configSpan = {
  buy: 'fa-circle',
  sell: 'fa-circle',
  total: 'fa-globe',
};

const buySellLabel = (props) => {
  const extClass = configSpan[props.tipo];
  const defClass = `label-${props.tipo}`;
  return (
    <i
      className={`far fa-fw ${extClass} ${defClass}`}
      title={props.tipo}
      alt={props.tipo}
    />
  );
};

buySellLabel.propTypes = {
  tipo: PropTypes.string.isRequired,
};

export default buySellLabel;
