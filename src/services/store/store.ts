import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../reducers/gameReducer';

const rootReducer = combineReducers({
    games: gameReducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
