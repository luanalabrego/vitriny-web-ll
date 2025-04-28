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
exports.id = "app/api/produtos/route";
exports.ids = ["app/api/produtos/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprodutos%2Froute&page=%2Fapi%2Fprodutos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprodutos%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprodutos%2Froute&page=%2Fapi%2Fprodutos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprodutos%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_lucassantos_Downloads_vitriny_web_ll_src_app_api_produtos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/produtos/route.ts */ \"(rsc)/./src/app/api/produtos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/produtos/route\",\n        pathname: \"/api/produtos\",\n        filename: \"route\",\n        bundlePath: \"app/api/produtos/route\"\n    },\n    resolvedPagePath: \"/Users/lucassantos/Downloads/vitriny-web-ll/src/app/api/produtos/route.ts\",\n    nextConfigOutput,\n    userland: _Users_lucassantos_Downloads_vitriny_web_ll_src_app_api_produtos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9kdXRvcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJvZHV0b3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm9kdXRvcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmx1Y2Fzc2FudG9zJTJGRG93bmxvYWRzJTJGdml0cmlueS13ZWItbGwlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbHVjYXNzYW50b3MlMkZEb3dubG9hZHMlMkZ2aXRyaW55LXdlYi1sbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDeUI7QUFDdEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9sdWNhc3NhbnRvcy9Eb3dubG9hZHMvdml0cmlueS13ZWItbGwvc3JjL2FwcC9hcGkvcHJvZHV0b3Mvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Byb2R1dG9zL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcHJvZHV0b3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Byb2R1dG9zL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2x1Y2Fzc2FudG9zL0Rvd25sb2Fkcy92aXRyaW55LXdlYi1sbC9zcmMvYXBwL2FwaS9wcm9kdXRvcy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprodutos%2Froute&page=%2Fapi%2Fprodutos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprodutos%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "(rsc)/./src/app/api/produtos/route.ts":
/*!***************************************!*\
  !*** ./src/app/api/produtos/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n// src/app/api/produtos/route.ts\n\n\n// GET: lista produtos (SEM trazer imageUrl agora)\nasync function GET(request) {\n    try {\n        const produtos = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].product.findMany({\n            select: {\n                ean: true,\n                descricao: true,\n                marca: true,\n                cor: true,\n                tamanho: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(produtos, {\n            status: 200\n        });\n    } catch (err) {\n        console.error('[API /api/produtos] GET error:', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err.message\n        }, {\n            status: 500\n        });\n    }\n}\n// POST: cria um novo produto\nasync function POST(request) {\n    try {\n        const { ean, descricao, marca, cor, tamanho, imageUrl, originalUrl } = await request.json();\n        if (!ean || !descricao || !marca || !cor || !tamanho || !imageUrl) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Campos obrigatórios faltando.'\n            }, {\n                status: 400\n            });\n        }\n        const novoProduto = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].product.create({\n            data: {\n                ean,\n                descricao,\n                marca,\n                cor,\n                tamanho,\n                imageUrl,\n                originalUrl: originalUrl || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(novoProduto, {\n            status: 201\n        });\n    } catch (err) {\n        console.error('[API /api/produtos] POST error:', err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9wcm9kdXRvcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsZ0NBQWdDO0FBRVU7QUFDVDtBQUVqQyxrREFBa0Q7QUFDM0MsZUFBZUUsSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU1DLFdBQVcsTUFBTUgsbURBQU1BLENBQUNJLE9BQU8sQ0FBQ0MsUUFBUSxDQUFDO1lBQzdDQyxRQUFRO2dCQUNOQyxLQUFLO2dCQUNMQyxXQUFXO2dCQUNYQyxPQUFPO2dCQUNQQyxLQUFLO2dCQUNMQyxTQUFTO1lBRVg7UUFDRjtRQUNBLE9BQU9aLHFEQUFZQSxDQUFDYSxJQUFJLENBQUNULFVBQVU7WUFBRVUsUUFBUTtRQUFJO0lBQ25ELEVBQUUsT0FBT0MsS0FBVTtRQUNqQkMsUUFBUUMsS0FBSyxDQUFDLGtDQUFrQ0Y7UUFDaEQsT0FBT2YscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUFFSSxPQUFPRixJQUFJRyxPQUFPO1FBQUMsR0FBRztZQUFFSixRQUFRO1FBQUk7SUFDakU7QUFDRjtBQUVBLDZCQUE2QjtBQUN0QixlQUFlSyxLQUFLaEIsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFDSkssR0FBRyxFQUNIQyxTQUFTLEVBQ1RDLEtBQUssRUFDTEMsR0FBRyxFQUNIQyxPQUFPLEVBQ1BRLFFBQVEsRUFDUkMsV0FBVyxFQUNaLEdBQUcsTUFBTWxCLFFBQVFVLElBQUk7UUFFdEIsSUFBSSxDQUFDTCxPQUFPLENBQUNDLGFBQWEsQ0FBQ0MsU0FBUyxDQUFDQyxPQUFPLENBQUNDLFdBQVcsQ0FBQ1EsVUFBVTtZQUNqRSxPQUFPcEIscURBQVlBLENBQUNhLElBQUksQ0FDdEI7Z0JBQUVJLE9BQU87WUFBZ0MsR0FDekM7Z0JBQUVILFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1RLGNBQWMsTUFBTXJCLG1EQUFNQSxDQUFDSSxPQUFPLENBQUNrQixNQUFNLENBQUM7WUFDOUNDLE1BQU07Z0JBQ0poQjtnQkFDQUM7Z0JBQ0FDO2dCQUNBQztnQkFDQUM7Z0JBQ0FRO2dCQUNBQyxhQUFhQSxlQUFlO1lBQzlCO1FBQ0Y7UUFFQSxPQUFPckIscURBQVlBLENBQUNhLElBQUksQ0FBQ1MsYUFBYTtZQUFFUixRQUFRO1FBQUk7SUFDdEQsRUFBRSxPQUFPQyxLQUFVO1FBQ2pCQyxRQUFRQyxLQUFLLENBQUMsbUNBQW1DRjtRQUNqRCxPQUFPZixxREFBWUEsQ0FBQ2EsSUFBSSxDQUFDO1lBQUVJLE9BQU9GLElBQUlHLE9BQU87UUFBQyxHQUFHO1lBQUVKLFFBQVE7UUFBSTtJQUNqRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvbHVjYXNzYW50b3MvRG93bmxvYWRzL3ZpdHJpbnktd2ViLWxsL3NyYy9hcHAvYXBpL3Byb2R1dG9zL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hcHAvYXBpL3Byb2R1dG9zL3JvdXRlLnRzXG5cbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnXG5cbi8vIEdFVDogbGlzdGEgcHJvZHV0b3MgKFNFTSB0cmF6ZXIgaW1hZ2VVcmwgYWdvcmEpXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm9kdXRvcyA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmZpbmRNYW55KHtcbiAgICAgIHNlbGVjdDoge1xuICAgICAgICBlYW46IHRydWUsXG4gICAgICAgIGRlc2NyaWNhbzogdHJ1ZSxcbiAgICAgICAgbWFyY2E6IHRydWUsXG4gICAgICAgIGNvcjogdHJ1ZSxcbiAgICAgICAgdGFtYW5obzogdHJ1ZVxuICAgICAgICAvLyBOw4NPIHRyYXplbW9zIGltYWdlVXJsLCBuZW0gb3JpZ2luYWxVcmxcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihwcm9kdXRvcywgeyBzdGF0dXM6IDIwMCB9KVxuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tBUEkgL2FwaS9wcm9kdXRvc10gR0VUIGVycm9yOicsIGVycilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG5cbi8vIFBPU1Q6IGNyaWEgdW0gbm92byBwcm9kdXRvXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qge1xuICAgICAgZWFuLFxuICAgICAgZGVzY3JpY2FvLFxuICAgICAgbWFyY2EsXG4gICAgICBjb3IsXG4gICAgICB0YW1hbmhvLFxuICAgICAgaW1hZ2VVcmwsXG4gICAgICBvcmlnaW5hbFVybFxuICAgIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgaWYgKCFlYW4gfHwgIWRlc2NyaWNhbyB8fCAhbWFyY2EgfHwgIWNvciB8fCAhdGFtYW5obyB8fCAhaW1hZ2VVcmwpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0NhbXBvcyBvYnJpZ2F0w7NyaW9zIGZhbHRhbmRvLicgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3Qgbm92b1Byb2R1dG8gPSBhd2FpdCBwcmlzbWEucHJvZHVjdC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBlYW4sXG4gICAgICAgIGRlc2NyaWNhbyxcbiAgICAgICAgbWFyY2EsXG4gICAgICAgIGNvcixcbiAgICAgICAgdGFtYW5obyxcbiAgICAgICAgaW1hZ2VVcmwsXG4gICAgICAgIG9yaWdpbmFsVXJsOiBvcmlnaW5hbFVybCB8fCBudWxsXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihub3ZvUHJvZHV0bywgeyBzdGF0dXM6IDIwMSB9KVxuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1tBUEkgL2FwaS9wcm9kdXRvc10gUE9TVCBlcnJvcjonLCBlcnIpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVyci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJwcm9kdXRvcyIsInByb2R1Y3QiLCJmaW5kTWFueSIsInNlbGVjdCIsImVhbiIsImRlc2NyaWNhbyIsIm1hcmNhIiwiY29yIiwidGFtYW5obyIsImpzb24iLCJzdGF0dXMiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiUE9TVCIsImltYWdlVXJsIiwib3JpZ2luYWxVcmwiLCJub3ZvUHJvZHV0byIsImNyZWF0ZSIsImRhdGEiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/produtos/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// src/lib/prisma.ts\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvQkFBb0I7QUFFMEI7QUFROUMsTUFBTUMsU0FBU0MsT0FBT0QsTUFBTSxJQUFJLElBQUlELHdEQUFZQTtBQUVoRCxJQUFJRyxJQUFxQyxFQUFFRCxPQUFPRCxNQUFNLEdBQUdBO0FBRTNELGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvbHVjYXNzYW50b3MvRG93bmxvYWRzL3ZpdHJpbnktd2ViLWxsL3NyYy9saWIvcHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9saWIvcHJpc21hLnRzXG5cbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxuLy8gRW5zdXJlIGEgc2luZ2xlIGluc3RhbmNlIG9mIFByaXNtYUNsaWVudCBhY3Jvc3MgaG90IHJlbG9hZHNcbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxuICB2YXIgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTtcblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSIsImdsb2JhbCIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprodutos%2Froute&page=%2Fapi%2Fprodutos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprodutos%2Froute.ts&appDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Flucassantos%2FDownloads%2Fvitriny-web-ll&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();