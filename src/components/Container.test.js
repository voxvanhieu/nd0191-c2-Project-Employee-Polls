import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { store } from '../data/store';
import { Alert } from './Alert';
import { Banner } from './Banner';
import { Container } from './Container';
import { Nav } from './Nav';

describe('App snapshot test', () => {
    it('will match snapshot', () => {
        const testText = "This is a sample text for testing";
        let component = render(
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <Container>
                            <Alert />
                            <Nav />
                            <Banner text={testText} />
                        </Container>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );

        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();

        const lblBanner = screen.getByTestId("lblBanner");
        expect(lblBanner.textContent).toBe(testText);
    })
})
