import { makeRequest } from "./makeRequest";

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
    method: "PUT",
    ...config,
  });
};

export const getUserById = (id) =>
  makeRequest({
    method: "GET",
    url: `${URL}/${id}`
  })

export const getUsersInfo = (config) =>
  makeRequest({
    method: "GET",
    url: `${URL}`,
    ...config,
  }); 