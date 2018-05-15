import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import BuySellLabel from '../tabs/buySellLabel';

import { formatCurrencyToBr } from '../../utils/utils';

const OrdersTable = props => (
  <div key={props.ids} className="col-12 col-lg-6 col-xl-6">
    <div
      className="card p-2 mt-2 d-flex justify-content-evenly align-items-center flex-column"
    >
      <div className="pt-2 pb-2">
        { props.title} <BuySellLabel tipo={props.type} />
      </div>
      <div className="p-2" style={{ width: '100%', height: '400px' }}>
        <ReactTable
          data={props.data}
          columns={[
          {
            Header: 'preço',
            accessor: 'price',
            Cell: item => formatCurrencyToBr(item.value),
            sortMethod: (a, b) => {
              if (a.length === b.length) {
                return a > b ? 1 : -1;
              }
              return a.length > b.length ? 1 : -1;
            },
          },
          {
            Header: 'qtd',
            accessor: 'amount',
            Cell: item => formatCurrencyToBr(item.value).replace('R$', ''),
            sortMethod: (a, b) => {
              if (a.length === b.length) {
                return a > b ? 1 : -1;
              }
              return a.length > b.length ? 1 : -1;
            },
          },
          {
            Header: 'total',
            accessor: 'total',
            Cell: item => formatCurrencyToBr(item.value),
            sortMethod: (a, b) => {
              if (a.length === b.length) {
                return a > b ? 1 : -1;
              }
              return a.length > b.length ? 1 : -1;
            },
          },
        ]}
          defaultPageSize={18}
          className="-striped -highlight"
          showPagination={false}
          style={{
              height: '384px',
          }}
        />
      </div>
    </div>
  </div>
);

OrdersTable.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ids: PropTypes.number.isRequired,
};
export default OrdersTable;
