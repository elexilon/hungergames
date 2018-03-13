import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR
} from '../loading'


export const UPDATE_GAME = 'UPDATE_GAME'

const api = new API()

export default (game) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    api.patch('/games/' + game._id, game)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: UPDATE_GAME,
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
