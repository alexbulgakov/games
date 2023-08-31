import * as actionTypes from '../action-types/action-types';
import { TGame } from '../../utils/types';
import { TUnionAction } from '../actions/gameActions';

type TInitialState = {
    data: [] | Array<TGame>,
    status: 'loading' | 'loaded' | 'error',
    currentPage: number,
    platformFilter: 'all' | 'browser' | 'pc',
    selectedGenres: string[],
    sortType: 'none' | 'release-date' | 'alphabetical' | 'popularity' | 'relevance',
    sortOrder: 'asc' | 'desc',
    uniqueGenres: string[],
    isFirstTourOpen: boolean,
    isSecondTourOpen: boolean,
}

const initialState: TInitialState = {
    data: [],
    status: 'loading',
    currentPage: 1,
    platformFilter: 'all',
    selectedGenres: [],
    sortType: 'none',
    sortOrder: 'asc',
    uniqueGenres: [],
    isFirstTourOpen: false,
    isSecondTourOpen: false,
};

const gameReducer = (state = initialState, action: TUnionAction): TInitialState => {
    switch (action.type) {
        case actionTypes.FETCH_GAMES_REQUEST:
            return { ...state, status: 'loading' };
        case actionTypes.FETCH_GAMES_SUCCESS:
            return { ...state, status: 'loaded', data: action.payload };
        case actionTypes.FETCH_GAMES_FAILURE:
            return { ...state, status: 'error' };
        case actionTypes.SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case actionTypes.SET_PLATFORM_FILTER:
            return { ...state, platformFilter: action.payload };
        case actionTypes.SET_SELECTED_GENRES:
            return { ...state, selectedGenres: action.payload };
        case actionTypes.SET_SORT_TYPE:
            return { ...state, sortType: action.payload };
        case actionTypes.SET_SORT_ORDER:
            return { ...state, sortOrder: action.payload };
        case actionTypes.SET_UNIQUE_GENRES:
            return {
                ...state,
                uniqueGenres: action.payload,
            };
        case actionTypes.TOGGLE_FIRST_TOUR:
            return { ...state, isFirstTourOpen: !state.isFirstTourOpen };
        case actionTypes.TOGGLE_SECOND_TOUR:
            return { ...state, isSecondTourOpen: !state.isSecondTourOpen };
        default:
            return state;
    }
};

export default gameReducer;
