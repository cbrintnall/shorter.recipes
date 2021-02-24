import { set, get, del } from 'idb-keyval';
import settings from '../settings';

const historyKey = 'recipeHistory'

// TODO: un-any this entire file

const urlInHistory = async(url: string) => {
    return getHistory()
        .then((history: any) => {
            if(!!history)  {
                return Promise.resolve( !history.map((hist: any) => hist.url).indexOf(url) );
            } else {
                return Promise.reject();
            }
        })
}

const moveResultUrlToFront = async(url: string) => {
    return getHistory()
        .then((history: any) => {
            const matchedUrl = history.filter((hist: any) => hist.url === url)
            const newResults = history.filter((hist: any) => hist.url !== url)

            if (matchedUrl.length > 0) {
                const newFirst = matchedUrl[0]
                newResults.unshift(newFirst)
                set(historyKey, newResults)
            } else {
                return Promise.reject();
            }
        })
}

export const addHistory = async (url: string, content: any) => {
    const historyObj = { url, content }

    get(historyKey)
        .then((result: any) => {
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
export const addOrRaiseHistory = async(url: string, results: any) => {
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