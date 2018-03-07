import { FETCHED_GAMES, FETCHED_ONE_GAME } from '../actions/game/fetch'
import { CREATE_GAME  } from '../actions/game/create'


export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_GAMES :
    case FETCHED_ONE_GAME :
      return payload

    case CREATE_GAME :
      return state.concat(payload)

    default :
      return state
  }
}
