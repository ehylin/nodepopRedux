import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <Router>
        <Header title="Title" list="List" />
      </Router>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
