import * as actionTypes from '../action-types/action-types';

export const fetchGamesRequest = () => ({
  type: actionTypes.FETCH_GAMES_REQUEST,
});

export const fetchGamesSuccess = (games) => ({
  type: actionTypes.FETCH_GAMES_SUCCESS,
  payload: games,
});

export const fetchGamesFailure = (error) => ({
  type: actionTypes.FETCH_GAMES_FAILURE,
  payload: error,
});

export const setCurrentPage = (page) => ({
  type: actionTypes.SET_CURRENT_PAGE,
  payload: page,
});

export const setPlatformFilter = (platform) => ({
  type: actionTypes.SET_PLATFORM_FILTER,
  payload: platform,
});

export const setSelectedGenres = (genres) => ({
  type: actionTypes.SET_SELECTED_GENRES,
  payload: genres,
});

export const setSortType = (type) => ({
  type: actionTypes.SET_SORT_TYPE,
  payload: type,
});

export const setSortOrder = (order) => ({
  type: actionTypes.SET_SORT_ORDER,
  payload: order,
});

export const setUniqueGenres = (genres) => {
  return {
    type: actionTypes.SET_UNIQUE_GENRES,
    payload: genres,
  };
};

export const toggleFirstTour = () => ({
  type: actionTypes.TOGGLE_FIRST_TOUR
});

export const toggleSecondTour = () => ({
  type: actionTypes.TOGGLE_SECOND_TOUR
});

export const setTourButtonStatus = () => ({
  type: actionTypes.SET_TOUR_BUTTON_STATUS
})