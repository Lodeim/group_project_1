import axios from "axios";
import { getError } from "../utils";

const API_ENDPOINT = "https://api.react-learning.ru";
const groupId = "/v2/group-10";

export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${groupId}${config.url}`;

  return axios(config).catch((err) => getError(err));
};
