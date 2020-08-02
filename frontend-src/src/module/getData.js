import constants from '../settings';

export const getUrl = (url) => {
    const local = localStorage.getItem(url);

    if (local) {
        return Promise.resolve(JSON.parse(local));
    }

    return fetch(`${constants.urls.serviceUrl}?url=${url}`)
        .then((r) => r.json())
        .then(r => {
            localStorage.setItem(url, JSON.stringify(r));
            return Promise.resolve(r);
        })
}