import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'store/reducer';
import thunk from 'redux-thunk';
import { saveState, loadState } from 'store/localstorage';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  storeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
