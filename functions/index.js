/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/settings.js":
/*!**********************************!*\
  !*** ./src/frontend/settings.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"firebaseConfig\": () => (/* binding */ firebaseConfig),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar firebaseConfig = {\n  apiKey: \"AIzaSyDHg7FQTmsbMssC2vVW_N4tfZqBZCV5BEA\",\n  authDomain: \"yadev-firebase.firebaseapp.com\",\n  projectId: \"yadev-firebase\",\n  storageBucket: \"yadev-firebase.appspot.com\",\n  messagingSenderId: \"477071358865\",\n  appId: \"1:477071358865:web:f1091e51b6c511542a3830\",\n  measurementId: \"G-4W8ZH9MMZD\"\n};\nvar common = {\n  history: {\n    limit: 5\n  },\n  searchBar: {\n    opacity: {\n      hidden: 30,\n      visible: 100\n    }\n  },\n  colors: {\n    primary: \"#F5F6F7\",\n    secondary: \"#27536E\",\n    tertiary: \"#94BCC0\",\n    textFocused: \"#F1A646\"\n  },\n  // In PX\n  breakpoints: {\n    smaller: 450\n  }\n};\n\nvar development = _objectSpread(_objectSpread({}, common), {}, {\n  urls: {\n    serviceUrl: \"http://localhost:5001/yadev-firebase/us-central1/main\",\n    sampleUrl: \"https://www.allrecipes.com/recipe/6874/best-ever-muffins/\"\n  }\n});\n\nvar production = _objectSpread(_objectSpread({}, common), {}, {\n  urls: {\n    serviceUrl: \"https://us-central1-yadev-firebase.cloudfunctions.net/main\",\n    sampleUrl: \"https://www.allrecipes.com/recipe/6874/best-ever-muffins/\"\n  }\n});\n\nvar settings = {\n  development: development,\n  production: production\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (settings[\"development\"]);\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/settings.js?");

/***/ }),

/***/ "./src/functions/index.js":
/*!********************************!*\
  !*** ./src/functions/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase-functions */ \"firebase-functions\");\n/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_functions__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _recipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipe */ \"./src/functions/recipe.js\");\n/* harmony import */ var _ssr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ssr */ \"./src/functions/ssr.js\");\n\n\n\nexports.main = firebase_functions__WEBPACK_IMPORTED_MODULE_0__.https.onRequest(_recipe__WEBPACK_IMPORTED_MODULE_1__.getRecipeRoute);\nexports.ssr = firebase_functions__WEBPACK_IMPORTED_MODULE_0__.https.onRequest(_ssr__WEBPACK_IMPORTED_MODULE_2__.ssr);\n\n//# sourceURL=webpack://shorter.recipes/./src/functions/index.js?");

/***/ }),

/***/ "./src/functions/recipe.js":
/*!*********************************!*\
  !*** ./src/functions/recipe.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRecipeRoute\": () => (/* binding */ getRecipeRoute)\n/* harmony export */ });\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheerio */ \"cheerio\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cheerio__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-fetch */ \"node-fetch\");\n/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar getRecipeRoute = function getRecipeRoute(req, res) {\n  var url = req.query.url;\n  res.header('Access-Control-Allow-Origin', '*');\n  res.header('Content-Type', 'application/json');\n\n  if (!url) {\n    res.send(JSON.stringify({\n      \"error\": \"No URL to extract.\"\n    }));\n  }\n\n  node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(constructUrl(url)).then(function (r) {\n    return r.text();\n  }).then(getRecipe).then(function (r) {\n    res.send(JSON.stringify(formatResponse(r)));\n  }).catch(function (err) {\n    console.error(err);\n    res.status(500);\n    res.send(JSON.stringify({\n      \"error\": err\n    }));\n  });\n};\n\nvar getRecipe = function getRecipe(body) {\n  var $ = cheerio__WEBPACK_IMPORTED_MODULE_0___default().load(body);\n  var payload = $('script[type=\"application/ld+json\"]'); // TODO: Handle this case\n\n  if (payload.length > 1) {\n    return Promise.reject('Found more than one result for payload.');\n  }\n\n  var json = payload.html().trim();\n\n  if (json[json.length - 1] !== \"}\" && json[json.length - 1] !== \"]\") {\n    if (json[json.length - 2] === \"}\") {\n      json = String(json).substring(0, json.length - 1);\n    } else {\n      return Promise.reject('Unable to parse recipe');\n    }\n  }\n\n  var tree = JSON.parse(json);\n\n  if (Object.keys(tree).includes(\"@type\") && tree[\"@type\"] === \"Recipe\") {\n    return Promise.resolve(tree);\n  }\n\n  if (Object.keys(tree).includes(\"@graph\")) {\n    tree = tree[\"@graph\"];\n  }\n\n  var asJson = Array.from(tree).filter(function (item) {\n    return Object.keys(item).includes('@type');\n  }).filter(function (item) {\n    return item['@type'] === \"Recipe\";\n  });\n\n  if (asJson.length > 0) {\n    return Promise.resolve(asJson[0]);\n  } else {\n    return Promise.reject('Unable to grab recipe');\n  }\n};\n\nvar formatResponse = function formatResponse(ld) {\n  var instructions = ld.recipeInstructions;\n\n  if (Array.isArray(instructions)) {\n    var instructionTypes = ld.recipeInstructions.filter(function (instruction) {\n      return instruction.itemListElement && Array.isArray(instruction.itemListElement);\n    }); // If all the instructions are of type 'HowToSection'...\n\n    if (instructionTypes.length === ld.recipeInstructions.length) {\n      instructions = ld.recipeInstructions.map(function (instruction) {\n        return instruction.itemListElement.flat();\n      }).flat();\n    }\n  } else if (typeof instructions === 'string') {\n    instructions = instructions.split('. ').filter(function (instruction) {\n      return !!instruction;\n    }).map(function (instruction) {\n      return {\n        text: instruction.trim()\n      };\n    });\n  }\n\n  return {\n    title: ld.name,\n    instructions: instructions,\n    ingredients: ld.recipeIngredient\n  };\n};\n\nvar constructUrl = function constructUrl(url) {\n  if (url.startsWith('http://') || url.startsWith('https://')) {\n    return url;\n  } else {\n    return \"https://\".concat(url);\n  }\n};\n\n//# sourceURL=webpack://shorter.recipes/./src/functions/recipe.js?");

/***/ }),

