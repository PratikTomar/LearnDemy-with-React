import { call, takeLatest, put, retry } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import axios from "axios";
import { CourseModel } from "../models/course.model";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/user.model";
import {
  addExistingUser,
  signUpUserReducer,
} from "../redux/reducer/auth.reducer";
import { setCourseById, setCourses } from "../redux/reducer/course.reducer";
import { searchCourses } from "../redux/reducer/search.reducer";

type Response = {
  data: any;
  config: any;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

async function loginUser(user: UserModel) {
  const res = axios.post<UserModel>("http://localhost:3600/login", {
    email: user.email,
    password: user.password,
  });

  return res;
}

function signUpUser(user: UserModel) {
  const res = axios.post<UserModel>("http://localhost:3600/signup", {
    email: user.email,
    password: user.password,
    name: user.name,
  });
  return res;
}

function getUserData() {
  const res = axios.get<UserModel[]>(
    `http://localhost:3600/user/userData/${localStorage["userId"]}`
  );
  return res;
}

function* getUserFromServer() {
  const userResponse: Response = yield call(getUserData);
  yield put(signUpUserReducer(userResponse.data));
}

export function* authenticateUser(action: PayloadAction<UserModel>) {
  let user: UserModel = action.payload;
  let response: Response = yield call(loginUser, user);


  if (response.data.status && response.data.token !== undefined) {
    localStorage["auth-token"] = response.data.token;
    yield put(addExistingUser({ user, isUserAuthenticated: true }));
    yield put(signUpUserReducer(response.data.user));
    localStorage["userId"] = response.data.user._id;
  }
}

function GetCourses(token: string) {
  return axios.get<CourseModel[]>("http://localhost:3600/courses", {
    headers: {
      Authorization: `Bearer ${localStorage["auth-token"]}`,
    },
  });
}

export function* fetchCourses(action: PayloadAction<string>) {
  try {
    const response: Response = yield call(GetCourses, action.payload);
    yield put(setCourses(response.data));
    yield put(searchCourses(response.data));
  } catch (error) {}
}

function GetCourseById(id: number) {
  return axios.get<CourseModel[]>(`http://localhost:3600/courseDetail/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage["auth-token"]}`,
    },
  });
}

export function* fetchCourseById(action: PayloadAction<number>) {
  try {
    const response: Response = yield call(GetCourseById, action.payload);
    yield put(setCourseById(response.data));
  } catch (error) {}
}

export function* addNewUser({ payload }: PayloadAction<UserModel>) {
  try {
    yield call(signUpUser, payload);
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeLatest(sagaActions.AUTHENTICATE_USER, authenticateUser);
  yield takeLatest(sagaActions.FETCH_COURSES_SAGA_ACTION, fetchCourses);
  yield takeLatest(sagaActions.FETCH_COURSE_BY_ID, fetchCourseById);
  yield takeLatest(sagaActions.ADD_NEW_USER, addNewUser);
  yield takeLatest(sagaActions.GET_USER, getUserFromServer);
}
