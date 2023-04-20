import { api } from "../../api";
import {
  getUsersInfoFailed,
  getUsersInfoStarted,
  getUsersInfoSuccess,
} from "../actionCreators/usersInfo";

export const getUsersInfo = () => {
  return async (dispatch) => {
    try {
      dispatch(getUsersInfoStarted());
      const response = await api.usersInfo.getUsersInfo();

      dispatch(getUsersInfoSuccess(response.data));
    } catch (error) {
      dispatch(getUsersInfoFailed(error));
    }
  };
};
