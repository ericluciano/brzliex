/* eslint no-use-before-define: "error" */
/* eslint-env es6 */

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// axios
import axios from 'axios';

// api
import { urlApiHistorico, urlApiMercado, urlApiCurrencies, urlApiOrderBook, urlApiPrivate } from '../constantes/api';

// constantes
import { moedas } from '../constantes/moedas';


const checkLoading = event => ({
  type: 'LOADING',
  payload: event,
});

const closeOrOpenModalCripto = event => ([
  {
    type: 'CLOSE_OR_OPEN_MODAL_CHANGE_CRIPTO',
    payload: event,
  },
]);

const barTopStatus = event => ({
  type: 'BAR_TOP_STATUS',
  payload: event,
});

const errorApi = event => ({
  type: 'API_ERROR',
  payload: event,
});

const callApiMercado = moeda =>
  (dispatch) => {
    const moedaSigla = moedas[moeda].sigla;
    const apiCallMercado = `${urlApiMercado}${moedaSigla}`;

    axios.get(apiCallMercado)
      .then(resp => dispatch({
        type: 'API_CALL_MERCADO',
        payload: resp.data,
      }))
      // .then(() => dispatch(barTopStatus('active')))
      .catch(error =>
        dispatch(errorApi(`${error.responseText}`)));
  };


const callApiHistorico = moeda =>
  (dispatch) => {
    const moedaSigla = moedas[moeda].sigla;
    const apiCallHistorico = `${urlApiHistorico}${moedaSigla}`;

    axios.get(apiCallHistorico)
      .then(resp => dispatch({
        type: 'API_CALL_HISTORICO',
        payload: resp.data,
      }))
      .then(() => dispatch(checkLoading(false)));
  };


const callApiCurrencies = () =>
  (dispatch) => {
    const rnd = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toLowerCase();
    const apiURL = `${urlApiCurrencies}?${rnd}`;
    axios.get(apiURL)
      .then(resp => dispatch({
        type: 'API_CALL_CURRENCIES',
        payload: resp.data,
      }))
      .then(() => dispatch(checkLoading(false)));
  };

const callApiOrderBook = name =>
  (dispatch) => {
    const moedaSigla = moedas[name].sigla;
    const apiURL = `${urlApiOrderBook}${moedaSigla}`;
    axios.get(apiURL)
      .then(resp => dispatch({
        type: 'API_CALL_ORDERBOOK',
        payload: resp.data,
      }))
      .then(() => dispatch(checkLoading(false)));
  };

const callApiPrivate = ({ key, secret, type }) =>
  (dispatch) => {
    const MySwal = withReactContent(Swal);
    const tipo = { balance: 'API_PRIVATE_BALANCE' };
    const apiURL = `${urlApiPrivate}`;
    console.log(key, secret, type);
    axios.post(apiURL, {
      key,
      secret,
      type,
    })
      .then((resp) => {
        if (resp.data.success === 0) {
          MySwal.fire({
            title: 'Key ou Sign error.',
            text: resp.data.message,
            type: 'warning',
          });
          return;
        }
        MySwal.fire({
          title: 'Ok!',
          text: 'Login efetuado com sucesso.',
          type: 'success',
        });
        dispatch([{
          type: tipo[type],
          payload: resp.data,
        }, {
          type: 'SET_PRIVATE',
          payload: {
            key, secret, type, message: 'Sucesso',
          },
        },
        ]);
      })
      .catch((error) => {
        MySwal.fire({
          title: 'Key ou Sign error.',
          text: error.responseText,
          type: 'warning',
        });
        dispatch({
          type: 'SET_PRIVATE',
          payload: {
            key: '', secret: '', type: '', message: error.responseText,
          },
        });
      });
  };

const setPrivate = ({ key, secret, type }) => ([
  {
    type: 'SET_PRIVATE',
    payload: { key, secret, type },
  },
]);


const tabsNavegarPara = event => ({
  type: 'CHANGE_TABS',
  payload: {
    active: event,
  },
});

const changeCripto = event => ([
  {
    type: 'CHANGE_CRIPTO',
    payload: event,
  },
  checkLoading(true),
  callApiHistorico(event),
]);

const setMoedaAtual = event => ([
  {
    type: 'SET_COIN',
    payload: event,
  },
]);

export {
  checkLoading, changeCripto, closeOrOpenModalCripto,
  barTopStatus, callApiMercado, callApiHistorico,
  callApiCurrencies, tabsNavegarPara, errorApi,
  setMoedaAtual, callApiOrderBook, callApiPrivate,
  setPrivate,
};
