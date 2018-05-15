import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Buttons from './buttons';

// tabs
import NegociacaoTab from './negociacaoTab';
import InvestingTab from './investingTab';
import BraziliexTab from './braziliexTab';

import { changeCripto, callApiCurrencies } from '../../reducers/criptoActions';


class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.callOrReloadTab = this.callOrReloadTab.bind(this);
  }

  callOrReloadTab(name) {
    if (name === 'historico') {
      this.props.changeCripto(this.props.moedaAtual);
    }
    if (name === 'braziliex') {
      this.props.callApiCurrencies();
    }
  }

  render() {
    const { active } = this.props.tabs;

    const tabHistorico = active === 'historico' ? 'active' : '';
    const tabInvesting = active === 'investing' ? 'active' : '';
    const tabBraziliex = active === 'braziliex' ? 'active' : '';
    return (
      <div>

        <div className="tab">
          <div
            role="link"
            tabIndex={0}
            onClick={() => this.callOrReloadTab('historico')}
            onKeyPress={() => this.callOrReloadTab('historico')}
          >
            <Buttons action="historico" tabTitle="Negociações" active={tabHistorico} />
          </div>
          <div
            role="link"
            tabIndex={0}
            onClick={() => this.callOrReloadTab('braziliex')}
            onKeyPress={() => this.callOrReloadTab('braziliex')}
          >
            <Buttons action="braziliex" tabTitle="Braziliex" active={tabBraziliex} />
          </div>
          <div
            role="link"
            tabIndex={0}
            onClick={() => this.callOrReloadTab('investing')}
            onKeyPress={() => this.callOrReloadTab('investing')}
          >
            <Buttons action="investing" tabTitle="Investing" active={tabInvesting} />
          </div>
        </div>

        <NegociacaoTab status={tabHistorico} />
        <InvestingTab status={tabInvesting} />
        <BraziliexTab status={tabBraziliex} />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: { active: state.cripto.tabs.active },
  moedaAtual: state.cripto.moedaAtual,
});
const mapDispatchToProps =
dispatch => bindActionCreators({ changeCripto, callApiCurrencies }, dispatch);

Tabs.defaultProps = {
  tabs: { active: 'historico' },
};

Tabs.propTypes = {
  tabs: PropTypes.instanceOf(Object),
  changeCripto: PropTypes.func.isRequired,
  callApiCurrencies: PropTypes.func.isRequired,
  moedaAtual: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
