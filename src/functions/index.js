import * as functions from 'firebase-functions';
import { getRecipeRoute } from './recipe';
import { ssr } from './ssr';

exports.main = functions.https.onRequest(getRecipeRoute);
exports.ssr = functions.https.onRequest(ssr)