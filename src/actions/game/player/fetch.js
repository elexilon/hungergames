import API from '../../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../../loading'

export const FETCHED_PLAYERS = 'FETCHED_PLAYERS'

const api = new API()

export default (gameId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    api.get(`/games/${gameId}/players`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: FETCHED_PLAYERS,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}