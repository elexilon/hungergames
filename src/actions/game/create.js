import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR
} from '../loading'


export const CREATE_GAME = 'CREATE_GAME'

const api = new API()

export default (game) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    api.post('/games', game)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: CREATE_GAME,
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
