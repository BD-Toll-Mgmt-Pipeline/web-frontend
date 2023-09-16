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

export default makeAuthenticatedRequest;
