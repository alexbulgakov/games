import { baseUrl, options, retries, delay } from "./constants";

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _getRes(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _fetchWithRetry(url, options, retries, delay) {
        return fetch(url, options)
            .then(res => this._getRes(res))
            .catch((error) => {
                if (retries <= 0) {
                    return Promise.reject('Maximum retries reached, could not fetch data');
                }
                return new Promise((res) => setTimeout(res, delay))
                    .then(() => {
                        retries--;
                        return this._fetchWithRetry(url, options, retries, delay);
                    });
            });
    }

    getItems(platform, sort) {
        return this._fetchWithRetry(`${this._baseUrl}/games?platform=${platform}&sort-by=${sort}`, options, retries, delay);
    }

    getItem(id) {
        return this._fetchWithRetry(`${this._baseUrl}/game?id=${id}`, options, retries, delay);
    }
}

const api = new Api(baseUrl);

export default api;