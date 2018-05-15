// import React from 'react';
// import PropTypes from 'prop-types';
// import TradingViewWidget from 'react-tradingview-widget';
//
// const graphTradingView = props => (
//   <div className="col-12 col-lg-6 col-xl-6">
//     <div
//       className={`card p-2 mt-2
//       d-flex justify-content-evenly align-items-center flex-column ${props.expand}`}
//     >
//       <button
//         className="btn btn-xs btn-outline-primary expand-button"
//         onClick={props.expandFunc}
//       >
//         <i className={(!props.expand) ? 'fa fa-expand' : 'fa fa-times'} />
//       </button>
//       <div className="pt-2 pb-2">{props.sigla ? props.sigla : '*Não Disponível'}</div>
//       <div className="d-table p-2" style={{ width: '100%', minHeight: '400px', height: '100%' }}>
//         <TradingViewWidget
//           symbol={props.sigla}
//           locale="br"
//           autosize
//         />
//       </div>
//     </div>
//   </div>
// );
//
// graphTradingView.propTypes = {
//   expand: PropTypes.string.isRequired,
//   sigla: PropTypes.string.isRequired,
// };
//
// export default graphTradingView;