/***/ "./src/functions/settings.js":
/*!***********************************!*\
  !*** ./src/functions/settings.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar common = {};\nvar dev = {\n  hostBase: \"http://localhost:5000\"\n};\nvar prod = {};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_objectSpread(_objectSpread({}, common),  false ? 0 : dev));\n\n//# sourceURL=webpack://shorter.recipes/./src/functions/settings.js?");

/***/ }),

/***/ "./src/functions/ssr.js":
/*!******************************!*\
  !*** ./src/functions/ssr.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ssr\": () => (/* binding */ ssr)\n/* harmony export */ });\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! handlebars */ \"handlebars\");\n/* harmony import */ var handlebars__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(handlebars__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _frontend_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../frontend/App */ \"./src/frontend/App.tsx\");\n/* harmony import */ var _frontend_App__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_frontend_App__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings */ \"./src/functions/settings.js\");\n\n // TODO: Isolate frontend into its own package\n\n\n // TODO: CSS, favicon\n\nvar indexHTML = \"\\n<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n  <head>\\n    <meta charset=\\\"utf-8\\\" />\\n    <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1\\\" />\\n    <meta name=\\\"theme-color\\\" content=\\\"#303030\\\" />\\n    <meta\\n      name=\\\"description\\\"\\n      content=\\\"A simple application that can extract recipe information and display it in a straight-forward manner.\\\"\\n    />\\n    <link\\n      href=\\\"https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap\\\"\\n      rel=\\\"stylesheet\\\"\\n    />\\n    <link\\n      rel=\\\"stylesheet\\\"\\n      href=\\\"https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css\\\"\\n      integrity=\\\"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk\\\"\\n      crossorigin=\\\"anonymous\\\"\\n    />\\n    <script defer=\\\"defer\\\" src=\\\"{{asset}}\\\"></script>\\n    <title>Shorter Recipes</title>\\n  </head>\\n  <body>\\n    <noscript>\\n      You'll need Javascript enabled, we hope to have a \\\"minimal\\\" JS version soon.\\n    </noscript>\\n    <div id=\\\"root\\\">{{content}}</div>\\n  </body>\\n</html>\\n\";\nvar ssr = function ssr(req, res) {\n  res.header('Access-Control-Allow-Origin', '*');\n  var application = react_dom_server__WEBPACK_IMPORTED_MODULE_1___default().renderToString((_frontend_App__WEBPACK_IMPORTED_MODULE_2___default()));\n  var template = (0,handlebars__WEBPACK_IMPORTED_MODULE_0__.compile)(indexHTML);\n  var payload = {\n    asset: 'http://localhost:9090/default-bucket/client.9ced0ac2abf2d8f8723f.js',\n    content: application\n  };\n  res.send(template(payload));\n};\n\n//# sourceURL=webpack://shorter.recipes/./src/functions/ssr.js?");

/***/ }),

/***/ "./src/frontend/App.tsx":
/*!******************************!*\
  !*** ./src/frontend/App.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\r\nvar about_1 = __importDefault(__webpack_require__(/*! ./components/pages/about */ \"./src/frontend/components/pages/about.tsx\"));\r\nvar search_1 = __importDefault(__webpack_require__(/*! ./components/pages/search */ \"./src/frontend/components/pages/search.tsx\"));\r\nvar auth_1 = __webpack_require__(/*! ./lib/auth */ \"./src/frontend/lib/auth.ts\");\r\nvar firebase = __importStar(__webpack_require__(/*! firebase */ \"firebase\"));\r\nfunction App() {\r\n    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];\r\n    react_1.useEffect(function () {\r\n        firebase.auth().onAuthStateChanged(function (state) {\r\n            setUser(state);\r\n        });\r\n    });\r\n    return (react_1.default.createElement(react_1.default.Fragment, null,\r\n        react_1.default.createElement(auth_1.UserContext.Provider, { value: user },\r\n            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,\r\n                react_1.default.createElement(react_router_dom_1.Switch, null,\r\n                    react_1.default.createElement(react_router_dom_1.Route, { path: \"/search\", component: search_1.default }),\r\n                    react_1.default.createElement(react_router_dom_1.Route, { path: \"/about\", component: about_1.default }),\r\n                    react_1.default.createElement(react_router_dom_1.Redirect, { to: \"/search\" }))))));\r\n}\r\nexports.default = App;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/App.tsx?");

/***/ }),

/***/ "./src/frontend/components/login-button.tsx":
/*!**************************************************!*\
  !*** ./src/frontend/components/login-button.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.SignInButtons = void 0;\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar firebase = __importStar(__webpack_require__(/*! firebase */ \"firebase\"));\r\nvar ai_1 = __webpack_require__(/*! react-icons/ai */ \"react-icons/ai\");\r\nvar facebookProvider = new firebase.auth.FacebookAuthProvider();\r\nvar twitterProvider = new firebase.auth.TwitterAuthProvider();\r\nvar googleProvider = new firebase.auth.GoogleAuthProvider();\r\nvar SignInIconButton = function (props) {\r\n    var _a = react_1.useState(false), hovered = _a[0], setHovered = _a[1];\r\n    var Icon = hovered\r\n        ? props.hoverIcon\r\n        : props.icon;\r\n    return (react_1.default.createElement(\"div\", { className: \"signin-button\", style: { display: 'inline', padding: '4px' }, onMouseEnter: function () { return setHovered(true); }, onMouseLeave: function () { return setHovered(false); }, onClick: function () { return firebase.auth().signInWithRedirect(props.provider); } },\r\n        react_1.default.createElement(Icon, { size: 30 })));\r\n};\r\nvar SignInButtons = function () {\r\n    return (react_1.default.createElement(\"div\", null,\r\n        react_1.default.createElement(\"span\", null, \"Sign in | \"),\r\n        react_1.default.createElement(SignInIconButton, { icon: ai_1.AiOutlineTwitter, hoverIcon: ai_1.AiFillTwitterSquare, provider: twitterProvider }),\r\n        react_1.default.createElement(\"span\", { style: { float: 'right' } }, \" (More sign-in methods coming soon) \")));\r\n};\r\nexports.SignInButtons = SignInButtons;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/components/login-button.tsx?");

/***/ }),

