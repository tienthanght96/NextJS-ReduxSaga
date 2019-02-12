import { combineReducers } from 'redux';
import { rootReducer } from './root/rootReducer';
import { homeReducer } from './home/homeReducer';
import { modalReducer } from './modal/modalReducer';
import { userReducer } from './user/userReducer';
import { categoryReducer } from './category/categoryReducer';
import { articleReducer } from './article/articleReducer';
import { tagsReducer } from './tags/tagsReducer';

export const appReducer = combineReducers({
  root: rootReducer,
  home: homeReducer,
  modal: modalReducer,
  user: userReducer,
  category: categoryReducer,
  article: articleReducer,
  tags: tagsReducer
});