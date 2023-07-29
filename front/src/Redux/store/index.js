import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../reducers/LoginReducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../sagas/RootSaga";
import UniversalTableReducer from "../reducers/UniversalTableReducer";
const sagaMiddleWhere = createSagaMiddleware()
export const  store = configureStore({
    reducer:{
        loginReducer,
        UniversalTableReducer
    },
    middleware:[sagaMiddleWhere]
})
sagaMiddleWhere.run(rootSaga)
