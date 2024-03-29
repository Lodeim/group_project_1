"https://api.react-learning.ru/v2/";

import Cookies from "js-cookie";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  addPost(body) {
    return fetch(`${this._baseUrl}/group-10/posts`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(onResponce);
  }

  deletePost(postId) {
    return fetch(`${this._baseUrl}/group-10/posts/${postId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponce);
  }
  deleteComment(postId, commentId) {
    return fetch(
      `${this._baseUrl}/group-10/posts/comments/${postId}/${commentId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(onResponce);
  }
}

const config = {
  baseUrl: "https://api.react-learning.ru/v2",
  headers: {
    "content-type": "application/json",
    Authorization: Cookies.get("auth"),
  },
};

const sapi = new Api(config);

export default sapi;
