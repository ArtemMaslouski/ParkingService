import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        email,
        password,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
