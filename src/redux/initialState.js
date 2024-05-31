import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

export const _STORAGE_KEY_ = 'excel-state';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

// prettier-ignore
export const initialState = storage(_STORAGE_KEY_)
  ? normalize(storage(_STORAGE_KEY_))
  : defaultState;
