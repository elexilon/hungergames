import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

export default (state = false, { type, payload } = {}) => {
  switch(type) {
    case OPEN_MODAL :
    case CLOSE_MODAL :
      return payload

    default :
      return state
  }
}
