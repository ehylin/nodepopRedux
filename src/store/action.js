import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  SET_TAGS,
  SET_ADVERTS,
  SET_SELECTED_ADVERT,
  CREATE_ADVERT,
  DELETE_ADVERT
} from './types';

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST,
  });
  
  export const authLoginSuccess = () => ({
    type: AUTH_LOGIN_SUCCESS,
  });
  
  export const authLoginFailure = error => ({
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
  });
  
  export function authLogin(credentials) {
    return async function (dispatch, getState, { api: { auth }, router }) {
      try {
        dispatch(authLoginRequest());
        await auth.login(credentials);
        dispatch(authLoginSuccess());
        const to = router.state.location.state?.from?.pathname || '/';
        router.navigate(to);
      } catch (error) {
        dispatch(authLoginFailure(error));
      }
    };
  }
  
  export const authLogout = () => ({
    type: AUTH_LOGOUT,
  });



export const setTags = (tags) => ({
    type: SET_TAGS,
    payload: tags,
  });
  
  export const setAdverts = (adverts) => ({
    type: SET_ADVERTS,
    payload: adverts,
  });
  
  export const setSelectedAdvert = (advert) => ({
    type: SET_SELECTED_ADVERT,
    payload: advert,
  });
  
  export const createAdvert = (advert) => ({
    type: CREATE_ADVERT,
    payload: advert,
  });
  
  export const deleteAdvert = (advertId) => ({
    type: DELETE_ADVERT,
    payload: advertId,
  });
  