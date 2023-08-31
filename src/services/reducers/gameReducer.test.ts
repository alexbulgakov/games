import {
    gameReducer as reducer,
    initialState as state
} from './gameReducer';
import * as actionTypes from '../action-types/action-types';
import { games, newPage, newFilter, newGenres, newSortType, newSortOrder, newUniqueGenres } from '../../utils/test-constants';

describe('gameReducer', () => {
    it('should handle FETCH_GAMES_REQUEST', () => {
        expect(
            reducer(state, {
                type: actionTypes.FETCH_GAMES_REQUEST,
            })
        ).toEqual({
            ...state,
            status: 'loading',
        });
    });

    it('should handle FETCH_GAMES_SUCCESS', () => {
        expect(
            reducer(state, {
                type: actionTypes.FETCH_GAMES_SUCCESS,
                payload: games,
            })
        ).toEqual({
            ...state,
            status: 'loaded',
            data: games,
        });
    });

    it('should handle FETCH_GAMES_FAILURE', () => {
        expect(
            reducer(state, {
                type: actionTypes.FETCH_GAMES_FAILURE,
                payload: 'error'
            })
        ).toEqual({
            ...state,
            status: 'error',
        });
    });

    it('should handle SET_CURRENT_PAGE', () => {
        const newState = reducer(state, {
            type: actionTypes.SET_CURRENT_PAGE,
            payload: newPage,
        });
        expect(newState.currentPage).toEqual(newPage);
    });

    it('should handle SET_PLATFORM_FILTER', () => {
        const newState = reducer(state, {
            type: actionTypes.SET_PLATFORM_FILTER,
            payload: newFilter,
        });
        expect(newState.platformFilter).toEqual(newFilter);
    });

    it('should handle SET_SELECTED_GENRES', () => {
        const newState = reducer(state, {
            type: actionTypes.SET_SELECTED_GENRES,
            payload: newGenres,
        });
        expect(newState.selectedGenres).toEqual(newGenres);
    });

    it('should handle SET_SORT_TYPE', () => {
        const newState = reducer(state, {
            type: actionTypes.SET_SORT_TYPE,
            payload: newSortType,
        });
        expect(newState.sortType).toEqual(newSortType);
    });

    it('should handle SET_SORT_ORDER', () => {
        const newState = reducer(state, {
            type: actionTypes.SET_SORT_ORDER,
            payload: newSortOrder,
        });
        expect(newState.sortOrder).toEqual(newSortOrder);
    });

    it('should handle SET_UNIQUE_GENRES', () => {
        const newState = reducer(state, {
            type: actionTypes.SET_UNIQUE_GENRES,
            payload: newUniqueGenres,
        });
        expect(newState.uniqueGenres).toEqual(newUniqueGenres);
    });

    it('should handle TOGGLE_FIRST_TOUR', () => {
        const newState = reducer(state, {
            type: actionTypes.TOGGLE_FIRST_TOUR
        });
        expect(newState.isFirstTourOpen).toEqual(!state.isFirstTourOpen);
    });

    it('should handle TOGGLE_SECOND_TOUR', () => {
        const newState = reducer(state, {
            type: actionTypes.TOGGLE_SECOND_TOUR
        });
        expect(newState.isSecondTourOpen).toEqual(!state.isSecondTourOpen);
    });
});
