const INITIAL_STATE = {
  isOpen: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true };
    case 'close':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};
