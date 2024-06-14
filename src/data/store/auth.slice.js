import { createSlice, createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import * as API from '../api';
import { alertActions } from "./alert.slice";
import { history } from '../../helpers'

// Create slice
const name = 'auth';
const initialState = createInitialState();
const selectors = createSelectors();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers, selectors });

// Exports
export const authActions = { ...slice.actions, ...extraActions };
export const authSelectors = { ...slice.selectors }
export const authReducer = slice.reducer;

// Implementation

function createInitialState() {
    return {
        value: JSON.parse(localStorage.getItem('auth'))
    }
}

function createSelectors() {
    return {
        selectValue: (sliceState) => sliceState.value,
    }
}

function createReducers() {

    return {
        setAuth
    }

    function setAuth(state, action) {
        state.value = action.payload;
    }
}

function createExtraActions() {

    return {
        login: _login(),
        logout: _logout()
    }

    function _login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ username, password }, { dispatch }) => {
                // dispatch(alertActions.clear());
                try {
                    let user = await API.authenticateUser({ username, password });

                    dispatch(authActions.setAuth(user));

                    localStorage.setItem('auth', JSON.stringify(user));

                    if (user && user.name) {
                        dispatch(alertActions.success("Welcome"));
                        setTimeout(() => {
                            const { from } = history.location.state || { from: { pathname: '/' } };
                            history.navigate(from);
                        }, 500);
                    } else {
                        dispatch(alertActions.error("Wrong username or password"));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )
    }

    function _logout() {
        return createAsyncThunk(
            `${name}/logout`,
            function (arg, { dispatch }) {
                dispatch(authActions.setAuth(null));
                localStorage.removeItem('auth');
                history.navigate('/login');
            }
        )
    }
}