import { Excel } from '@/components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage } from '@core/utils';
import { _STORAGE_KEY_, initialState } from '@/redux/initialState';
import './scss/index.scss';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  storage(_STORAGE_KEY_, state);
});

const excel = new Excel('#app', {
  // prettier-ignore
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
