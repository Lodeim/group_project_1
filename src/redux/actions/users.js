import { api } from "../../api";
import { getUserById } from "../../api/users";
import {
  getAuthorizedUserFailed,
  getAuthorizedUserStarted,
  getAuthorizedUserSucces,
  getUserFailed,
  getUserStarted,
  getUserSuccess,
  mutateUserStarted,
  mutateUserSuccess,
} from "../actionCreators/users";

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getUserStarted());
      const response = await getUserById(id);
      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserFailed(error));
    }
  };
};

export const getAuthorizedUser = () => {
  return async (dispatch) => {
    try {
      dispatch(getAuthorizedUserStarted());
      const response = await api.users.getUser();
      dispatch(getAuthorizedUserSucces(response.data));
    } catch (error) {
      dispatch(getAuthorizedUserFailed(error));
    }
  };
};

export const mutateUser = (data) => {
  return async (dispatch, getState) => {
    dispatch(mutateUserStarted());
    const newUser = { ...data };
    try {
      const response = await api.users.mutateUser({
        data: newUser,
        url: `/me`,
      });

      dispatch(getUserSuccess(response.data));
    } finally {
      dispatch(mutateUserSuccess());
    }
  };
};

export const mutateUserAvatar = (data) => {
  return async (dispatch, getState) => {
    dispatch(mutateUserStarted());
    const newAvatar = { ...data };
    console.log(newAvatar);
    try {
      const response = await api.users.mutateUser({
        data: newAvatar,
        url: `/me/avatar`,
      });

      dispatch(getUserSuccess(response.data));
    } finally {
      dispatch(mutateUserSuccess());
    }
  };
};