export const GET_USERS_INFO_SUCCESS = "GET_USERS_INFO_SUCCESS";
export const GET_USERS_INFO_FAILED = "GET_USERS_INFO_FAILED";
export const GET_USERS_INFO_STARTED = "GET_USERS_INFO_STARTED";


export const getUsersInfoSuccess = (usersInfo) => ({
    type: GET_USERS_INFO_SUCCESS,
    payload: usersInfo,
  });
  
  export const getUsersInfoFailed = (error) => ({
    type: GET_USERS_INFO_FAILED,
    payload: error,
  });
  
  export const getUsersInfoStarted = () => ({
    type: GET_USERS_INFO_STARTED,
  });