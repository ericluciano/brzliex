import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeOrOpenModalCripto } from '../../reducers/criptoActions';

const imageSVG = require('../../icons/changeCripto.svg');

const iconChangeCripto = (props) => {
  return (
    <div className="crypto-icon">
      <img src={imageSVG} alt="" width="40" height="40" onClick={() => props.closeOrOpenModalCripto('active')}/>
    </div>
  )
};

const mapStateToProps = state => ({
  modalChangeCripto: state.cripto.modalChangeCripto });

const mapDispatchToProps = dispatch =>
bindActionCreators({ closeOrOpenModalCripto }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(iconChangeCripto);
