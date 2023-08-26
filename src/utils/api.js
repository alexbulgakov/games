import { baseUrl } from "./constants";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a104a1395fmsh9398c54207b25bap1e8a0ajsnd3804fc253a8',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    _getRes(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getItems() {
        return fetch(this._baseUrl, options)
            .then(res => this._getRes(res));
    }
}

const api = new Api(baseUrl);

export default api;