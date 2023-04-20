import { makeRequest } from "./makeRequest";

const URL = "/posts";

export const getPostsByUser = () => 
 makeRequest({
    method: "GET",
    url: URL
  })
  
export const mutatePosts = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    method: "PUT",
    ...config,
  });
};
