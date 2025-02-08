import API from '../../services/api';

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};