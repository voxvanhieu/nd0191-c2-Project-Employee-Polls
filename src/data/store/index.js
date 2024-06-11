import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice'
import { usersReducer } from './users.slice'
import { pollsReducer } from './poll.slice';

export * from './alert.slice'
export * from './auth.slice'
export * from './users.slice'
export * from './poll.slice'

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        polls: pollsReducer,
    }
})