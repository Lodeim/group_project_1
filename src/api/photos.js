import { makeRequest } from "./makeRequest";

const URL = "/posts";

export const getPhotos = (config) => {
  config.url = `${URL}${config.url}`;
 return makeRequest({
    method: "GET",
    ...config,
  })
}

export const mutatePhoto = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    ...config,
  });
};


// export const getComments = (postId) =>
//   makeRequest({
//     method: "GET",
//     url: `${URL}/comments/${postId}`
//   })