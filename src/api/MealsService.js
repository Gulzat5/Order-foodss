import axiosInstance from "../config/axiosInstance";

export const postAddMeals = (data) => {
  return axiosInstance.post("/foods", data);
};

export const deleteMealAdmin = (id) => {
  return axiosInstance.delete(`/foods/${id}`);
};

export const EditMealAdmin = (data) => {
  const Newdata = {
    title: data.title,
    description: data.description,
    price: +data.price,
  };
  return axiosInstance.put(`/foods/${data.id}`, Newdata);
};
