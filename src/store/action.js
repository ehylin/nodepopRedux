import {   getAdvert } from './selector';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  SET_TAGS_REQUEST,
  SET_TAGS_SUCCESS,
  SET_TAGS_FAILURE,
  SET_ADVERTS_REQUEST,
  SET_ADVERTS_SUCCESS,
  SET_ADVERTS_FAILURE,
  SET_SELECTED_ADVERTS_REQUEST,
  SET_SELECTED_ADVERTS_SUCCESS,
  SET_SELECTED_ADVERTS_FAILURE,
  SET_CREATE_ADVERTS_SUCCESS,
  SET_CREATE_ADVERTS_REQUEST,
  SET_CREATE_ADVERTS_FAILURE,
  SET_DELETE_ADVERTS_REQUEST,
  SET_DELETE_ADVERTS_SUCCESS,
  SET_DELETE_ADVERTS_FAILURE
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



export const setTagsRequest = () => ({
    type: SET_TAGS_REQUEST,
  });
  
  export const setTagsSuccess = (tags) => ({
    type: SET_TAGS_SUCCESS,
    payload: tags,
  });
  export const setTagsFailure = (error) => ({
    type: SET_TAGS_FAILURE,
    payload: error,
  });

  export function tagsAdverts() {
    return async function (dispatch, getState, { api: { tags } }) {

      try {
        dispatch(setTagsRequest());
        const tag = await tags.getTags(); 
        dispatch(setTagsSuccess(tag)); 
      } catch (error) {
        dispatch(setTagsFailure(error)); 
      }
    };
  }


  export const setAdvertsRequest = () => ({
    type: SET_ADVERTS_REQUEST,
  });

  export const setAdvertsSuccess = (advert) => ({
    type: SET_ADVERTS_SUCCESS,
    payload: advert
  });

  export const setAdvertsFailure = (error) => ({
    type: SET_ADVERTS_FAILURE,
    error: true,
    payload: error
  });

  export function setAdverts() {
    return async function (dispatch, getState, { api: { adverts } }) {

      try {
        dispatch(setAdvertsRequest());
        const advertsList = await adverts.getAdverts();
        dispatch(setAdvertsSuccess(advertsList));
      } catch (error) {
        dispatch(setAdvertsFailure(error));
      }
    };
  }
  
  export const setSelectedAdvertRequest = () => ({
    type: SET_SELECTED_ADVERTS_REQUEST,
  });

  export const setSelectedAdverSuccess = (advertId) => ({
    type: SET_SELECTED_ADVERTS_SUCCESS,
    payload: advertId
  });

  export const setSelectedAdverFailure = (error) => ({
    type: SET_SELECTED_ADVERTS_FAILURE,
    error: true,
    payload: error
  });


  export function setSelectedAdvert(advertId) {
    return async function (dispatch, getState, { api: { adverts } }) {
      if (getAdvert(advertId)(getState())) {
        return;
      }
      try {
        dispatch(setSelectedAdvertRequest());
        const advert = await adverts.getAdvert(advertId);
        dispatch(setSelectedAdverSuccess(advert));
      } catch (error) {
        dispatch(setSelectedAdverFailure(error));
      }
    };
  }



  
  export const createAdvertRequest = () => ({
    type: SET_CREATE_ADVERTS_REQUEST,
  });

  export const createAdverSuccess = (advert) => ({
    type: SET_CREATE_ADVERTS_SUCCESS,
    payload: advert
  });

  export const createAdverFailure = (error) => ({
    type: SET_CREATE_ADVERTS_FAILURE,
    error: true,
    payload: error
  });

  export function createAdvert(advert) {
    return async function (dispatch, _getState, { api: { adverts }, router }) {
      try {
        dispatch(createAdvertRequest());
        const { id } = await adverts.createAdvert(advert);
        const createdAdvert = { id, ...advert };
        dispatch(createAdverSuccess(createdAdvert));
        router.navigate(`/adverts/${id}`);
      } catch (error) {
        dispatch(createAdverFailure(error));
      }
    };
  }

  
  export const deleteAdvertRequest = () => ({
    type: SET_DELETE_ADVERTS_REQUEST,
  });

  export const deleteAdvertSuccess = (advertId) => ({
    type: SET_DELETE_ADVERTS_SUCCESS,
    payload: advertId
  });

  export const deleteAdvertFailure = (error) => ({
    type: SET_DELETE_ADVERTS_FAILURE,
    error: true,
    payload: error
  });

  export function deleteAdverts(advertId) {
    return async function (dispatch, getState, { api: { adverts } }) {
      if (getAdvert(advertId)(getState())) {
        return;
      }
      try {
        dispatch(deleteAdvertRequest());
        const advert = await adverts.deleteAdvert(advertId);
        dispatch(deleteAdvertSuccess(advert));
      } catch (error) {
        dispatch(deleteAdvertFailure(error));
      }
    };
  }