import axios from "axios";
import { getError } from "../utils";

const API_ENDPOINT = "https://api.react-learning.ru";
const groupId = "/v2/group-10";
const headers = {
  'content-type': 'application/json',
  Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U2MTVkNzU5Yjk4YjAzOGY3N2I0ZWYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MDIzNDI1LCJleHAiOjE3MDc1NTk0MjV9.sN3kyESC9Qlq9Xg2R2guEDXp3ErtuwfBUD4d9pQP2IM'
}

export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${groupId}${config.url}`;
  config.headers = headers;
  return axios(config).catch((err) => getError(err));
};
