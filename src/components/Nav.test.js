import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { store } from '../data/store';
import { Nav } from './Nav';

describe('App snapshot test', () => {
    it('will match snapshot', () => {
        let component = render(
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <Nav />
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    })
})
