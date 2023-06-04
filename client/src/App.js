import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Rental,
  Homepage,
  DetailPost,
  SearchDetail,
} from "./containers/Public";
import { path } from "./ultils/constant";
import { System, CreatePost, UpdateUser } from "./containers/System";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ListPost from "./containers/System/ListPost";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    isLoggedIn && dispatch(actions.getCurrent());
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
    dispatch(actions.getCategories());
  }, []);

  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          <Route path={"chi-tiet/:id"} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route
            index
            path={path.CREATE_POST}
            element={<CreatePost />}
            state={{ flag: true }}
          />
          <Route path={path.UPDATE_MY_ACCOUNT} element={<UpdateUser />} />
          <Route path={path.MY_POSTS} element={<ListPost />} />
          <Route
            path={path.UPDATE_MY_POST__POSTID}
            element={<CreatePost />}
            state={{ flag: false }}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
