import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../../store/meals/mealsThunk";
import { MealsList } from "./MealsList";
import { styled } from "@mui/system";
import { DeleteAdminMeals } from "../../store/admin/AdminMealsThunk";
import { ModalAdminMeal } from "./ModalAdminMeal";
import { Button } from "../../components/UI/button/Button";
import { snackbarActions } from "../../store/snackbar";
import { Snackbar } from "../../components/UI/Snackbar";

export const AdminMeals = () => {
  const { meals } = useSelector((state) => state.meals);
  const token = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState();

  const ToggleHandler = () => {
    setOpenEdit((prev) => !prev);
  };

  const EditTodo = (data) => {
    setEditData(data);
    ToggleHandler();
  };

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const deleteMeals = async (id) => {
    try {
      await dispatch(DeleteAdminMeals(id)).unwrap();
      dispatch(snackbarActions.doSuccess("Successfully deleted"));
    } catch (error) {
      dispatch(snackbarActions.doError("Something went wrong"));
    }
  };

  return (
    <>
      <Snackbar />
      <AdminMealContainer>
        {openEdit ? (
          <ModalAdminMeal
            onClose={ToggleHandler}
            data={editData}
            open={openEdit}
          />
        ) : (
          <>
            {meals.map((item) => (
              <div key={item._id}>
                <LineContainer>
                  <MainAdminContainer>
                    <TextStyleDescription>
                      <TextStyle>{item.title}</TextStyle>
                      <i>{item.description}</i>
                      <h3>{item.price}$</h3>
                    </TextStyleDescription>
                    <StyleButton>
                      <Button
                        variant="contained"
                        onClick={() => deleteMeals(item._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        style={{ width: "80px" }}
                        onClick={() => EditTodo(item)}
                      >
                        Edit
                      </Button>
                    </StyleButton>
                  </MainAdminContainer>
                </LineContainer>
              </div>
            ))}

            {toggle ? (
              <>
                <MealsList
                  toggle={toggleHandler}
                  open={toggle}
                  setToggle={setToggle}
                />
              </>
            ) : (
              <div>
                <Button variant="outlined" onClick={toggleHandler}>
                  +Add
                </Button>
              </div>
            )}
          </>
        )}
      </AdminMealContainer>
    </>
  );
};

const AdminMealContainer = styled("div")`
  display: flex;
  margin-left: 10%;
  background-color: #dadada;
  width: 80%;
  height: auto;
  min-height: 600px;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  justify-content: center;
  gap: 30px;
`;

const MainAdminContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 50%;
  height: 9%;
`;

const TextStyle = styled("h3")`
  color: black;
`;

const TextStyleDescription = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
`;

const LineContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: row;
  border-bottom: 2px solid;
  width: 900px;
`;
const StyleButton = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;
