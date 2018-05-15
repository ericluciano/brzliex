import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeCripto, tabsNavegarPara } from '../../reducers/criptoActions';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.callClick = this.callClick.bind(this);
  }

  /* callOrNotReloadHistorico(props) {
    if (props) {
      this.props.changeCripto(this.props.moedaAtual);
    }
  } */

  callClick() {
    this.props.tabsNavegarPara(this.props.action);
    // this.callOrNotReloadHistorico(this.props.mark);
  }

  render() {
    return (
      <button
        className={`tablinks ${this.props.active}`}
        onClick={this.callClick}
        onKeyPress={this.callClick}
      >
        {this.props.tabTitle}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  moedaAtual: state.cripto.moedaAtual,
});

const mapDispatchToProps =
dispatch => bindActionCreators({ changeCripto, tabsNavegarPara }, dispatch);

Buttons.propTypes = {
  // mark: PropTypes.string.isRequired,
  // moedaAtual: PropTypes.string.isRequired,
  tabTitle: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  // changeCripto: PropTypes.func.isRequired,
  tabsNavegarPara: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
