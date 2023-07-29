import {all, fork} from "redux-saga/effects";
import {loginSaga} from "./LoginSaga";
import UniversalTableSaga from "./UniversalTableSaga";

export function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(UniversalTableSaga)
    ])
}