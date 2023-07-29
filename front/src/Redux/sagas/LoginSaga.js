import {takeEvery, put} from "redux-saga/effects"
import {loginModel} from "../reducers/LoginReducer";
import axios from "axios";
import {select} from "redux-saga/effects"

function* watchLoginUser(action) {
   try {
       const currentState = yield select((state) => state.loginReducer);
       const res = yield axios({
           url: `http://localhost:8080/api/auth/login`,
           method: "post",
           data: action.payload
       })
       const resString = JSON.stringify(res);
       yield put(loginModel.navigateToAdmin({res: resString}))
   }catch(err){
       alert(err.response.data)
   }
}

export function* loginSaga() {
    yield takeEvery("login/loginUser", watchLoginUser)
}