/***/ "./src/frontend/components/pages/about.tsx":
/*!*************************************************!*\
  !*** ./src/frontend/components/pages/about.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nvar react_bootstrap_1 = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\r\nvar ai_1 = __webpack_require__(/*! react-icons/ai */ \"react-icons/ai\");\r\nfunction AboutPage(props) {\r\n    return (react_1.default.createElement(react_bootstrap_1.Container, { className: \"landing-page-body landing-page-container\" },\r\n        react_1.default.createElement(react_bootstrap_1.Row, { className: \"landing-page-container\" },\r\n            react_1.default.createElement(react_bootstrap_1.Col, { className: \"d-flex align-items-center\" },\r\n                react_1.default.createElement(\"div\", null,\r\n                    react_1.default.createElement(\"h1\", null, \" Oh, wow hi! \"),\r\n                    react_1.default.createElement(\"hr\", null),\r\n                    react_1.default.createElement(\"p\", null,\r\n                        \"Thanks for checking out this section, means a lot. The idea for the site came when I was getting into cooking. Since I didn't really know what I was doing, that meant I was looking up \",\r\n                        react_1.default.createElement(\"em\", null, \"plenty\"),\r\n                        \" of recipes. I grew frustrated when literally recipe website I'd come across had a chapter of a book attached to it, and sometimes the recipe wasn't really presented in an easy to read manner. Finally; I got so frustrated and created \",\r\n                        react_1.default.createElement(\"a\", { href: window.location.origin }, \"this website\"),\r\n                        \".\"),\r\n                    react_1.default.createElement(\"p\", null, \"I'm always looking for ways to improve the site and am welcoming of any feedback. I just hope that if it's critical it's also constructive. If you have any ideas please checkout the previous page (you can go back below), theres a place to report bugs & suggest features.\"),\r\n                    react_1.default.createElement(\"p\", null, \" Thanks for swinging by! \"),\r\n                    react_1.default.createElement(\"p\", null, \" - Christian \"),\r\n                    react_1.default.createElement(\"hr\", null),\r\n                    react_1.default.createElement(\"div\", { className: \"back-button\", onClick: function (_) { return props.history.push(\"/search\"); } },\r\n                        react_1.default.createElement(ai_1.AiOutlineLeftSquare, { className: \"back-icon\", size: 32 }),\r\n                        react_1.default.createElement(\"span\", null, \"  go back\")))))));\r\n}\r\nexports.default = AboutPage;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/components/pages/about.tsx?");

/***/ }),

/***/ "./src/frontend/components/pages/landing.tsx":
/*!***************************************************!*\
  !*** ./src/frontend/components/pages/landing.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar react_bootstrap_1 = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\r\nvar constants_1 = __webpack_require__(/*! ../../lib/constants */ \"./src/frontend/lib/constants.ts\");\r\nvar history_1 = __webpack_require__(/*! ../../lib/history */ \"./src/frontend/lib/history.ts\");\r\nvar Button_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Button */ \"react-bootstrap/Button\"));\r\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\r\nvar login_button_1 = __webpack_require__(/*! ../login-button */ \"./src/frontend/components/login-button.tsx\");\r\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\r\nvar auth_1 = __webpack_require__(/*! ../../lib/auth */ \"./src/frontend/lib/auth.ts\");\r\nvar firebase = __importStar(__webpack_require__(/*! firebase */ \"firebase\"));\r\nvar adjustHistorySizeBreakpoint = 425;\r\nvar truncateLength = 25;\r\nfunction LoggedInHeader() {\r\n    return (react_1.default.createElement(\"div\", { className: \"d-flex align-items-center\" },\r\n        react_1.default.createElement(\"div\", { className: \"ml-auto\" },\r\n            react_1.default.createElement(Button_1.default, { className: \"login-button\", onClick: function () { return firebase.auth().signOut(); } }, \"Sign out\"))));\r\n}\r\nfunction LandingPage() {\r\n    var history = react_router_dom_1.useHistory();\r\n    var _a = react_1.useState([]), userHistory = _a[0], setUserHistory = _a[1];\r\n    var _b = react_1.useState(false), smallMobile = _b[0], setSmallMobile = _b[1];\r\n    react_1.useEffect(function () {\r\n        window.onresize = function () {\r\n            return setSmallMobile(window.outerWidth < adjustHistorySizeBreakpoint);\r\n        };\r\n        history_1.getHistory().then(function (val) {\r\n            var potentialHistory = val;\r\n            if (potentialHistory) {\r\n                setUserHistory(potentialHistory);\r\n            }\r\n        });\r\n        window.dispatchEvent(new Event(\"resize\"));\r\n    }, []);\r\n    return (react_1.default.createElement(react_bootstrap_1.Container, { className: \"landing-page-body landing-page-container\" },\r\n        react_1.default.createElement(react_bootstrap_1.Row, { className: \"landing-page-container\" },\r\n            react_1.default.createElement(react_bootstrap_1.Col, { className: smallMobile\r\n                    ? \"d-flex align-items-center flex-column\"\r\n                    : \"d-flex align-items-center\" },\r\n                react_1.default.createElement(\"div\", { className: \"shadow p-3 \" + (smallMobile ? \"m-2\" : \"\") },\r\n                    react_1.default.createElement(auth_1.UserContext.Consumer, null, function (value) {\r\n                        if (!value) {\r\n                            return react_1.default.createElement(login_button_1.SignInButtons, null);\r\n                        }\r\n                        else {\r\n                            return react_1.default.createElement(LoggedInHeader, null);\r\n                        }\r\n                    }),\r\n                    react_1.default.createElement(\"hr\", null),\r\n                    react_1.default.createElement(\"h1\", null,\r\n                        react_1.default.createElement(auth_1.UserContext.Consumer, null, function (value) {\r\n                            var _a, _b;\r\n                            return (react_1.default.createElement(\"div\", null,\r\n                                \" \",\r\n                                \"Hello\", (_b = ((value === null || value === void 0 ? void 0 : value.displayName) && ', ' + ((_a = value === null || value === void 0 ? void 0 : value.displayName) === null || _a === void 0 ? void 0 : _a.split(' ')[0]))) !== null && _b !== void 0 ? _b : \"\",\r\n                                \" \",\r\n                                react_1.default.createElement(\"span\", { role: \"img\", \"aria-label\": \"waving hand emoji\" }, \"\\uD83D\\uDC4B\"),\r\n                                \" \"));\r\n                        })),\r\n                    react_1.default.createElement(\"p\", null,\r\n                        \" \",\r\n                        \"Thanks for using \\\"\",\r\n                        react_1.default.createElement(\"b\", null, \"shorter.recipes\"),\r\n                        \"\\\"\",\r\n                        \" \"),\r\n                    react_1.default.createElement(\"p\", null,\r\n                        \" \",\r\n                        \"Please use the search bar below to enter a url, simplify the recipe, and get cookin.\"),\r\n                    react_1.default.createElement(\"hr\", null),\r\n                    react_1.default.createElement(\"div\", null, constants_1.landingUrls.map(function (url, i) {\r\n                        return (react_1.default.createElement(\"span\", { key: url.url },\r\n                            react_1.default.createElement(\"a\", { rel: \"noopener noreferrer\", target: \"_blank\", href: url.url }, url.title),\r\n                            // This is to ensure we don't put a bar at the very end of the list.\r\n                            i !== constants_1.landingUrls.length - 1 && react_1.default.createElement(\"span\", null, \" | \")));\r\n                    }))),\r\n                userHistory && userHistory.length > 0 && (react_1.default.createElement(\"div\", { className: \"shadow p-3 d-flex justify-content-start align-items-center flex-column m-3\" },\r\n                    react_1.default.createElement(\"div\", null, \"History:\"),\r\n                    react_1.default.createElement(\"hr\", { style: { width: \"100%\" }, className: smallMobile ? \"m-2\" : undefined }),\r\n                    react_1.default.createElement(\"div\", { className: smallMobile ? \"d-flex flex-column\" : undefined }, userHistory.map(function (hist, i) { return (react_1.default.createElement(\"div\", { key: i, className: \"history-icon-parent\", onClick: function (_) { return history.push(\"/search?url=\" + hist.url); } },\r\n                        react_1.default.createElement(\"span\", null,\r\n                            \" \",\r\n                            i + 1,\r\n                            \". \"),\r\n                        react_1.default.createElement(\"span\", { className: \"history-icon\" }, lodash_1.default.truncate(\"\" + hist.content.title, {\r\n                            length: truncateLength,\r\n                        })))); })),\r\n                    react_1.default.createElement(\"div\", { className: smallMobile ? \"d-none\" : undefined },\r\n                        react_1.default.createElement(\"hr\", { style: { width: \"100%\" } }),\r\n                        react_1.default.createElement(\"div\", null,\r\n                            react_1.default.createElement(Button_1.default, { className: \"recipe-button\", onClick: function (_) {\r\n                                    return history_1.clearHistory().then(function (_) { return setUserHistory([]); });\r\n                                } }, \"Clear\")))))))));\r\n}\r\nexports.default = LandingPage;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/components/pages/landing.tsx?");

