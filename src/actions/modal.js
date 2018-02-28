export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'


export const openModal = () => {
  return dispatch => {
    dispatch({ type: OPEN_MODAL, payload: true })
  }
}

export const closeModal = () => {
  return dispatch => {
    dispatch({ type: CLOSE_MODAL, payload: false })
  }
}
