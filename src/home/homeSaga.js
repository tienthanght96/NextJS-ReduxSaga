import { take, put, call, takeLatest, fork, all, select } from 'redux-saga/effects';
import { map } from 'lodash'
import { APP_LOADED } from '../root/rootActions';
import { ArticleApi } from '../api/ApiService';
import {
  fetchedMostView, fetchedNewest, fetchingMostView,
  fetchingNewest, FETCH_NEWEST, FETCH_MOST_VIEW,
  fetchedMoreNewest, fetchMoreNewestError,
  FETCH_MORE_NEWEST, FETCH_TOP_CATEGORY, fetchedTopCategory,
  setListCategoryFetch, resetListTopCategory,
  fetchingRecommendTopic, fetchedRecommendTopic, FETCH_RECOMMEND_TOPIC,
} from './homeActions';
import { getNewestSeletor, getTopCategorySelector } from './homeSelector';
import { userSelector, userFavoriteCategoriesSelector } from '../user/userSelector';
import { USER_LOGIN_SUCCESS } from '../user/userActions';
import { allCategoriesSelector } from '../root/rootSelector';

function* getMostView(action) {
  const { limit } = action.data;
  // yield take(APP_LOADED);
  yield put(fetchingMostView());
  try {
    
    const response = yield call(ArticleApi.getMostTopView, limit);
    yield put(fetchedMostView(response));

  } catch (error) {
    console.log(error)
    yield put(fetchedMostView([]));
  }
}

function* getNewest(action) {
  const { limit, page } = action.data;
  const user = yield select(userSelector);
  const userId = user && user.id ? user.id : null;
  // yield take(APP_LOADED);
  yield put(fetchingNewest());
  try {

    const response = yield call(ArticleApi.getNewestListArticle, page, limit, userId);
    yield put(fetchedNewest(response));
  } catch (error) {
    yield put(fetchedNewest([]));
  }
}
function* getMoreNewest(action) {
  const { page } = action.data;
  const { limit, list } = yield select(getNewestSeletor)
  try {
    const user = yield select(userSelector);
    const userId = user && user.id ? user.id : null;
    const response = yield call(ArticleApi.getNewestListArticle, page, limit, userId);
    if(Array.isArray(response)){
      yield put(fetchedMoreNewest({
        list: list.concat(response),
        hasLoadMore: response.length >=4
      }));
    } else {
      yield put(fetchMoreNewestError());
    }
  } catch (error) {
    yield put(fetchMoreNewestError());
  }
}

function* loadTopCategoryItem(item){
  const data = { list: [], category_id: item.id };
  try {
    // yield put(fetchingTopCategory(item.id));
    const params = { limit: 16, page: 1 };
    const user = yield select(userSelector);
    const userId = user && user.id ? user.id : null;
    if(userId) {
      params.userId = userId;
    }
    const response = yield call(ArticleApi.getTopArticleByCategoryId, item.id, params);
    data.list = response;
    // console.log({ response, item })
    yield put(fetchedTopCategory(data));    
  } catch (error) {
    yield put(fetchedTopCategory(data));    
  }
}
function* getTopCategory(){
  // yield take(APP_LOADED);
  const topCategoryArticles = {}
  yield put(resetListTopCategory());
  const allCategories = yield select(allCategoriesSelector);
  const favoriteCategories = yield select(userFavoriteCategoriesSelector);
  if(Array.isArray(favoriteCategories) && favoriteCategories.length > 0) {
    favoriteCategories.forEach(category => {
      topCategoryArticles[category.id] = {
        isPending: true,
        ...category,
        list: []
      }
    });
  } else {
    allCategories.forEach(category => {
      topCategoryArticles[category.id] = {
        isPending: true,
        ...category,
        list: []
      }
    });
  }
  yield put(setListCategoryFetch(topCategoryArticles));
  yield all(map(topCategoryArticles, item => call(loadTopCategoryItem, item)));
}

function* getRecommendTopic() {
  const user = yield select(userSelector);
  const userId = user && user.id ? user.id : null;
  // yield take(APP_LOADED);
  yield put(fetchingRecommendTopic());
  try {

    const response = yield call(ArticleApi.getRecommendTopicArticles, userId, { startIndex: 0, limit: 6 });
    console.log('response', response)
    yield put(fetchedRecommendTopic(response));
  } catch (error) {
    console.log(error)
    yield put(fetchedRecommendTopic([]));
  }
}

function* watchGetMostView() {
  yield takeLatest([FETCH_MOST_VIEW, USER_LOGIN_SUCCESS], getMostView)
}

function* watchGetNewest() {
  yield takeLatest(FETCH_NEWEST, getNewest)
}
function* watchGetMoreNewest() {
  yield takeLatest(FETCH_MORE_NEWEST, getMoreNewest)
}

function* watchGetTopCategory() {
  yield takeLatest(FETCH_TOP_CATEGORY, getTopCategory)
}

function* watchGetRecommendTopic() {
  yield takeLatest(FETCH_RECOMMEND_TOPIC, getRecommendTopic)
}

export function* homeSaga(){
  yield all([
    watchGetMostView(),
    watchGetNewest(),
    watchGetMoreNewest(),
    watchGetTopCategory(),
    watchGetRecommendTopic()
  ])
}