/***/ }),

/***/ "./src/frontend/components/pages/results.tsx":
/*!***************************************************!*\
  !*** ./src/frontend/components/pages/results.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar react_swipeable_1 = __webpack_require__(/*! react-swipeable */ \"react-swipeable\");\r\nvar Container_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Container */ \"react-bootstrap/Container\"));\r\nvar Row_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Row */ \"react-bootstrap/Row\"));\r\nvar Col_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Col */ \"react-bootstrap/Col\"));\r\nvar ListGroup_1 = __importDefault(__webpack_require__(/*! react-bootstrap/ListGroup */ \"react-bootstrap/ListGroup\"));\r\nvar Tabs_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Tabs */ \"react-bootstrap/Tabs\"));\r\nvar Tab_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Tab */ \"react-bootstrap/Tab\"));\r\nvar ai_1 = __webpack_require__(/*! react-icons/ai */ \"react-icons/ai\");\r\nvar stateManager_1 = __importDefault(__webpack_require__(/*! ../../lib/stateManager */ \"./src/frontend/lib/stateManager.ts\"));\r\nvar constants_1 = __webpack_require__(/*! ../../lib/constants */ \"./src/frontend/lib/constants.ts\");\r\nvar stateManager = stateManager_1.default.getInstance();\r\nfunction ChecklistItem(props) {\r\n    var _a = react_1.useState(false), disabled = _a[0], setDisabled = _a[1];\r\n    return (react_1.default.createElement(ListGroup_1.default.Item, { className: disabled ? \"result-item checked\" : \"result-item\" },\r\n        react_1.default.createElement(Row_1.default, null,\r\n            react_1.default.createElement(Col_1.default, { className: \"d-flex justify-content-start align-items-center\", lg: 10, md: 10, sm: 10, xs: 10 },\r\n                react_1.default.createElement(\"span\", { className: \"recipe-text\" }, disabled ? react_1.default.createElement(\"s\", null,\r\n                    \" \",\r\n                    props.content,\r\n                    \" \") : props.content)),\r\n            react_1.default.createElement(Col_1.default, { className: \"d-flex justify-content-end align-items-center\" },\r\n                react_1.default.createElement(\"div\", { className: \"search-icon-parent result-icon-parent\", onClick: function (_) { return setDisabled(!disabled); } }, disabled ? react_1.default.createElement(ai_1.AiOutlineClose, { size: 24 }) : react_1.default.createElement(ai_1.AiOutlineCheck, { size: 24 }))))));\r\n}\r\nfunction IngredientsList(props) {\r\n    return (react_1.default.createElement(ListGroup_1.default, { variant: \"flush\" }, props.ingredients.map(function (ingredient) {\r\n        return (react_1.default.createElement(ChecklistItem, { content: ingredient, key: ingredient }));\r\n    })));\r\n}\r\nfunction InstructionsList(props) {\r\n    return (react_1.default.createElement(ListGroup_1.default, { variant: \"flush\" }, props.instructions.map(function (instruction) {\r\n        return (react_1.default.createElement(ChecklistItem, { content: instruction.text, key: instruction.text }));\r\n    })));\r\n}\r\nfunction MobileLayout(data) {\r\n    var swipeVelocityThreshold = .4;\r\n    var _a = react_1.useState(\"ingredients\"), activeTab = _a[0], setActiveTab = _a[1];\r\n    var handlers = react_swipeable_1.useSwipeable({\r\n        onSwipedRight: function (data) {\r\n            if (data.velocity >= swipeVelocityThreshold) {\r\n                setActiveTab(activeTab === \"ingredients\" ? \"instructions\" : \"ingredients\");\r\n            }\r\n        },\r\n        onSwipedLeft: function (data) {\r\n            if (data.velocity >= swipeVelocityThreshold) {\r\n                setActiveTab(activeTab === \"ingredients\" ? \"instructions\" : \"ingredients\");\r\n            }\r\n        }\r\n    });\r\n    var listRef = react_1.useRef(null);\r\n    react_1.useEffect(function () {\r\n        window.onscroll = function () {\r\n            stateManager.push(constants_1.events.dimSearchBar, {\r\n                atBottom: (window.innerHeight + window.scrollY) >= document.body.scrollHeight,\r\n                percentage: (window.innerHeight + window.scrollY) / document.body.scrollHeight\r\n            });\r\n        };\r\n    }, []);\r\n    return (react_1.default.createElement(Row_1.default, __assign({ className: \"mobile-results-page\" }, handlers),\r\n        react_1.default.createElement(Col_1.default, { ref: listRef, style: { padding: \"0px\" } },\r\n            react_1.default.createElement(Tabs_1.default, { activeKey: activeTab, onSelect: setActiveTab },\r\n                react_1.default.createElement(Tab_1.default, { eventKey: \"ingredients\", title: \"Ingredients\", tabClassName: \"mobile-tab\" },\r\n                    react_1.default.createElement(Row_1.default, { className: \"mobile-result\" }, data.ingredients &&\r\n                        react_1.default.createElement(IngredientsList, { ingredients: data.ingredients }))),\r\n                react_1.default.createElement(Tab_1.default, { eventKey: \"instructions\", title: \"Instructions\", tabClassName: \"mobile-tab\" },\r\n                    react_1.default.createElement(Row_1.default, { className: \"mobile-result\" }, data.instructions &&\r\n                        react_1.default.createElement(InstructionsList, { instructions: data.instructions })))))));\r\n}\r\nfunction DesktopLayout(data) {\r\n    return (react_1.default.createElement(Row_1.default, { className: \"desktop-results-page\" },\r\n        data.ingredients &&\r\n            react_1.default.createElement(Col_1.default, { className: \"important\", style: { marginTop: \"20px\" } },\r\n                react_1.default.createElement(\"h2\", null, \" Ingredients: \"),\r\n                react_1.default.createElement(IngredientsList, { ingredients: data.ingredients })),\r\n        data.instructions &&\r\n            react_1.default.createElement(Col_1.default, { className: \"important\", style: { marginTop: \"20px\" } },\r\n                react_1.default.createElement(\"h2\", null, \" Instructions: \"),\r\n                react_1.default.createElement(InstructionsList, { instructions: data.instructions })),\r\n        Object.keys(data).length === 0 &&\r\n            react_1.default.createElement(Col_1.default, { style: { textAlign: \"center\" } },\r\n                react_1.default.createElement(\"h2\", null, \" Fetching your recipe.. \"))));\r\n}\r\n// TODO add back in props ResultsProps\r\nfunction ResultsPage(props) {\r\n    var data = props.data;\r\n    return (react_1.default.createElement(Container_1.default, { fluid: true, style: { margin: \"0px\" } },\r\n        MobileLayout(data),\r\n        DesktopLayout(data)));\r\n}\r\nexports.default = ResultsPage;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/components/pages/results.tsx?");

