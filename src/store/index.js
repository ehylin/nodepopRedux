import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { withExtraArgument } from 'redux-thunk';
//import { composeWithDevTools } from '@redux-devtools/extension';

import * as reducers from './reducers';
//import * as actionCreators from './action';

import * as adverts from '../components/adverts/service';
import * as auth from '../components/auth/service';

//const composeEnhancers = composeWithDevTools({ actionCreators });


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action, store.getState());
  const result = next(action);
  console.log('final state', store.getState());
  console.groupEnd();
  return result;
};

const noAction = () => next => action => {
  if (action.type.endsWith('/no-throw')) {
    return;
  }
  return next(action);
};

const timestamp = () => next => action => {
  return next({
    ...action,
    meta: { ...action.meta, timestamp: new Date() },
  });
};

const failureRedirects = (router, redirectsMap) => store => next => action => {
  const result = next(action);

  if (action.error) {
    const redirect = redirectsMap[action.payload.status];
    if (redirect) {
      router.navigate(redirect);
    }
  }

  return result;
};

const historyEnhancer = createStore => (reducer, preloadedState, enhancer) => {
  function historyReducer(state, action) {
    const { history, ...restState } = state;

    if (action.type === 'history/back') {
      return {
        ...history.last,
        history: {
          last: null,
          current: history.last,
        },
      };
    }

    const newState = reducer(restState, action);
    return {
      ...newState,
      history: {
        last: restState,
        current: newState,
      },
    };
  }

  return createStore(historyReducer, preloadedState, enhancer);
};

export default function configureStore(preloadedState, { router }) {
  const middleware = [
    withExtraArgument({ api: { auth, adverts }, router }),
    timestamp,
    failureRedirects(router, { 401: '/login', 404: '/404' }),
    logger,
    noAction,
  ];
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware), historyEnhancer),
  );
  return store;
}
