import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';
import { store } from '../data/store';
import { Dashboard } from './Dashboard';

describe('Dashboard snapshot test', () => {
  it('will match snapshot', () => {
    let component = render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
    expect(component).toMatchSnapshot();
  })
})
