/* eslint no-trailing-spaces: "error" */
/* eslint class-methods-use-this: "error" */
/* eslint-env es6 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeCripto, closeOrOpenModalCripto } from '../../reducers/criptoActions';

import { moedas } from '../../constantes/moedas';
import { capitalize } from '../../utils/utils';

class ModalCurrency extends React.Component {
  mountLi(props) {
    const moedasCorrentes = props || [];
    const items = Object.keys(moedasCorrentes).sort();
    return items.map((moeda, key) => (
      <li key={moeda}>
        <div
          className="lnk outline-0"
          onClick={() => this.props.changeCripto(moeda)}
          onKeyPress={() => this.props.changeCripto(moeda)}
          role="link"
          tabIndex={key}
        >
          {capitalize(moeda)}
        </div>
      </li>
    ));
  }

  render() {
    const { modalChangeCripto } = this.props;

    return (
      <div>
        <div className={`modal-currency ${modalChangeCripto}`}>
          <div
            role="link"
            tabIndex="0"
            className={`close ${modalChangeCripto}`}
            onClick={() => this.props.closeOrOpenModalCripto('inactive')}
            onKeyPress={() => this.props.closeOrOpenModalCripto('inactive')}
          >
            X
          </div>
          <div className="content">
            <ul>
              {this.mountLi(moedas)}
            </ul>
          </div>
        </div>
        <div className={`bg-modal-currency ${modalChangeCripto}`} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  moedaAtual: state.cripto.moedaAtual,
  modalChangeCripto: state.cripto.modalChangeCripto,
});

const mapDispatchToProps =
dispatch => bindActionCreators({ changeCripto, closeOrOpenModalCripto }, dispatch);

ModalCurrency.propTypes = {
  modalChangeCripto: PropTypes.string.isRequired,
  changeCripto: PropTypes.func.isRequired,
  closeOrOpenModalCripto: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCurrency);
