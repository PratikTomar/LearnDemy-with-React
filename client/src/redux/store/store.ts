import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/auth.reducer";
import rootSaga from "../../saga/saga";
import createSagaMiddleware from "redux-saga";
import coursesReducer from "../reducer/course.reducer";
import cartReducer from "../reducer/cart.reducer";
import searchCoursesReducer from "../reducer/search.reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login: loginReducer,
    courses: coursesReducer,
    cart: cartReducer,
    searchedCourses: searchCoursesReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
