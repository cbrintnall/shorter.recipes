import { set, get, del } from 'idb-keyval';
import settings from '../settings';

const historyKey = 'recipeHistory'

const urlInHistory = async(url) => {
    return getHistory()
        .then(history => {
            if(!!history)  {
                return Promise.resolve( !history.map(hist => hist.url).indexOf(url) );
            } else {
                return Promise.reject();
            }
        })
}

const moveResultUrlToFront = async(url) => {
    return getHistory()
        .then(history => {
            const matchedUrl = history.filter(hist => hist.url === url)
            const newResults = history.filter(hist => hist.url !== url)

            if (matchedUrl.length > 0) {
                const newFirst = matchedUrl[0]
                newResults.unshift(newFirst)
                set(historyKey, newResults)
            } else {
                return Promise.reject();
            }
        })
}

export const addHistory = async (url, content) => {
    const historyObj = { url, content }

    get(historyKey)
        .then(result => {
            if (!result) {
                set(historyKey, [historyObj])
            } else {
                const { limit } = settings.history;

                const newResult = result.length >= limit ? [ 
                    historyObj,
                    ...result.slice(0, limit - 1)
                ] : [
                    historyObj,
                    ...result
                ]

                console.log(newResult)

                set(historyKey, newResult)
            }
        })
}

// Takes in a url and its result, if the URL is already in the history
// the result becomes the most recently visited, and nothing else changes.
export const addOrRaiseHistory = async(url, results) => {
    urlInHistory(url)
        .then(wasTrue => {
            if (wasTrue) {
                moveResultUrlToFront(url)
            } else {
                addHistory(url, results)
            }
        })
}

export const getHistory = async() => {
    return get(historyKey);
}

export const clearHistory = async() => {
    return del(historyKey);
}