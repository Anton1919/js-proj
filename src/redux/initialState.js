import { storage } from '@core/utils';

export const _STORAGE_KEY_ = 'excel-state';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
};

// prettier-ignore
export const initialState = storage(_STORAGE_KEY_)
  ? storage(_STORAGE_KEY_)
  : defaultState;
