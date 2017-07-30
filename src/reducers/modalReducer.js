const modalReducer = (state = {
  isFirstOpen: false,
  isSecondOpen: false
}, action) => {
  switch(action.type) {
    case 'OPEN_FIRST_MODAL':
      return {
        ...state,
        isFirstOpen: false
      }
    default:
      return state;
  }
}