import Cookies from "js-cookie";
import { makeAllUsersRequest, makeRequest, makeUserRequest } from "./makeRequest";

const URL = "/users";
export const getUser = (userId, config) =>
  makeRequest({
    method: "GET",
    url: `${URL}/me`,
    ...config,
  });

export const mutateUser = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    method: "PATCH",
    ...config,
  });
};

export const getUserById = (id) =>
  makeRequest({
    method: "GET",
    url: `${URL}/${id}`
  })


export const getUsersInfo = (config) =>
  makeAllUsersRequest({
    method: "GET",
    url: `${URL}`,
    ...config,
  }); 

export const signupUser = (data) =>
makeUserRequest({
      method: 'POST',
      data: JSON.stringify(data),
      url: `/signup`
    })

export const authUser = (data) =>
makeUserRequest({
    method: 'POST',
    data: JSON.stringify(data),
    url: `/signin`
}).then(res => {
    res.data.token
    ? Cookies.set('auth', `${res.data.token}`)
    : console.log(res)
})