/***/ }),

/***/ "./src/frontend/components/pages/search.tsx":
/*!**************************************************!*\
  !*** ./src/frontend/components/pages/search.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\r\n}) : (function(o, m, k, k2) {\r\n    if (k2 === undefined) k2 = k;\r\n    o[k2] = m[k];\r\n}));\r\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\r\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\r\n}) : function(o, v) {\r\n    o[\"default\"] = v;\r\n});\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\r\n    __setModuleDefault(result, mod);\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"react\"));\r\nvar Container_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Container */ \"react-bootstrap/Container\"));\r\nvar Row_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Row */ \"react-bootstrap/Row\"));\r\nvar Col_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Col */ \"react-bootstrap/Col\"));\r\nvar InputGroup_1 = __importDefault(__webpack_require__(/*! react-bootstrap/InputGroup */ \"react-bootstrap/InputGroup\"));\r\nvar FormControl_1 = __importDefault(__webpack_require__(/*! react-bootstrap/FormControl */ \"react-bootstrap/FormControl\"));\r\nvar Button_1 = __importDefault(__webpack_require__(/*! react-bootstrap/Button */ \"react-bootstrap/Button\"));\r\nvar query_string_1 = __webpack_require__(/*! query-string */ \"query-string\");\r\nvar ai_1 = __webpack_require__(/*! react-icons/ai */ \"react-icons/ai\");\r\nvar getData_1 = __webpack_require__(/*! ../../module/getData */ \"./src/frontend/module/getData.ts\");\r\nvar results_1 = __importDefault(__webpack_require__(/*! ./results */ \"./src/frontend/components/pages/results.tsx\"));\r\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\r\nvar stateManager_1 = __importDefault(__webpack_require__(/*! ../../lib/stateManager */ \"./src/frontend/lib/stateManager.ts\"));\r\nvar constants_1 = __webpack_require__(/*! ../../lib/constants */ \"./src/frontend/lib/constants.ts\");\r\nvar landing_1 = __importDefault(__webpack_require__(/*! ./landing */ \"./src/frontend/components/pages/landing.tsx\"));\r\nvar firebase = __importStar(__webpack_require__(/*! firebase/app */ \"firebase/app\"));\r\nvar settings_1 = __importDefault(__webpack_require__(/*! ../../settings */ \"./src/frontend/settings.js\"));\r\nvar favorites_1 = __webpack_require__(/*! ../../lib/favorites */ \"./src/frontend/lib/favorites.ts\");\r\nvar history_1 = __webpack_require__(/*! ../../lib/history */ \"./src/frontend/lib/history.ts\");\r\nvar mainComponentStyle = { height: \"100%\", width: \"100%\" };\r\nvar toggleSearchBarState = function () {\r\n    var buttonVariable = \"--search-bar-animation\";\r\n    var barVariable = \"--search-bar-animation-state\";\r\n    var base = document.documentElement.style;\r\n    var currentButtonState = base.getPropertyValue(buttonVariable);\r\n    var currentBarState = base.getPropertyValue(barVariable);\r\n    base.setProperty(buttonVariable, currentButtonState === \"searchClosed\" ? \"searchOpen\" : \"searchClosed\");\r\n    base.setProperty(barVariable, currentBarState === \"searchBarOpen\" ? \"searchBarClosed\" : \"searchBarOpen\");\r\n};\r\nfunction SearchBar(props) {\r\n    // Dimmed is used to make sure covered up ingredients / instructions are still visible\r\n    var _a = react_1.useState(100), searchBarOpacity = _a[0], setSearchBarOpacity = _a[1];\r\n    var _b = react_1.useState(props.url || \"\"), url = _b[0], setUrl = _b[1];\r\n    var _c = react_1.useState(false), resultIsFavorited = _c[0], setResultIsFavorited = _c[1];\r\n    var history = react_router_dom_1.useHistory();\r\n    var searchEntryRef = react_1.useRef(null);\r\n    var hasValidResult = function () { return !!(props.results && props.results.title); };\r\n    react_1.useEffect(function () {\r\n        if (url) {\r\n            favorites_1.isFavorite(url)\r\n                .then(setResultIsFavorited);\r\n        }\r\n    }, [url]);\r\n    react_1.useEffect(function () {\r\n        toggleSearchBarState();\r\n        stateManager_1.default\r\n            .getInstance()\r\n            .subscribe(constants_1.events.dimSearchBar, function (payload) {\r\n            var _a = settings_1.default.searchBar.opacity, hidden = _a.hidden, visible = _a.visible;\r\n            setSearchBarOpacity(payload.percentage >= .9 ? hidden : visible);\r\n        });\r\n    }, []);\r\n    return (react_1.default.createElement(Container_1.default, { fluid: true, className: \"search-bar\", style: { opacity: searchBarOpacity + \"%\", display: searchBarOpacity === 0 ? \"none\" : \"inherit\" } },\r\n        react_1.default.createElement(Row_1.default, { className: \"search-icons\", noGutters: true, style: { marginBottom: \"10px\" } },\r\n            react_1.default.createElement(Col_1.default, null,\r\n                react_1.default.createElement(\"div\", { className: \"search-icon-parent\", style: { display: \"inline-block\" } },\r\n                    react_1.default.createElement(ai_1.AiOutlineDown, { className: \"search-icon search-icon-toggle\", size: 24, onClick: function (_) { return toggleSearchBarState(); } })),\r\n                react_1.default.createElement(\"div\", { className: \"search-icon-parent\", style: { display: \"inline-block\" } }, searchBarOpacity < 100 ?\r\n                    react_1.default.createElement(ai_1.AiOutlineEye, { className: \"search-icon\", size: 24, onClick: function (_) { return setSearchBarOpacity(settings_1.default.searchBar.opacity.visible); } })\r\n                    :\r\n                        react_1.default.createElement(ai_1.AiOutlineEyeInvisible, { className: \"search-icon\", size: 24, onClick: function (_) { return setSearchBarOpacity(settings_1.default.searchBar.opacity.hidden); } })),\r\n                hasValidResult() &&\r\n                    react_1.default.createElement(\"div\", { className: \"search-icon-parent\", style: { display: \"inline-block\" } }, resultIsFavorited ?\r\n                        react_1.default.createElement(ai_1.AiFillHeart, { className: \"search-icon\", size: 24, onClick: function (_) {\r\n                                return favorites_1.removeFavorite(props.url)\r\n                                    .then(function (_) { return setResultIsFavorited(false); });\r\n                            } })\r\n                        :\r\n                            react_1.default.createElement(ai_1.AiOutlineHeart, { className: \"search-icon\", size: 24, onClick: function (_) {\r\n                                    return favorites_1.markFavorite(props.url, props.results)\r\n                                        .then(function (_) { return setResultIsFavorited(true); });\r\n                                } })),\r\n                react_1.default.createElement(\"div\", { className: \"search-icon-parent disabled-icon\", style: { display: \"inline-block\" } },\r\n                    react_1.default.createElement(ai_1.AiOutlineExperiment, { className: \"search-icon\", size: 24 })),\r\n                hasValidResult() ?\r\n                    react_1.default.createElement(\"div\", { className: \"search-icon-divider\", style: { display: \"inline-block\", float: \"right\" } },\r\n                        react_1.default.createElement(\"a\", { target: \"_blank\", rel: \"noopener noreferrer\", className: \"search-bar-info\", href: props.url, style: { color: \"#55DDE0\" } },\r\n                            react_1.default.createElement(\"span\", { role: \"img\", \"aria-label\": \"chain emoji\", \"aria-describedby\": \"chain emoji representing nearby link text\" }, \"\\uD83D\\uDD17\"),\r\n                            props.results.title),\r\n                        react_1.default.createElement(\"div\", { className: \"search-icon-parent\", style: { display: \"inline-block\" } },\r\n                            react_1.default.createElement(ai_1.AiOutlineClose, { className: \"search-icon\", size: 24, onClick: function (_) { return history.push(\"/search\"); } })))\r\n                    :\r\n                        react_1.default.createElement(\"div\", { className: \"search-icon-divider\", style: { display: \"inline-block\", float: \"right\" } },\r\n                            props.searching && react_1.default.createElement(\"span\", { style: { color: \"white\" } }, \" Searching... \"),\r\n                            props.searchError && react_1.default.createElement(\"span\", { style: { color: \"#cc0000\" } }, \" Error while searching! \")))),\r\n        react_1.default.createElement(Row_1.default, { className: \"search-entry\", ref: searchEntryRef },\r\n            react_1.default.createElement(InputGroup_1.default, { className: \"search-entry-group\" },\r\n                react_1.default.createElement(FormControl_1.default, { style: { transform: \"translateY(-1px)\" }, className: \"search-entry-input\", placeholder: \"Paste a URL..\", \"aria-label\": \"URL search\", value: url, onInput: function (e) { return setUrl(e.currentTarget.innerText); }, onChange: function (e) { return setUrl(e.target.value); } }),\r\n                react_1.default.createElement(Button_1.default, { style: { borderTopLeftRadius: \"0px\", borderBottomLeftRadius: \"0px\", zIndex: 3 }, as: InputGroup_1.default.Append, variant: \"secondary\", onClick: function () {\r\n                        if (url) {\r\n                            // TODO: this should stay open if there is an error, not disappear.\r\n                            toggleSearchBarState();\r\n                            history.push(\"/search?url=\" + url);\r\n                        }\r\n                    } }, \"Go!\")))));\r\n}\r\nfunction SearchPage(props) {\r\n    var _a = react_1.useState(\"\"), searchError = _a[0], setSearchError = _a[1];\r\n    var _b = react_1.useState(false), searching = _b[0], setSearching = _b[1];\r\n    var _c = react_1.useState({}), results = _c[0], setResults = _c[1];\r\n    var search = props.history.location.search;\r\n    var url = query_string_1.parse(search).url;\r\n    react_1.useEffect(function () {\r\n        var correctedUrl = url;\r\n        if (correctedUrl) {\r\n            // Set searching to true again\r\n            setSearching(true);\r\n            // Reset any search errors\r\n            setSearchError(\"\");\r\n            getData_1.getUrl(correctedUrl)\r\n                .then(function (results) {\r\n                firebase.analytics().logEvent('search', { search_term: url });\r\n                history_1.addHistory(url, results); // TODO: handle ' as string '\r\n                setResults(results);\r\n            })\r\n                .catch(function (err) {\r\n                setSearchError(err);\r\n            })\r\n                .finally(function () {\r\n                setSearching(false);\r\n            });\r\n        }\r\n        else {\r\n            setResults({});\r\n        }\r\n    }, [url]);\r\n    return (react_1.default.createElement(Container_1.default, { fluid: true, style: __assign(__assign({}, mainComponentStyle), { padding: \"0px\" }) },\r\n        react_1.default.createElement(SearchBar, { results: results, url: url, searching: searching, searchError: searchError }),\r\n        Object.keys(results).length > 0 ?\r\n            react_1.default.createElement(results_1.default, { data: results }) :\r\n            react_1.default.createElement(landing_1.default, null)));\r\n}\r\nexports.default = SearchPage;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/components/pages/search.tsx?");

