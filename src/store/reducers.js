import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    SET_TAGS_SUCCESS,
    SET_ADVERTS_SUCCESS,
    SET_SELECTED_ADVERTS_SUCCESS,
    SET_CREATE_ADVERTS_SUCCESS,
    SET_DELETE_ADVERTS_SUCCESS,
  } from './types';

  const initialState = {
    auth: {
      isAuthenticated: false,
      accessToken: null,
      rememberSession: false,
    },
    adverts: {
      tags: [],
      list: [],
      selectedAdvert: null,
    },
  };
  

  export function auth(state = initialState.auth, action) {
    switch (action.type) {
      case AUTH_LOGIN_SUCCESS:
        return true;
      case AUTH_LOGOUT:
        return false;
      default:
        return state;
    }
  }

  export const advertReducer = (state = initialState.adverts, action) => {
    switch (action.type) {
      case SET_TAGS_SUCCESS:
        return { ...state, tags: action.payload };
      case SET_ADVERTS_SUCCESS:
        return { ...state, list: action.payload };
      case SET_SELECTED_ADVERTS_SUCCESS:
        return { ...state, selectedAdvert: action.payload };
      case SET_CREATE_ADVERTS_SUCCESS:
        return { ...state, list: [...state.list, action.payload] };
      case SET_DELETE_ADVERTS_SUCCESS:
        return {
          ...state,
          list: state.list.filter((advert) => advert.id !== action.payload),
        };
      default:
        return state;
    }
  };