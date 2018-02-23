import { replace } from 'react-router-redux'
import API from '../../api/client'
import { push } from 'react-router-redux'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS,
  AUTH_ERROR
} from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new API()

export default ({ email, password }) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    api.authenticate(email, password)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        const jwt = res.body.token
        api.storeToken(jwt)
        dispatch(replace('/'))
        return api.get('/users/me')
      })
      .then((res) => {
        dispatch({
          type: USER_SIGNED_IN,
          payload: res.body
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

export const Authenticated = () => {
  return dispatch => {
    if (!api.isAuthenticated()) {
      dispatch({ type: AUTH_ERROR })
      dispatch(push('/sign-in'))
      return
    }
  }
}
