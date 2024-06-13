import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as API from '../api';
import { useDispatch } from "react-redux";

// Create slice
const name = 'polls';
const initialState = createInitialState();
const selectors = createSelectors();
const advSelectors = createAdvancedSelectors();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const slice = createSlice({ name, initialState, reducers, extraReducers, selectors });

// Exports
export const pollActions = { ...slice.actions, ...extraActions };
export const pollSelectors = { ...slice.selectors, ...advSelectors }
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

//  Selector with parameters
function createAdvancedSelectors() {
    return {
        selectQuestionById: (pollId) => (state) => {
            const sliceState = state[slice.name];
            return sliceState.allIds.includes(pollId)
                ? sliceState.byId[pollId]
                : null;
        },
        selectQuestionIds: (pollIds) => (state) => {
            const sliceState = state[slice.name];
            return sliceState.allIds.filter(key => pollIds.includes(key));
        },
        selectQuestionIdsExcepts: (pollIds) => (state) => {
            const sliceState = state[slice.name];
            return sliceState.allIds.filter(key => !pollIds.includes(key));
        }
    }
}


function createReducers() {
    return {
        getById: {
            reducer: (state, action) => state.byId[action.payload.id],
            prepare: (id) => ({ payload: id })
        },
    };
}

function createExtraActions() {

    return {
        getQuestions: createAsyncThunk(
            `${name}/getQuestions`,
            async () => await API._getQuestions()
        ),
        storeAnswer: createAsyncThunk(
            `${name}/storeAnswer`,
            async (args) => (await API.saveQuestionAnswer({
                authedUser: args.userId,
                qid: args.questionId,
                answer: args.answer,
            }))
        ),
        storeQuestion: createAsyncThunk(
            `${name}/storeQuestion`,
            async (args) => await API.saveQuestion(args)
        ),
    }
}

function createExtraReducers() {
    return (builder) => {
        buildReducerGetQuestions();
        buildReducerStoreAnswer();
        buildReducerStoreQuestion();

        function buildReducerGetQuestions() {
            var { pending, fulfilled, rejected } = extraActions.getQuestions;
            builder
                .addCase(pending, (state) => {
                    state.status = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.byId = action.payload;
                    state.allIds = Object.keys(state.byId);
                    state.status = { loading: false };
                })
                .addCase(rejected, (state, action) => {
                    state.status = { error: action.error };
                })
        }

        function buildReducerStoreAnswer() {
            var { pending, fulfilled, rejected } = extraActions.storeAnswer;
            builder
                .addCase(pending, (state) => {
                    state.status = { loading: true };
                })
                .addCase(fulfilled, (state, action) => ({
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.meta.arg.questionId]: {
                            ...state.byId[action.meta.arg.questionId],
                            [action.meta.arg.answer]: {
                                ...state.byId[action.meta.arg.questionId][action.meta.arg.answer],
                                votes: [
                                    ...state.byId[action.meta.arg.questionId][action.meta.arg.answer].votes,
                                    action.meta.arg.userId,
                                ]
                            },
                        }
                    }
                }))
                .addCase(rejected, (state, action) => {
                    state.status = { error: action.error };
                })
        }

        function buildReducerStoreQuestion() {
            var { pending, fulfilled, rejected } = extraActions.storeQuestion;
            builder
                .addCase(pending, (state) => {
                    state.status = { loading: true };
                })
                .addCase(fulfilled, (state, action) => ({
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.payload.id]: {
                            ...action.payload,
                        },
                    },
                    allIds: [action.payload.id, ...state.allIds],
                }))
                .addCase(rejected, (state, action) => {
                    state.status = { error: action.error };
                })
        }
    }
}
