import { getRequest } from './utils';

export const getOffers = id => getRequest(`/similar-products/${id}/`);
