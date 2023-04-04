"https://api.react-learning.ru/v2/"


const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }
    addPost(body) {
        return fetch(`${this._baseUrl}/group-10/posts`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body)
        }).then(onResponce)

    }

    deletePost(postId) {
        return fetch(`${this._baseUrl}/group-10/posts/${postId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(onResponce)

    }
}

const config = {
    baseUrl: "https://api.react-learning.ru/v2",
    headers: {
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4YTFmYzU5Yjk4YjAzOGY3N2I1MmUiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjgwNjAwMzM4LCJleHAiOjE3MTIxMzYzMzh9.EfdKMaotM6LYxGq2ugR-24MT4wMsONUCz5-60Q08M2g'
    }
}

const api = new Api(config);

export default api;