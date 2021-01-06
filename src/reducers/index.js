import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import SelectionFrom from './SelectionReducer.js'


const rootReducer = combineReducers({
  dialog: DialogReducer,
  filterValue: SelectionFrom
});

export default rootReducer
