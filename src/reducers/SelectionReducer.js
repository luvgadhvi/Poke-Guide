const INITIAL_STATE = {
  values: { searchValue: '', type: 'All' }
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'dropdown':
      return { ...state, values: action.payload };
    default:
      return state;
  }
};
