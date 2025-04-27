/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_lucassantos_Downloads_vitriny_web_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/login/route.ts */ \"(rsc)/./src/app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/Users/lucassantos/Downloads/vitriny-web/src/app/api/auth/login/route.ts\",\n    nextConfigOutput,\n    userland: _Users_lucassantos_Downloads_vitriny_web_src_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmx1Y2Fzc2FudG9zJTJGRG93bmxvYWRzJTJGdml0cmlueS13ZWIlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbHVjYXNzYW50b3MlMkZEb3dubG9hZHMlMkZ2aXRyaW55LXdlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0I7QUFDckc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9sdWNhc3NhbnRvcy9Eb3dubG9hZHMvdml0cmlueS13ZWIvc3JjL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbHVjYXNzYW50b3MvRG93bmxvYWRzL3ZpdHJpbnktd2ViL3NyYy9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/auth/login/route.ts":
/*!*****************************************!*\
  !*** ./src/app/api/auth/login/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\n// Simulação do banco de dados para desenvolvimento\nconst usuariosDemo = [\n    {\n        id: 1,\n        nome: 'Admin',\n        email: 'admin@vitriny.com',\n        senha: '$2a$10$JGLPVTAFUMQHHQUQm0QXpOvhvGiD.jS3hQRrIaQMaRLhFzS/X0oMu',\n        empresa_id: 1,\n        empresa_nome: 'Empresa Demonstração'\n    }\n];\nasync function POST(request) {\n    try {\n        const { email, senha } = await request.json();\n        if (!email || !senha) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Email e senha são obrigatórios'\n            }, {\n                status: 400\n            });\n        }\n        // Simulação de autenticação para desenvolvimento\n        const usuario = usuariosDemo.find((u)=>u.email === email);\n        if (!usuario) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Email ou senha inválidos'\n            }, {\n                status: 401\n            });\n        }\n        // Em produção, verificaria a senha com bcrypt\n        // Por enquanto, aceitamos qualquer senha para o usuário demo\n        // Definir cookie de autenticação\n        (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().set({\n            name: 'vitriny_auth',\n            value: JSON.stringify({\n                id: usuario.id,\n                nome: usuario.nome,\n                email: usuario.email,\n                empresa_id: usuario.empresa_id,\n                empresa_nome: usuario.empresa_nome\n            }),\n            httpOnly: true,\n            path: '/',\n            secure: \"development\" === 'production',\n            maxAge: 60 * 60 * 24 * 7\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error('Erro no login:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Erro interno do servidor'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF3RDtBQUNqQjtBQUl2QyxtREFBbUQ7QUFDbkQsTUFBTUUsZUFBZTtJQUNuQjtRQUNFQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsT0FBTztRQUNQQyxPQUFPO1FBQ1BDLFlBQVk7UUFDWkMsY0FBYztJQUNoQjtDQUNEO0FBRU0sZUFBZUMsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRUwsS0FBSyxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNSSxRQUFRQyxJQUFJO1FBRTNDLElBQUksQ0FBQ04sU0FBUyxDQUFDQyxPQUFPO1lBQ3BCLE9BQU9OLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQWlDLEdBQzVDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxpREFBaUQ7UUFDakQsTUFBTUMsVUFBVVosYUFBYWEsSUFBSSxDQUFDQyxDQUFBQSxJQUFLQSxFQUFFWCxLQUFLLEtBQUtBO1FBRW5ELElBQUksQ0FBQ1MsU0FBUztZQUNaLE9BQU9kLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQTJCLEdBQ3RDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSw4Q0FBOEM7UUFDOUMsNkRBQTZEO1FBRTdELGlDQUFpQztRQUNqQ1oscURBQU9BLEdBQUdnQixHQUFHLENBQUM7WUFDWkMsTUFBTTtZQUNOQyxPQUFPQyxLQUFLQyxTQUFTLENBQUM7Z0JBQ3BCbEIsSUFBSVcsUUFBUVgsRUFBRTtnQkFDZEMsTUFBTVUsUUFBUVYsSUFBSTtnQkFDbEJDLE9BQU9TLFFBQVFULEtBQUs7Z0JBQ3BCRSxZQUFZTyxRQUFRUCxVQUFVO2dCQUM5QkMsY0FBY00sUUFBUU4sWUFBWTtZQUNwQztZQUNBYyxVQUFVO1lBQ1ZDLE1BQU07WUFDTkMsUUFBUUMsa0JBQXlCO1lBQ2pDQyxRQUFRLEtBQUssS0FBSyxLQUFLO1FBQ3pCO1FBRUEsT0FBTzFCLHFEQUFZQSxDQUFDVyxJQUFJLENBQUM7WUFBRWdCLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGtCQUFrQkE7UUFDaEMsT0FBTzVCLHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO1lBQUVDLFNBQVM7UUFBMkIsR0FDdEM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWNhc3NhbnRvcy9Eb3dubG9hZHMvdml0cmlueS13ZWIvc3JjL2FwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XG5pbXBvcnQgeyBhdXRlbnRpY2FyVXN1YXJpbywgc2V0QXV0aENvb2tpZSB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHR5cGUgeyBMb2dpbkNyZWRlbnRpYWxzIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbi8vIFNpbXVsYcOnw6NvIGRvIGJhbmNvIGRlIGRhZG9zIHBhcmEgZGVzZW52b2x2aW1lbnRvXG5jb25zdCB1c3Vhcmlvc0RlbW8gPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBub21lOiAnQWRtaW4nLFxuICAgIGVtYWlsOiAnYWRtaW5Adml0cmlueS5jb20nLFxuICAgIHNlbmhhOiAnJDJhJDEwJEpHTFBWVEFGVU1RSEhRVVFtMFFYcE92aHZHaUQualMzaFFScklhUU1hUkxoRnpTL1gwb011JywgLy8gYWRtaW4xMjNcbiAgICBlbXByZXNhX2lkOiAxLFxuICAgIGVtcHJlc2Ffbm9tZTogJ0VtcHJlc2EgRGVtb25zdHJhw6fDo28nXG4gIH1cbl07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBlbWFpbCwgc2VuaGEgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpIGFzIExvZ2luQ3JlZGVudGlhbHM7XG4gICAgXG4gICAgaWYgKCFlbWFpbCB8fCAhc2VuaGEpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiAnRW1haWwgZSBzZW5oYSBzw6NvIG9icmlnYXTDs3Jpb3MnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBTaW11bGHDp8OjbyBkZSBhdXRlbnRpY2HDp8OjbyBwYXJhIGRlc2Vudm9sdmltZW50b1xuICAgIGNvbnN0IHVzdWFyaW8gPSB1c3Vhcmlvc0RlbW8uZmluZCh1ID0+IHUuZW1haWwgPT09IGVtYWlsKTtcbiAgICBcbiAgICBpZiAoIXVzdWFyaW8pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiAnRW1haWwgb3Ugc2VuaGEgaW52w6FsaWRvcycgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEVtIHByb2R1w6fDo28sIHZlcmlmaWNhcmlhIGEgc2VuaGEgY29tIGJjcnlwdFxuICAgIC8vIFBvciBlbnF1YW50bywgYWNlaXRhbW9zIHF1YWxxdWVyIHNlbmhhIHBhcmEgbyB1c3XDoXJpbyBkZW1vXG4gICAgXG4gICAgLy8gRGVmaW5pciBjb29raWUgZGUgYXV0ZW50aWNhw6fDo29cbiAgICBjb29raWVzKCkuc2V0KHtcbiAgICAgIG5hbWU6ICd2aXRyaW55X2F1dGgnLFxuICAgICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWQ6IHVzdWFyaW8uaWQsXG4gICAgICAgIG5vbWU6IHVzdWFyaW8ubm9tZSxcbiAgICAgICAgZW1haWw6IHVzdWFyaW8uZW1haWwsXG4gICAgICAgIGVtcHJlc2FfaWQ6IHVzdWFyaW8uZW1wcmVzYV9pZCxcbiAgICAgICAgZW1wcmVzYV9ub21lOiB1c3VhcmlvLmVtcHJlc2Ffbm9tZVxuICAgICAgfSksXG4gICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgIHBhdGg6ICcvJyxcbiAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyxcbiAgICAgIG1heEFnZTogNjAgKiA2MCAqIDI0ICogNywgLy8gMSBzZW1hbmFcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJybyBubyBsb2dpbjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiAnRXJybyBpbnRlcm5vIGRvIHNlcnZpZG9yJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvb2tpZXMiLCJ1c3Vhcmlvc0RlbW8iLCJpZCIsIm5vbWUiLCJlbWFpbCIsInNlbmhhIiwiZW1wcmVzYV9pZCIsImVtcHJlc2Ffbm9tZSIsIlBPU1QiLCJyZXF1ZXN0IiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJ1c3VhcmlvIiwiZmluZCIsInUiLCJzZXQiLCJuYW1lIiwidmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwiaHR0cE9ubHkiLCJwYXRoIiwic2VjdXJlIiwicHJvY2VzcyIsIm1heEFnZSIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/login/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();