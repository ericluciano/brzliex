const capitalize = string => {
  return string[0].toUpperCase() + string.slice(1);
};

const toFixed = (num, fixed) => {
  const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
};

const formatCurrencyToBr = (num) => {
  const valor = toFixed(num, 2);
  const dinheiro = parseFloat(valor);
  return dinheiro.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).replace('R$', 'R$ ');
};

const convertToSlug = text => text
  .toLowerCase()
  .replace(/[^\w ]+/g, '')
  .replace(/ +/g, '-');

const convertStringToLower = text => text
  .toLowerCase()
  .replace(/[^a-zA-Z0-9 ]/g, '');

export { capitalize, formatCurrencyToBr, toFixed, convertToSlug, convertStringToLower };
