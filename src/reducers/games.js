import {
  FETCHED_GAMES,
  FETCHED_ONE_GAME,
  CREATE_GAME,
  UPDATE_GAME
} from '../actions/game'


export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_GAMES :
      return payload
    case UPDATE_GAME :
    case FETCHED_ONE_GAME :
      const games = state.filter(game => game._id !== payload._id)
      return games.concat(payload)
    
    case CREATE_GAME :
      return state.concat(payload)

    default :
      return state
  }
}
