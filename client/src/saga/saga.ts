import { call, takeLatest, put, retry } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import axios from "axios";
import { CourseModel } from "../models/course.model";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/user.model";
import {
  loginUser,
  signUpUser,
  isLoadingContent,
} from "../redux/reducer/auth.reducer";
import { addSelectedCourse, addCourses } from "../redux/reducer/course.reducer";
import { searchCourses } from "../redux/reducer/search.reducer";

type Response = {
  data: any;
  config: any;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

const userLogin = async (user: UserModel) => {
  const res = await axios.post<UserModel>("http://localhost:3600/login", {
    email: user.email,
    password: user.password,
  });
  return res;
};

const userSignUp = async (user: UserModel) => {
  const res = await axios.post<UserModel>("http://localhost:3600/signup", {
    email: user.email,
    password: user.password,
    name: user.name,
  });
  return res;
};

const getUserData = async () => {
  const res = await axios.get<UserModel[]>(
    `http://localhost:3600/user/userData/${localStorage["userId"]}`
  );
  return res;
};

function* getUserFromServer() {
  yield put(isLoadingContent(true));
  const userResponse: Response = yield call(getUserData);
  yield put(signUpUser(userResponse.data.userData));
  yield put(isLoadingContent(false));
}

export function* userAuthentication(action: PayloadAction<UserModel>) {
  yield put(isLoadingContent(true));
  let user: UserModel = action.payload;
  let response: Response = yield call(userLogin, user);

  if (response.data.status && response.data.token !== undefined) {
    localStorage["auth-token"] = response.data.token;
    yield put(
      loginUser({
        user: response.data.user,
        isUserAuthenticated: true,
        isLoading: false,
      })
    );
    localStorage["userId"] = response.data.user._id;
  }
  yield put(isLoadingContent(false));
}

const getCourses = async (token: string) => {
  return axios.get<CourseModel[]>("http://localhost:3600/courses", {
    headers: {
      Authorization: `Bearer ${localStorage["auth-token"]}`,
    },
  });
};

export function* fetchCourses(action: PayloadAction<string>) {
  try {
    yield put(isLoadingContent(true));
    const response: Response = yield call(getCourses, action.payload);

    yield put(addCourses(response.data.courses));
    yield put(searchCourses(response.data.courses));
    yield put(isLoadingContent(false));
  } catch (error) {
    console.log(error);
    yield put(isLoadingContent(false));
  }
}

const getCourseById = async (id: number) => {
  return axios.get<CourseModel[]>(`http://localhost:3600/courseDetail/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage["auth-token"]}`,
    },
  });
};

export function* fetchCourseById(action: PayloadAction<number>) {
  try {
    yield put(isLoadingContent(true));
    const response: Response = yield call(getCourseById, action.payload);

    yield put(addSelectedCourse(response.data.course));
    yield put(isLoadingContent(false));
  } catch (error) {
    console.log(error);
    yield put(isLoadingContent(false));
  }
}

export function* addNewUser({ payload }: PayloadAction<UserModel>) {
  try {
    yield put(isLoadingContent(true));
    yield call(userSignUp, payload);
    yield put(isLoadingContent(false));
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeLatest(sagaActions.AUTHENTICATE_USER, userAuthentication);
  yield takeLatest(sagaActions.FETCH_COURSES_SAGA_ACTION, fetchCourses);
  yield takeLatest(sagaActions.FETCH_COURSE_BY_ID, fetchCourseById);
  yield takeLatest(sagaActions.ADD_NEW_USER, addNewUser);
  yield takeLatest(sagaActions.GET_USER, getUserFromServer);
}
