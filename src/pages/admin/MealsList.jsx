import React, { useState } from "react";
import { PostAdminMeals } from "../../store/admin/AdminMealsThunk";
import { useDispatch } from "react-redux";
import { TextField, styled } from "@mui/material";
import { ModalMui } from "../../components/UI/modal/Modal";
import { Button } from "../../components/UI/button/Button";

export const MealsList = ({ toggle, open, setToggle }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    price: "",
  });

  const OnchangeTitleHandler = (e) => {
    setInputValue({
      ...inputValue,
      title: e.target.value,
    });
  };
  const OnchangeDescriptionHandler = (e) => {
    setInputValue({
      ...inputValue,

      description: e.target.value,
    });
  };
  const OnchangePriceHandler = (e) => {
    setInputValue({
      ...inputValue,
      price: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setToggle(false);
    const data = {
      title: inputValue.title,
      description: inputValue.description,
      price: +inputValue.price,
    };
    dispatch(PostAdminMeals(data));

    setInputValue({
      title: "",
      price: "",
      description: "",
    });
  };

  return (
    <ModalMui open={open}>
      <FormStyle onSubmit={submitHandler}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          value={inputValue.title}
          type="text"
          placeholder="Title"
          onChange={OnchangeTitleHandler}
        />
        <TextField
          value={inputValue.description}
          type="text"
          placeholder="Description"
          onChange={OnchangeDescriptionHandler}
        />
        <TextField
          value={inputValue.price}
          type="number"
          placeholder="price"
          onChange={OnchangePriceHandler}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
        <Button onClick={toggle} variant="contained">
          Cancel
        </Button>
      </FormStyle>
    </ModalMui>
  );
};

const MealADdList = styled("div")`
  width: 50%;
  height: 500px;
  /* background-color: #deecec; */
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 300px;
`;

const FormStyle = styled("form")`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
