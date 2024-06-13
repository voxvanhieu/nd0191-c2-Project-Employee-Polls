
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { store } from '../../data/store';
import { Login } from './Login';


describe("Login page test", () => {
    it("should render the component", () => {
        const view = render(
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );
        expect(view).toBeDefined();
        expect(view).toMatchSnapshot();
    })


    it("should rendder all elements and fire events", () => {
        const view = render(
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        );

        const lblUsername = screen.getByTestId("lblUsername");
        const inpUsername = screen.getByTestId("inpUsername");
        const lblPassword = screen.getByTestId("lblPassword");
        const inpPassword = screen.getByTestId("inpPassword");
        const btnSubmit = screen.getByTestId("btnSubmit");

        expect(lblUsername.textContent).toBe("User Name");
        expect(lblPassword.textContent).toBe("Password");
        expect(btnSubmit.textContent).toBe("Sign in");

        fireEvent.change(inpUsername, { target: { value: "tylermcginnis" } });
        fireEvent.change(inpPassword, { target: { value: "abc321" } });

        expect(inpUsername.value).toBe("tylermcginnis");
        expect(inpPassword.value).toBe("abc321");
    })
})