import constants from '../settings';
import { Results } from '../components/pages/search';
import { isFavorite, getFavoriteContents } from '../lib/favorites'

type Result = {
    title: string
}

export const getUrl = (url: string) => {
    const local = localStorage.getItem(url);

    if (local) {
        return Promise.resolve(JSON.parse(local));
    }

    return isFavorite(url)
        .then(fav => {
            if (fav) {
                return getFavoriteContents(url)
                    .then(r => Promise.resolve(r))
            } else {
                return fetch(`${constants.urls.serviceUrl}?url=${url}`)
                    .then((r) => r.json())
                    .then(r => {
                        if (r.error) {
                            return Promise.reject("Failed to parse recipe.")
                        }

                        if (r.instructions && r.ingredients && r.title) {
                            localStorage.setItem(url, JSON.stringify(r));
                            return Promise.resolve(r);
                        }
                    })
            }
        })
}