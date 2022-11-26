import { postRequest } from './utils';

export const checkout = data => postRequest('/my-items', data);
