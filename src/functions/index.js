import * as functions from 'firebase-functions';
import { getRecipeRoute } from './recipe';
import { ssr } from './ssr';


const corsEnabled = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  next(req, res);
}

exports.main = functions.https.onRequest((req, res) => corsEnabled(req, res, getRecipeRoute));
exports.ssr = functions.https.onRequest((req, res) => corsEnabled(req, res, ssr))