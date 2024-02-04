import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Root from '../Root';
import { clickElement } from '../store/action'; 

const mockStore = configureStore([]);

describe('SomeComponent', () => {
  it('debería disparar clickElement al interactuar con el elemento', () => {
    const initialState = {}; 
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Root />
      </Provider>
    );

    const link = getByText('click'); 

    fireEvent.click(link); 

    const actions = store.getActions();
    const expectedAction = clickElement(); 
    expect(actions).toContainEqual(expectedAction);
  });
});
