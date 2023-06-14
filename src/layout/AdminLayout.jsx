import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/UI/button/Button";
import { useDispatch } from "react-redux";
import { logOut } from "../store/auth/authThunk";
import { snackbarActions } from "../store/snackbar";
import { authActions } from "../store/auth/authSlice";
// import { Button } from "@mui/material";

export const AdminLayout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const nav = navigate("/signup");
  const logoutHandler = () => {
    dispatch(authActions.logOut());
    dispatch(snackbarActions.doSuccess("SuccessFully logged out"));
  };
  return (
    <HeaderStyle>
      <header>
        <Button
          variant="outlined"
          onClick={logoutHandler}
          bgColor="#fff"
          border="1px solid #8A2B06"
          color="#8A2B06"
          variants="outlined"
          fontWeight="600"
          fontSize="16px"
          padding="10px 32px"
          hvBgColor="#8A2B06"
          hvColor="#fff"
          acvColor="#fff"
        >
          LogOut
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
    </HeaderStyle>
  );
};
const ButtonLogout = styled("button")``;

const HeaderStyle = styled.header`
  position: fixed;
  width: 100%;
  height: 101px;
  background-color: #8a2b06;
  padding: 22px 120px;
  color: #ffffff;
  top: 0;
  z-index: 998;

  .bump {
    animation: bump 300ms ease-out;
  }

  @keyframes bump {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`;
