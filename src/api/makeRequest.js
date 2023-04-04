import axios from "axios";
import { getError } from "../utils";

const API_ENDPOINT = "https://api.react-learning.ru";
const groupId = "/v2/group-10";
const headers = {
  'content-type': 'application/json',
  Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4YTFmYzU5Yjk4YjAzOGY3N2I1MmUiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjgwNjAwMzM4LCJleHAiOjE3MTIxMzYzMzh9.EfdKMaotM6LYxGq2ugR-24MT4wMsONUCz5-60Q08M2g'
}

export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${groupId}${config.url}`;
  config.headers = headers;
  return axios(config).catch((err) => getError(err));
};
