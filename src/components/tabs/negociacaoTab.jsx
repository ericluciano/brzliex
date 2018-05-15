/* eslint no-trailing-spaces: "error" */
/* eslint class-methods-use-this: "error" */
/* eslint-env es6 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Moment from 'react-moment';
import 'moment/locale/pt-br';

import BuySellLabel from './buySellLabel';

import { formatCurrencyToBr } from '../../utils/utils';

// Import React Table

class NegociacaoTab extends React.Component {
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

  mountTable() {
    return (
      <ReactTable
        data={NegociacaoTab.processMountData(this.props.dataHistorico)}
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
            height: '500px',
        }}
      />
    );
  }

  render() {
    return (
      <div
        id="historicoTabContent"
        className={`tabcontent ${this.props.status}`}
      >
        {this.mountTable()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataHistorico: state.cripto.dataHistorico,
});

NegociacaoTab.defaultProps = {
  dataHistorico: {},
};
NegociacaoTab.propTypes = {
  status: PropTypes.string.isRequired,
  dataHistorico: PropTypes.instanceOf(Object),
};

export default connect(mapStateToProps)(NegociacaoTab);
