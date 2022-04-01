import { SHOW_LOADING, HIDE_LOADING } from './types';

export const showLoading = () => ({
  type: SHOW_LOADING,
});

export const hideLoading = () => ({
  type: HIDE_LOADING,
});
