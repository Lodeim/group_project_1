import axios from "axios";
import { getError } from "../utils";
import Cookies from 'js-cookie'

const authCookie = Cookies.get('auth')
const API_ENDPOINT = "https://api.react-learning.ru";
const groupId = "/v2/group-10";
const headers = {
  'content-type': 'application/json',
  'Authorization': authCookie
}

export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${groupId}${config.url}`;
  config.headers = headers;
  return axios(config).catch((err) => getError(err));
};

export const makeUserRequest = (config) => {
  config.url = `${API_ENDPOINT}${config.url}`;
  config.headers = {'content-type': 'application/json'};
  return axios(config).catch((err) => getError(err));
};

export const makeAllUsersRequest = (config) => {
  config.url = `${API_ENDPOINT}${groupId}${config.url}`;
  config.headers = headers;
  return axios(config).catch((err) => getError(err));
};