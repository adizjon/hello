import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import {universalTable} from "../reducers/UniversalTableReducer"; // Make sure to import tableActions from the correct path

function* changeSizeOfPerPage(action) {
    let api = action.payload.api;
    api = api.replace("{page}", action.payload.currentPage);
    let sizeOfPerPage = action.payload.sizeOfPerPage;
    api = api.replace("{limit}", sizeOfPerPage);
    const {data} = yield axios.get(api);
    yield put({
        type: "universalTable/changeSizeOfPerPageSuccess", payload: {
            data,
            size: sizeOfPerPage,
            currentPage:action.payload.currentPage
        }
    });
}


function* tableSaga() {
    yield takeEvery(universalTable.changeSizeOfPerPage.type, changeSizeOfPerPage)
}

export default tableSaga;