/***/ }),

/***/ "./src/frontend/lib/auth.ts":
/*!**********************************!*\
  !*** ./src/frontend/lib/auth.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.UserContext = void 0;\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"react\"));\r\nexports.UserContext = react_1.default.createContext(null);\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/lib/auth.ts?");

/***/ }),

/***/ "./src/frontend/lib/constants.ts":
/*!***************************************!*\
  !*** ./src/frontend/lib/constants.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.landingUrls = exports.events = void 0;\r\nexports.events = {\r\n    dimSearchBar: \"dimSearchBar\",\r\n    favoriteResults: \"favoriteResults\",\r\n    unfavoriteResults: \"unfavoriteResults\"\r\n};\r\nexports.landingUrls = [\r\n    {\r\n        title: \"about\",\r\n        url: \"/about\",\r\n        internal: true\r\n    },\r\n    {\r\n        title: \"donate\",\r\n        url: \"https://ko-fi.com/cbrintnall\",\r\n        internal: false\r\n    },\r\n    {\r\n        title: \"suggest a feature\",\r\n        url: \"https://forms.gle/NP6AisSEEkG53bxj8\",\r\n        internal: false\r\n    },\r\n    {\r\n        title: \"report a bug\",\r\n        url: \"https://github.com/cbrintnall/shorter.recipes/issues\",\r\n        internal: false\r\n    }\r\n];\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/lib/constants.ts?");

/***/ }),

