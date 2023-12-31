import { baseUrl, retries, delay } from "./constants";

interface IFetchOptions {
    signal?: AbortSignal | null;
}

class Api {
    private _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    private _getRes(res: Response): Promise<any> {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    private _fetchWithRetry(url: string, retries: number, delay: number, signal?: AbortSignal): Promise<any> {
        const fetchOptions: IFetchOptions = { signal };

        return fetch(url, fetchOptions)
            .then(res => this._getRes(res))
            .catch((error) => {
                if (error.name === 'AbortError') {
                    return Promise.reject('Fetch aborted');
                }
                if (retries <= 0) {
                    return Promise.reject('Maximum retries reached, could not fetch data');
                }
                return new Promise((res) => setTimeout(res, delay))
                    .then(() => {
                        retries--;
                        return this._fetchWithRetry(url, retries, delay, signal);
                    });
            });
    }

    public getItems(platform: string, sort: string, signal?: AbortSignal): Promise<any> {
        return this._fetchWithRetry(`${this._baseUrl}/getItems?platform=${platform}&sort=${sort}`, retries, delay, signal);
    }

    public getItem(id: string, signal?: AbortSignal): Promise<any> {
        return this._fetchWithRetry(`${this._baseUrl}/getItem?id=${id}`, retries, delay, signal);
    }
}

const api = new Api(baseUrl);

export default api;