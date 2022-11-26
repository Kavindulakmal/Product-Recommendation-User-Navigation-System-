import { postRequest } from './utils';

export const authenticateProduct = data => postRequest('/authenticate', data);
