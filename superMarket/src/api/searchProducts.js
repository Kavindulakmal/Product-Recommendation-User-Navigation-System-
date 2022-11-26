import { getRequest } from './utils';

export const searchProducts = data => getRequest(`/products?search=${data}`);
