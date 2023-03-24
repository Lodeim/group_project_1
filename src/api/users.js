import { makeRequest } from "./makeRequest";

const URL = "/users";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMjgyNTU5Yjk4YjAzOGY3N2IyMTgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAwNDIwLCJleHAiOjE3MDcyMzY0MjB9.iMCP_CQ0es5RaQI0LSEmoBuwMwEx3tNSvrtZUJn5ufM";

export const getUser = (userId, config) =>
  makeRequest({
    method: "GET",
    url: `${URL}/me`,
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    ...config,
  });

export const mutateUser = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    ...config,
  });
};
