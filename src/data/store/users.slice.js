import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as API from '../api';

// Create slice
const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// Exports
export const userAction = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// Implementation

function createInitialState() {
    return {
        list: null,
        item: null
    }
}

function createExtraActions() {

    return {
        register: _register(),
        getAll: _getAll(),
        getByUsername: _getByUsername(),
    }

    function _register() {
        // TBD
        return createAsyncThunk(
            `${name}/register`,
            async (user) => await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(user);
                }, 1000);
            })
        );
    }

    function _getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await API._getUsers()
        );
    }

    function _getByUsername() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id) => await API._getUserByUsername(id)
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        buildReducerGetAll();
        buildReducerGetByUsername();

        function buildReducerGetAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                })
        }

        function buildReducerGetByUsername() {
            var { pending, fulfilled, rejected } = extraActions.getByUsername;
            builder
                .addCase(pending, (state) => {
                    state.item = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.item = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.item = { error: action.error };
                })
        }
    }
}