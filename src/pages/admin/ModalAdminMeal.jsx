import { TextField } from "@mui/material";
import React, { useState } from "react";
import { EditodoMeal } from "../../store/admin/AdminMealsThunk";
import { useDispatch } from "react-redux";
import { Button } from "../../components/UI/button/Button";
import { ModalMui } from "../../components/UI/modal/Modal";
import styled from "styled-components";
import { snackbarActions } from "../../store/snackbar";
export const ModalAdminMeal = ({ onClose, open, data }) => {
  const dispatch = useDispatch();
  const [editDataTitle, setEditDataTitle] = useState(data.title);
  const [editDescription, setDescrioption] = useState(data.description);
  const [price, setPrice] = useState(data.price);

  console.log(data);
  const saveHandler = () => {
    const saveData = {
      id: data._id,
      title: editDataTitle,
      description: editDescription,
      price: +price,
    };
    try {
      dispatch(EditodoMeal(saveData)).unwrap();
      dispatch(snackbarActions.doSuccess("Successfully saved"));
    } catch (error) {
      dispatch(snackbarActions.doError("Something went wrong"));
    }
    onClose();
  };
  return (
    <ModalMui open={open}>
      <MainContainer>
        <TextField
          id="outlined-basic"
          label="Outlined"
          value={editDataTitle}
          type="text"
          placeholder="Title"
          name="title"
          onChange={(e) => setEditDataTitle(e.target.value)}
        />
        <TextField
          name="descrioption"
          value={editDescription}
          type="text"
          placeholder="Description"
          onChange={(e) => setDescrioption(e.target.value)}
        />
        <TextField
          value={price}
          type="number"
          placeholder="price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button onClick={saveHandler}>save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </MainContainer>
    </ModalMui>
  );
};

const MainContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 30px;
`;
