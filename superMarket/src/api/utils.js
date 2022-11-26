import axios from '../shared/axios';

// Utility functions for making api calls
export const getRequest = async (uri: string) => {
  try {
    let response = await axios.get(uri);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const postRequest = async (uri: string, data: any) => {
  try {
    let response = await axios.post(uri, data);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const deleteRequest = async (uri: string) => {
  try {
    let response = await axios.delete(uri);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const putRequest = async (uri: string, data: any) => {
  try {
    let response = await axios.put(uri, data);

    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
