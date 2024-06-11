import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as API from '../api';

// Create slice
const name = 'polls';
const initialState = createInitialState();
const selectors = createSelectors();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const slice = createSlice({ name, initialState, reducers, extraReducers, selectors });

// Exports
export const pollActions = { ...slice.actions, ...extraActions };
export const pollSelectors = { ...slice.selectors }
export const pollsReducer = slice.reducer;

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

function createReducers() {
    return {
        getById: {
            reducer: (state, action) => state.byId[action.payload.id],
            prepare: (id) => ({ payload: id })
        }
    };
}

function createExtraActions() {

    return {
        getQuestionsAsync: _getQuestionsAsync(),
    }

    function _getQuestionsAsync() {
        return createAsyncThunk(
            `${name}/getQuestions`,
            async () => await API._getQuestions()
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        buildReducerGetQuestions();

        function buildReducerGetQuestions() {
            var { pending, fulfilled, rejected } = extraActions.getQuestionsAsync;
            builder
                .addCase(pending, (state) => {
                    state.status = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.byId = action.payload;
                    state.status = { loading: false };
                })
                .addCase(rejected, (state, action) => {
                    state.status = { error: action.error };
                })
        }
    }
}
