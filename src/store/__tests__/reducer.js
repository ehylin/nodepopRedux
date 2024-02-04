import {
  setTagsSuccess,
    setAdvertsSuccess,
    setSelectedAdverSuccess,
    createAdverSuccess,
    deleteAdvertSuccess,
  } from '../action';
  
  import { advertReducer, initialState } from '../reducers';
  
  describe('advertReducer', () => {
    test('should handle "SET_TAGS_SUCCESS" action', () => {
      const state = initialState.adverts;
      const tags = ['tag1', 'tag2', 'tag3'];
      const action = setTagsSuccess(tags);
      const newState = advertReducer(state, action);
      expect(newState.tags).toEqual(tags);
    });
  
    test('should handle "SET_ADVERTS_SUCCESS" action', () => {
      const state = initialState.adverts;
      const adverts = [{ id: 1, title: 'Advert 1' }, { id: 2, title: 'Advert 2' }];
      const action = setAdvertsSuccess(adverts);
      const newState = advertReducer(state, action);
      expect(newState.list).toEqual(adverts);
    });
  
    test('should handle "SET_SELECTED_ADVERTS_SUCCESS" action', () => {
      const state = initialState.adverts;
      const selectedAdvert = { id: 1, title: 'Selected Advert' };
      const action = setSelectedAdverSuccess(selectedAdvert);
      const newState = advertReducer(state, action);
      expect(newState.selectedAdvert).toEqual(selectedAdvert);
    });
  
    test('should handle "SET_CREATE_ADVERTS_SUCCESS" action', () => {
      const state = initialState.adverts;
      const newAdvert = { id: 3, title: 'New Advert' };
      const action = createAdverSuccess(newAdvert);
      const newState = advertReducer(state, action);
      expect(newState.list).toContainEqual(newAdvert);
    });
  
    test('should handle "SET_DELETE_ADVERTS_SUCCESS" action', () => {
      const state = {
        ...initialState.adverts,
        list: [{ id: 1, title: 'Advert 1' }, { id: 2, title: 'Advert 2' }],
      };
      const advertIdToDelete = 1;
      const action = deleteAdvertSuccess(advertIdToDelete);
      const newState = advertReducer(state, action);
      expect(newState.list).not.toContainEqual({ id: 1, title: 'Advert 1' });
      expect(newState.list).toContainEqual({ id: 2, title: 'Advert 2' });
    });
  
    test('should return the initial state for unknown action', () => {
      const state = initialState.adverts;
      const action = { type: 'UNKNOWN_ACTION' };
      const newState = advertReducer(state, action);
      expect(newState).toBe(state);
    });
  });
  