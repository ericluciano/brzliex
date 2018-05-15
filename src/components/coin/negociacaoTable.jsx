/* eslint no-trailing-spaces: "error" */
/* eslint class-methods-use-this: "error" */
/* eslint-env es6 */
import React from 'react';
import PropTypes from 'prop-types';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Moment from 'react-moment';
import 'moment/locale/pt-br';

// action creators
import { changeCripto } from '../../reducers/criptoActions';

import BuySellLabel from '../tabs/buySellLabel';

import { formatCurrencyToBr } from '../../utils/utils';

// Import React Table

class NegociacaoTable extends React.Component {
  static processMountData(props) {
    const data = props || [];
    const items = data.map((i) => {
      const {
        amount, type, price, total, _id, date_exec: dateExec,
      } = i;

      return {
        _id,
        data: <Moment locale="pt-br" format="DD MMM HH:mm">{dateExec}</Moment>,
        qtd: parseFloat(amount).toFixed(4),
        tipo: <BuySellLabel tipo={type} />,
        preco: price,
        total,
      };
    });

    return items;
  }

  constructor(props) {
    super(props);
    this.state = {
      sorted: [{
        id: 'data',
        desc: false,
      }],
    };
  }
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  mountTable() {
    return (
      <ReactTable
        key={Math.random()}
        data={NegociacaoTable.processMountData(this.props.dataHistorico)}
        columns={[{
          Header: 'data',
          accessor: 'data',
        },
        {
          Header: 'qtd',
          accessor: 'qtd',
          sortMethod: (a, b) => {
                    if (a.length === b.length) {
                      return a > b ? 1 : -1;
                    }
                    return a.length > b.length ? 1 : -1;
          },
        },
        {
          Header: 'ação',
          accessor: 'tipo',
          sortable: false,
        },
        {
          Header: 'preço',
          accessor: 'preco',
          Cell: props => formatCurrencyToBr(props.value),
          sortMethod: (a, b) => {
                    if (a.length === b.length) {
                      return a > b ? 1 : -1;
                    }
                    return a.length > b.length ? 1 : -1;
          },
        }, {
          Header: 'total',
          accessor: 'total',
          Cell: props => formatCurrencyToBr(props.value),
          sortMethod: (a, b) => {
                    if (a.length === b.length) {
                      return a > b ? 1 : -1;
                    }
                    return a.length > b.length ? 1 : -1;
          },
        },
      ]}
        defaultSorted={this.state.sorted}
        defaultPageSize={100}
        className="-striped -highlight"
        showPagination={false}
        style={{
            height: '384px',
        }}
      />
    );
  }

  render() {
    return (
      <div className="w-100" key={Math.random()}>
        <div className="pt-2 pb-2 text-center">
          HISTÓRICO DAS NEGOCIAÇÔES
        </div>
        <div className="p-2">
          {this.mountTable()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataHistorico: state.cripto.dataHistorico,
  moedaAtual: state.cripto.moedaAtual,
});

const mapDispatchToProps =
dispatch => bindActionCreators({
  changeCripto,
}, dispatch);

NegociacaoTable.defaultProps = {
  dataHistorico: {},
};
NegociacaoTable.propTypes = {
  dataHistorico: PropTypes.instanceOf(Object),
};

export default connect(mapStateToProps, mapDispatchToProps)(NegociacaoTable);
