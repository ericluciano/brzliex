import React from 'react';
import PropTypes from 'prop-types';
// utils
import { capitalize } from '../../utils/utils';

const coinNameAndLogo = ({ coins, reload }) => (
  <div
    className="w-100 m-1 pt-2 text-center coinName"
    onClick={reload}
    title="Clique para atualizar as informações"
    alt="Clique para atualizar informações"
    role="presentation"
  >
    <img
      src={coins.logo}
      alt={coins.nome}
      width={coins.width}
      height={coins.height}
      className="mr-2"
    />
    {capitalize(coins.nome)}
    <hr />
  </div>
);
coinNameAndLogo.defaultProps = {
  coins: {
    logo: 'none',
    nome: 'none',
    width: '0',
    height: '0',
  },
};
coinNameAndLogo.propTypes = {
  coins: PropTypes.instanceOf(Object),
  reload: PropTypes.func.isRequired,
};

export default coinNameAndLogo;