/***/ "./src/frontend/lib/favorites.ts":
/*!***************************************!*\
  !*** ./src/frontend/lib/favorites.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\n/*\r\n\r\n    Exposes an API for working with local storage and\r\n    storing / retrieving a user's favorites recipes.\r\n\r\n    All this is done locally, and may move to web storage\r\n    eventually.\r\n\r\n*/\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getFavoritedSiteNames = exports.getFavoritedSites = exports.getFavoriteContents = exports.isFavorite = exports.markFavorite = exports.removeFavorite = void 0;\r\nvar idb_keyval_1 = __webpack_require__(/*! idb-keyval */ \"idb-keyval\");\r\nvar removeFavorite = function (url) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.del(url)];\r\n    });\r\n}); };\r\nexports.removeFavorite = removeFavorite;\r\nvar markFavorite = function (url, contents) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.set(url, contents)];\r\n    });\r\n}); };\r\nexports.markFavorite = markFavorite;\r\nvar isFavorite = function (url) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.get(url).then(function (val) { return Promise.resolve(!!val); })];\r\n    });\r\n}); };\r\nexports.isFavorite = isFavorite;\r\nvar getFavoriteContents = function (url) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.get(url)];\r\n    });\r\n}); };\r\nexports.getFavoriteContents = getFavoriteContents;\r\nvar getFavoritedSites = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.keys()];\r\n    });\r\n}); };\r\nexports.getFavoritedSites = getFavoritedSites;\r\nvar getFavoritedSiteNames = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, exports.getFavoritedSites()\r\n                .then(function (keys) {\r\n                return Promise.all(keys.map(function (key) { return idb_keyval_1.get(key); }))\r\n                    .then(function (contents) { return Promise.resolve(contents.map(function (content) { return content.title; })); });\r\n            })];\r\n    });\r\n}); };\r\nexports.getFavoritedSiteNames = getFavoritedSiteNames;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/lib/favorites.ts?");

/***/ }),

