import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import IconTimer from './iconTimer';
import IconChangeCripto from './iconChangeCripto';
import Logo from './logo';

import { changeCripto } from '../../reducers/criptoActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.linkChangeCripto = this.linkChangeCripto.bind(this);
  }

  linkChangeCripto() {
    this.props.changeCripto(this.props.moedaAtual);
  }

  render() {
    return (
      <div className="col-xs-12">
        <IconChangeCripto />
        <div
          role="link"
          tabIndex={0}
          className="preLogo"
          onClick={this.linkChangeCripto}
          onKeyPress={this.linkChangeCripto}
        >
          <Logo nome={this.props.moedaLogo} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  moedaAtual: state.cripto.moedaAtual,
});

const mapDispatchToProps =
dispatch => bindActionCreators({ changeCripto }, dispatch);

Header.propTypes = {
  changeCripto: PropTypes.func.isRequired,
  moedaLogo: PropTypes.string.isRequired,
  moedaAtual: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
