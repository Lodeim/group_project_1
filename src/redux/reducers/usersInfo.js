import { GET_USERS_INFO_FAILED, GET_USERS_INFO_STARTED, GET_USERS_INFO_SUCCESS } from "../actionCreators/usersInfo";

const initialState = {
    usersInfo: [],
    isUsersInfoLoading: true,
    isUsersInfoError: false,
};

export const usersInfoReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USERS_INFO_STARTED:
        return {
          ...state,
          isUsersInfoLoading: true,
        };
      case GET_USERS_INFO_SUCCESS:
        return {
          ...state,
          isUsersInfoLoading: false,
          usersInfo: action.payload,
          isUsersInfoError: false,
        };
      case GET_USERS_INFO_FAILED:
        return {
          ...state,
          isUsersInfoLoading: false,
          isUsersInfoError: true,
        };
      default:
        return {
          ...state,
        };
    }
  };
  