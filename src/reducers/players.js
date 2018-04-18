import {
  FETCHED_PLAYERS
} from '../actions/game'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_PLAYERS:
      return payload
    default:
      return state
  }
}