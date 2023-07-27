import { call, takeLatest, put, retry } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import axios from "axios";
import { CourseModel } from "../models/course.model";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/user.model";
import {
  loginUser,
  signUpUser,
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
  const userResponse: Response = yield call(getUserData);
  yield put(signUpUser(userResponse.data.userData));
}

export function* userAuthentication(action: PayloadAction<UserModel>) {
  let user: UserModel = action.payload;
  let response: Response = yield call(userLogin, user);

  if (response.data.status && response.data.token !== undefined) {
    localStorage["auth-token"] = response.data.token;
    yield put(loginUser({ user : response.data.user, isUserAuthenticated: true }));
    localStorage["userId"] = response.data.user._id;
  }
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
    const response: Response = yield call(getCourses, action.payload);

    yield put(addCourses(response.data.courses));
    yield put(searchCourses(response.data.courses));
  } catch (error) {}
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
    const response: Response = yield call(getCourseById, action.payload);

    yield put(addSelectedCourse(response.data.course));
  } catch (error) {}
}

export function* addNewUser({ payload }: PayloadAction<UserModel>) {
  try {
    yield call(userSignUp, payload);
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeLatest(sagaActions.AUTHENTICATE_USER, userAuthentication);
  yield takeLatest(sagaActions.FETCH_COURSES_SAGA_ACTION,fetchCourses);
  yield takeLatest(sagaActions.FETCH_COURSE_BY_ID, fetchCourseById);
  yield takeLatest(sagaActions.ADD_NEW_USER, addNewUser);
  yield takeLatest(sagaActions.GET_USER, getUserFromServer);
}
