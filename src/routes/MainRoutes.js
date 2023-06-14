import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

import { UsersLayout } from "../layout/UsersLayout";
import { MealLayout } from "../layout/MealLayout";
import { AdminLayout } from "../layout/AdminLayout";
import { AdminMeals } from "../pages/admin/AdminMeals";
import { useSelector } from "react-redux";
import { ProtectedRouted } from "./ProtectedRouted";
import { USERS_ROLE } from "../constants";

export const MainRoutes = () => {
  const role = useSelector((state) => state.auth.user.role);

  const isAllowed = (roles) => {
    return roles.includes(role);
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouted
            isAllowed={isAllowed([USERS_ROLE.USER, USERS_ROLE.GUEST])}
            fallBacPath="/admin"
            component={UsersLayout}
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRouted
              isAllowed={isAllowed([USERS_ROLE.USER, USERS_ROLE.GUEST])}
              fallBacPath="/admin"
              component={MealLayout}
            />
          }
        />

        <Route
          path="signin"
          element={
            <ProtectedRouted
              isAllowed={isAllowed([USERS_ROLE.USER, USERS_ROLE.GUEST])}
              fallBacPath={role === USERS_ROLE.USER ? "/admin" : "/"}
              component={SignIn}
            />
          }
        >
          <Route
            path="signup"
            element={
              <ProtectedRouted
                isAllowed={isAllowed([USERS_ROLE.USER, USERS_ROLE.GUEST])}
                fallBacPath={role === USERS_ROLE.USER ? "/admin" : "/"}
                component={SignUp}
              />
            }
          />
        </Route>
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRouted
            isAllowed={isAllowed([USERS_ROLE.ADMIN])}
            fallBacPath="/"
            component={AdminLayout}
          />
        }
      >
        <Route index element={<AdminMeals />} />
      </Route>
    </Routes>
  );
};
