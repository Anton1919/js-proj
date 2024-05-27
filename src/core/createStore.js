export function createStore(rootReducer, initialState = {}) {
  // Определяем начальный стейт, прогоняем через reducer, отправляя ему копию стейта + начальную инструкцию
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      return state;
    },
  };
}
