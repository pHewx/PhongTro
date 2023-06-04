import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from "./";
import * as actions from "../../store/actions";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div>
      <Header />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <div className="flex-auto bg-white shadow-md p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
