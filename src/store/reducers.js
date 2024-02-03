import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    SET_TAGS,
    SET_ADVERTS,
    SET_SELECTED_ADVERT,
    CREATE_ADVERT,
    DELETE_ADVERT
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
      case SET_TAGS:
        return { ...state, tags: action.payload };
      case SET_ADVERTS:
        return { ...state, list: action.payload };
      case SET_SELECTED_ADVERT:
        return { ...state, selectedAdvert: action.payload };
      case CREATE_ADVERT:
        return { ...state, list: [...state.list, action.payload] };
      case DELETE_ADVERT:
        return {
          ...state,
          list: state.list.filter((advert) => advert.id !== action.payload),
        };
      default:
        return state;
    }
  };