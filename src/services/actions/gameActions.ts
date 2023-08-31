import * as actionTypes from '../action-types/action-types';
import { TGame } from '../../utils/types';

interface IFetchGamesRequestAction {
  readonly type: typeof actionTypes.FETCH_GAMES_REQUEST;
}

interface IFetchGamesSuccessAction {
  readonly type: typeof actionTypes.FETCH_GAMES_SUCCESS;
  readonly payload: Array<TGame>;
}

interface IFetchGamesFailureAction {
  readonly type: typeof actionTypes.FETCH_GAMES_FAILURE;
  readonly payload: string;
}

interface ISetCurrentPageAction {
  readonly type: typeof actionTypes.SET_CURRENT_PAGE;
  readonly payload: number;
}

interface ISetPlatformFilterAction {
  readonly type: typeof actionTypes.SET_PLATFORM_FILTER;
  readonly payload: 'all' | 'browser' | 'pc';
}

interface ISetSelectedGenresAction {
  readonly type: typeof actionTypes.SET_SELECTED_GENRES;
  readonly payload: string[];
}

interface ISetSortTypeAction {
  readonly type: typeof actionTypes.SET_SORT_TYPE;
  readonly payload: 'none' | 'release-date' | 'alphabetical' | 'popularity' | 'relevance';
}

interface ISetSortOrderAction {
  readonly type: typeof actionTypes.SET_SORT_ORDER;
  readonly payload: 'asc' | 'desc';
}

interface ISetUniqueGenresAction {
  readonly type: typeof actionTypes.SET_UNIQUE_GENRES;
  readonly payload: string[];
}

interface IToggleFirstTourAction {
  readonly type: typeof actionTypes.TOGGLE_FIRST_TOUR;
}

interface IToggleSecondTourAction {
  readonly type: typeof actionTypes.TOGGLE_SECOND_TOUR;
}

export type TUnionAction =
  | IFetchGamesRequestAction
  | IFetchGamesSuccessAction
  | IFetchGamesFailureAction
  | ISetCurrentPageAction
  | ISetPlatformFilterAction
  | ISetSelectedGenresAction
  | ISetSortTypeAction
  | ISetSortOrderAction
  | ISetUniqueGenresAction
  | IToggleFirstTourAction
  | IToggleSecondTourAction

export const fetchGamesRequest = (): IFetchGamesRequestAction => ({
  type: actionTypes.FETCH_GAMES_REQUEST,
});

export const fetchGamesSuccess = (games: Array<TGame>): IFetchGamesSuccessAction => ({
  type: actionTypes.FETCH_GAMES_SUCCESS,
  payload: games,
});

export const fetchGamesFailure = (error: string): IFetchGamesFailureAction => ({
  type: actionTypes.FETCH_GAMES_FAILURE,
  payload: error,
});

export const setCurrentPage = (page: number): ISetCurrentPageAction => ({
  type: actionTypes.SET_CURRENT_PAGE,
  payload: page,
});

export const setPlatformFilter = (platform: 'all' | 'browser' | 'pc'): ISetPlatformFilterAction => ({
  type: actionTypes.SET_PLATFORM_FILTER,
  payload: platform,
});

export const setSelectedGenres = (genres: string[]): ISetSelectedGenresAction => ({
  type: actionTypes.SET_SELECTED_GENRES,
  payload: genres,
});

export const setSortType = (type: 'none' | 'release-date' | 'alphabetical' | 'popularity' | 'relevance'): ISetSortTypeAction => ({
  type: actionTypes.SET_SORT_TYPE,
  payload: type,
});

export const setSortOrder = (order: 'asc' | 'desc'): ISetSortOrderAction => ({
  type: actionTypes.SET_SORT_ORDER,
  payload: order,
});

export const setUniqueGenres = (genres: string[]): ISetUniqueGenresAction => {
  return {
    type: actionTypes.SET_UNIQUE_GENRES,
    payload: genres,
  };
};

export const toggleFirstTour = (): IToggleFirstTourAction => ({
  type: actionTypes.TOGGLE_FIRST_TOUR,
});

export const toggleSecondTour = (): IToggleSecondTourAction => ({
  type: actionTypes.TOGGLE_SECOND_TOUR,
});
