import { all, fork } from 'redux-saga/effects'
import { rootSaga } from './root/rootSaga';
import { homeSaga } from './home/homeSaga';
import { userSaga } from './user/userSaga';
import { categorySaga } from './category/categorySaga';
import { articleSaga } from './article/articleSaga';
export function* appSaga(){
  yield all([
    rootSaga(),
    homeSaga(),
    userSaga(),
    categorySaga(),
    articleSaga(),
  ])
}

// export function* appSaga(){
//   yield all([
//     fork(rootSaga),
//     fork(homeSaga),
//     fork(userSaga),
//     fork(categorySaga),
//     fork(articleSaga),
//   ])
// }