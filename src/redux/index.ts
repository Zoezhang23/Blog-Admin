import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import searchTable, { SearchTableState } from '../pages/search-table/redux/reducer';
import categoryTable, { CategoryTableState } from '../pages/category/redux/reducer';

export interface ReducerState {
  global: GlobalState;
  searchTable: SearchTableState;
  categoryTable: CategoryTableState;

}

export default combineReducers({
  global,
  searchTable,
  categoryTable
});
