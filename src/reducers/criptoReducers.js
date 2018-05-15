const INITIAL_STATE = {
  loading: true,
  moedaAtual: 'bitcoin',
  modalChangeCripto: 'inactive',
  dataMercado: [],
  dataHistorico: [],
  barTopActive: 'inactive',
  tabs: {
    active: 'historico',
  },
  errorMessage: '',
  currencies: [],
  orderbook: [],
  privateBalance: {
    balance: {},
  },
  privateUser: {
    key: '',
    secret: '',
    type: '',
    message: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: action.payload };

    case 'API_PRIVATE_BALANCE':
      return { ...state, privateBalance: action.payload };

    case 'SET_COIN':
      return { ...state, moedaAtual: action.payload };

    case 'SET_PRIVATE':
      return { ...state, privateUser: action.payload };

    case 'CHANGE_CRIPTO':
      return {
        ...state,
        moedaAtual: action.payload,
      };

    case 'CLOSE_OR_OPEN_MODAL_CHANGE_CRIPTO':
      return { ...state, modalChangeCripto: action.payload };

    case 'BAR_TOP_STATUS':
      return { ...state, barTopActive: action.payload };

    case 'API_CALL_MERCADO':
      return { ...state, dataMercado: action.payload };

    case 'API_CALL_HISTORICO':
      return { ...state, dataHistorico: action.payload };

    case 'API_CALL_CURRENCIES':
      return { ...state, currencies: action.payload };

    case 'API_CALL_ORDERBOOK':
      return { ...state, orderbook: action.payload };

    case 'CHANGE_TABS':
      return { ...state, tabs: action.payload };

    case 'API_ERROR':
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
