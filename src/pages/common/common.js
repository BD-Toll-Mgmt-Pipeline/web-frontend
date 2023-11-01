import axios from 'axios';

const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};

const makeAuthenticatedRequest = (apiUrl, onSuccess, onError) => {
  const headers = {
    Authorization: getAuthToken(),
  };

  axios
    .get(apiUrl, { headers })
    .then((response) => {
      onSuccess(response.data || 0);
    })
    .catch((error) => {
      console.error(error);
      onError('Error while fetching data.');
    });
};

export { makeAuthenticatedRequest, getAuthToken };

const formatNumber = (number) => {
  const numberString = String(number);
  const parts = numberString.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';

  const formattedIntegerPart = integerPart
    .split('')
    .reverse()
    .map((digit, index) => (index > 0 && index % 2 === 0 ? `,${digit}` : digit))
    .reverse()
    .join('');

  return formattedIntegerPart.startsWith(',') ? formattedIntegerPart.slice(1) + decimalPart : formattedIntegerPart + decimalPart;
};

export default formatNumber;