/***/ "./src/frontend/lib/history.ts":
/*!*************************************!*\
  !*** ./src/frontend/lib/history.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __spreadArray = (this && this.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.clearHistory = exports.getHistory = exports.addOrRaiseHistory = exports.addHistory = void 0;\r\nvar idb_keyval_1 = __webpack_require__(/*! idb-keyval */ \"idb-keyval\");\r\nvar settings_1 = __importDefault(__webpack_require__(/*! ../settings */ \"./src/frontend/settings.js\"));\r\nvar historyKey = 'recipeHistory';\r\n// TODO: un-any this entire file\r\nvar urlInHistory = function (url) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, exports.getHistory()\r\n                .then(function (history) {\r\n                if (!!history) {\r\n                    return Promise.resolve(!history.map(function (hist) { return hist.url; }).indexOf(url));\r\n                }\r\n                else {\r\n                    return Promise.reject();\r\n                }\r\n            })];\r\n    });\r\n}); };\r\nvar moveResultUrlToFront = function (url) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, exports.getHistory()\r\n                .then(function (history) {\r\n                var matchedUrl = history.filter(function (hist) { return hist.url === url; });\r\n                var newResults = history.filter(function (hist) { return hist.url !== url; });\r\n                if (matchedUrl.length > 0) {\r\n                    var newFirst = matchedUrl[0];\r\n                    newResults.unshift(newFirst);\r\n                    idb_keyval_1.set(historyKey, newResults);\r\n                }\r\n                else {\r\n                    return Promise.reject();\r\n                }\r\n            })];\r\n    });\r\n}); };\r\nvar addHistory = function (url, content) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var historyObj;\r\n    return __generator(this, function (_a) {\r\n        historyObj = { url: url, content: content };\r\n        idb_keyval_1.get(historyKey)\r\n            .then(function (result) {\r\n            if (!result) {\r\n                idb_keyval_1.set(historyKey, [historyObj]);\r\n            }\r\n            else {\r\n                var limit = settings_1.default.history.limit;\r\n                var newResult = result.length >= limit ? __spreadArray([\r\n                    historyObj\r\n                ], result.slice(0, limit - 1)) : __spreadArray([\r\n                    historyObj\r\n                ], result);\r\n                console.log(newResult);\r\n                idb_keyval_1.set(historyKey, newResult);\r\n            }\r\n        });\r\n        return [2 /*return*/];\r\n    });\r\n}); };\r\nexports.addHistory = addHistory;\r\n// Takes in a url and its result, if the URL is already in the history\r\n// the result becomes the most recently visited, and nothing else changes.\r\nvar addOrRaiseHistory = function (url, results) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        urlInHistory(url)\r\n            .then(function (wasTrue) {\r\n            if (wasTrue) {\r\n                moveResultUrlToFront(url);\r\n            }\r\n            else {\r\n                exports.addHistory(url, results);\r\n            }\r\n        });\r\n        return [2 /*return*/];\r\n    });\r\n}); };\r\nexports.addOrRaiseHistory = addOrRaiseHistory;\r\nvar getHistory = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.get(historyKey)];\r\n    });\r\n}); };\r\nexports.getHistory = getHistory;\r\nvar clearHistory = function () { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, idb_keyval_1.del(historyKey)];\r\n    });\r\n}); };\r\nexports.clearHistory = clearHistory;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/lib/history.ts?");

/***/ }),

/***/ "./src/frontend/lib/stateManager.ts":
/*!******************************************!*\
  !*** ./src/frontend/lib/stateManager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar StateManager = /** @class */ (function () {\r\n    function StateManager() {\r\n        this.subscribers = {};\r\n        this.subscribers = {};\r\n    }\r\n    StateManager.getInstance = function () {\r\n        if (!StateManager.instance) {\r\n            StateManager.instance = new StateManager();\r\n        }\r\n        return StateManager.instance;\r\n    };\r\n    StateManager.prototype.push = function (event, payload) {\r\n        if (payload === void 0) { payload = {}; }\r\n        if (!Object.keys(this.subscribers).indexOf(event)) {\r\n            this.subscribers[event].forEach(function (callback) { return callback(payload); });\r\n        }\r\n    };\r\n    StateManager.prototype.subscribe = function (event, callback) {\r\n        if (!!Object.keys(this.subscribers).indexOf(event)) {\r\n            this.subscribers[event] = [];\r\n        }\r\n        this.subscribers[event].push(callback);\r\n    };\r\n    return StateManager;\r\n}());\r\nexports.default = StateManager;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/lib/stateManager.ts?");

/***/ }),

/***/ "./src/frontend/module/getData.ts":
/*!****************************************!*\
  !*** ./src/frontend/module/getData.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getUrl = void 0;\r\nvar settings_1 = __importDefault(__webpack_require__(/*! ../settings */ \"./src/frontend/settings.js\"));\r\nvar favorites_1 = __webpack_require__(/*! ../lib/favorites */ \"./src/frontend/lib/favorites.ts\");\r\nvar getUrl = function (url) {\r\n    var local = localStorage.getItem(url);\r\n    if (local) {\r\n        return Promise.resolve(JSON.parse(local));\r\n    }\r\n    return favorites_1.isFavorite(url)\r\n        .then(function (fav) {\r\n        if (fav) {\r\n            return favorites_1.getFavoriteContents(url)\r\n                .then(function (r) { return Promise.resolve(r); });\r\n        }\r\n        else {\r\n            return fetch(settings_1.default.urls.serviceUrl + \"?url=\" + url)\r\n                .then(function (r) { return r.json(); })\r\n                .then(function (r) {\r\n                if (r.error) {\r\n                    return Promise.reject(\"Failed to parse recipe.\");\r\n                }\r\n                if (r.instructions && r.ingredients && r.title) {\r\n                    localStorage.setItem(url, JSON.stringify(r));\r\n                    return Promise.resolve(r);\r\n                }\r\n            });\r\n        }\r\n    });\r\n};\r\nexports.getUrl = getUrl;\r\n\n\n//# sourceURL=webpack://shorter.recipes/./src/frontend/module/getData.ts?");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("cheerio");

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("firebase");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("firebase-functions");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("firebase/app");

/***/ }),

/***/ "handlebars":
/*!*****************************!*\
  !*** external "handlebars" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),

/***/ "idb-keyval":
/*!*****************************!*\
  !*** external "idb-keyval" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("idb-keyval");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("query-string");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react-bootstrap/Button":
/*!*****************************************!*\
  !*** external "react-bootstrap/Button" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Button");

/***/ }),

/***/ "react-bootstrap/Col":
/*!**************************************!*\
  !*** external "react-bootstrap/Col" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Col");

/***/ }),

/***/ "react-bootstrap/Container":
/*!********************************************!*\
  !*** external "react-bootstrap/Container" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Container");

/***/ }),

/***/ "react-bootstrap/FormControl":
/*!**********************************************!*\
  !*** external "react-bootstrap/FormControl" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/FormControl");

/***/ }),

/***/ "react-bootstrap/InputGroup":
/*!*********************************************!*\
  !*** external "react-bootstrap/InputGroup" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/InputGroup");

/***/ }),

/***/ "react-bootstrap/ListGroup":
/*!********************************************!*\
  !*** external "react-bootstrap/ListGroup" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/ListGroup");

/***/ }),

/***/ "react-bootstrap/Row":
/*!**************************************!*\
  !*** external "react-bootstrap/Row" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Row");

/***/ }),

/***/ "react-bootstrap/Tab":
/*!**************************************!*\
  !*** external "react-bootstrap/Tab" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Tab");

/***/ }),

/***/ "react-bootstrap/Tabs":
/*!***************************************!*\
  !*** external "react-bootstrap/Tabs" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("react-bootstrap/Tabs");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-icons/ai":
/*!*********************************!*\
  !*** external "react-icons/ai" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("react-icons/ai");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-swipeable":
/*!**********************************!*\
  !*** external "react-swipeable" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-swipeable");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/index.js");
/******/ 	var __webpack_export_target__ = this;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;