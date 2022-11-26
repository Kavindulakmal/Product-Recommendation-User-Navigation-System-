import { postRequest } from './utils';

export const login = data => postRequest('/auth/jwt/create', data);
