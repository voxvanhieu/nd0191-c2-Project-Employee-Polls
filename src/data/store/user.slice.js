import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as API from '../api';

// Create slice
const name = 'users';
const initialState = createInitialState();
const selectors = createSelectors();
const advSelectors = createAdvancedSelectors();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers, selectors });

// Exports
export const userActions = { ...slice.actions, ...extraActions };
export const userSelectors = { ...slice.selectors, ...advSelectors };
export const userReducer = slice.reducer;

// Implementation

function createInitialState() {
    return {
        allIds: [],
        byId: {},
        status: {}
    }
}

function createSelectors() {
    return {
        selectValue: (sliceState) => sliceState.byId,
    }
}

//  Selector with parameters
function createAdvancedSelectors() {
    return {
        selectUserInfoById: (userId) => (state) => {
            const sliceState = state[slice.name];
            return sliceState.allIds.includes(userId) ? sliceState.byId[userId] : null;
        },
        selectCompletedPolls: (userId) => (state) => {
            const sliceState = state[slice.name];
            return sliceState.allIds.includes(userId) ? sliceState.byId[userId].answers : null;
        }
    }
}

function createExtraActions() {

    return {
        getUsers: createAsyncThunk(
            `${name}/getUsers`,
            async () => await API._getUsers()
        )
    }
}

function createExtraReducers() {
    return (builder) => {
        buildReducerGetUsersAsync();

        function buildReducerGetUsersAsync() {
            var { pending, fulfilled, rejected } = extraActions.getUsers;
            builder
                .addCase(pending, (state) => {
                    state.status = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.byId = action.payload;
                    state.allIds = Object.keys(action.payload);
                    state.status = { loading: false };
                })
                .addCase(rejected, (state, action) => {
                    state.status = {
                        loading: false,
                        error: action.error
                    };
                })
        }
    }
}