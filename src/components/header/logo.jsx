/* eslint-disable global-require */
/* eslint no-trailing-spaces: "error" */
/* eslint class-methods-use-this: "error" */


import React from 'react';
import PropTypes from 'prop-types';
import { moedas } from '../../constantes/moedas';

const importAll = (r) => {
  const images = {};
  const i = r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
    return i;
  });
  return images;
};

const Logo = (props) => {
  const { nome } = props;
  const images = importAll(require.context('../../images', false, /\.(png|jpe?g)$/));
  const imagem = images[`${nome}.png`];
  return (
    <h1>
      <img
        src={imagem}
        width={moedas[nome].width}
        height={moedas[nome].height}
        alt={nome}
        title={nome}
        className="logo"
      />
    </h1>
  );
};

Logo.propTypes = {
  nome: PropTypes.string.isRequired,
};

export default Logo;
/* eslint-enable global-require */
