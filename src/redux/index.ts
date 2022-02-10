import { combineReducers } from 'redux';
import global, { GlobalState } from './global';
import searchTable, { SearchTableState } from '../pages/search-table/redux/reducer';
import categoryTable, { CategoryTableState } from '../pages/category/redux/reducer';
import tagTable, { TagTableState } from '../pages/tag/redux/reducer';

export interface ReducerState {
  global: GlobalState;
  searchTable: SearchTableState;
  categoryTable: CategoryTableState;
  tagTable: TagTableState

}

export default combineReducers({
  global,
  searchTable,
  categoryTable,
  tagTable,
});
