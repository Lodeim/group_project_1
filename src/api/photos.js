import { makeRequest } from "./makeRequest";

const URL = "/posts";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UxMjgyNTU5Yjk4YjAzOGY3N2IyMTgiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1NzAwNDIwLCJleHAiOjE3MDcyMzY0MjB9.iMCP_CQ0es5RaQI0LSEmoBuwMwEx3tNSvrtZUJn5ufM";

export const getPhotos = (config) =>
  makeRequest({
    method: "GET",
    url: URL,
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    ...config,
  });

export const mutatePhoto = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    ...config,
  });
};
