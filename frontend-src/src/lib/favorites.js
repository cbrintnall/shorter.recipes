/*

    Exposes an API for working with local storage and
    storing / retrieving a user's favorites recipes.

    All this is done locally, and may move to web storage
    eventually.

*/

import { set, get, keys, del } from 'idb-keyval';

export const removeFavorite = async url => {
    return del(url);
}

export const markFavorite = async (url, contents) => {
    return set(url, contents);
}

export const isFavorite = async url => {
    return get(url).then(val => Promise.resolve(!!val));
}

export const getFavoriteContents = async url => {
    return get(url);
}

export const getFavoritedSites = async() => {
    return keys();
}

export const getFavoritedSiteNames = async() => {
    return getFavoritedSites()
        .then(keys => 
            Promise.all(keys.map(key => get(key)))
                .then(contents => Promise.resolve(contents.map(content => content.title)))
        )
}