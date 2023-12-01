const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

const getApiHeaders = () => {
  const token = getTokenFromLocalStorage();

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  return {
    'Content-Type': 'application/json',
  };
};

const handleApiResponse = (response) => {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const url = `${process.env.API_BASE_URL}/${endpoint}`;
  const headers = getApiHeaders();

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await handleApiResponse(response);
    return data;
  } catch (error) {
    console.error('API request error:', error.message);
    throw error;
  }
};

export default apiRequest;
