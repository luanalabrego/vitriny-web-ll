/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/yocto-queue";
exports.ids = ["vendor-chunks/yocto-queue"];
exports.modules = {

/***/ "(rsc)/./node_modules/yocto-queue/index.js":
/*!*******************************************!*\
  !*** ./node_modules/yocto-queue/index.js ***!
  \*******************************************/
/***/ ((module) => {

eval("class Node {\n\t/// value;\n\t/// next;\n\n\tconstructor(value) {\n\t\tthis.value = value;\n\n\t\t// TODO: Remove this when targeting Node.js 12.\n\t\tthis.next = undefined;\n\t}\n}\n\nclass Queue {\n\t// TODO: Use private class fields when targeting Node.js 12.\n\t// #_head;\n\t// #_tail;\n\t// #_size;\n\n\tconstructor() {\n\t\tthis.clear();\n\t}\n\n\tenqueue(value) {\n\t\tconst node = new Node(value);\n\n\t\tif (this._head) {\n\t\t\tthis._tail.next = node;\n\t\t\tthis._tail = node;\n\t\t} else {\n\t\t\tthis._head = node;\n\t\t\tthis._tail = node;\n\t\t}\n\n\t\tthis._size++;\n\t}\n\n\tdequeue() {\n\t\tconst current = this._head;\n\t\tif (!current) {\n\t\t\treturn;\n\t\t}\n\n\t\tthis._head = this._head.next;\n\t\tthis._size--;\n\t\treturn current.value;\n\t}\n\n\tclear() {\n\t\tthis._head = undefined;\n\t\tthis._tail = undefined;\n\t\tthis._size = 0;\n\t}\n\n\tget size() {\n\t\treturn this._size;\n\t}\n\n\t* [Symbol.iterator]() {\n\t\tlet current = this._head;\n\n\t\twhile (current) {\n\t\t\tyield current.value;\n\t\t\tcurrent = current.next;\n\t\t}\n\t}\n}\n\nmodule.exports = Queue;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMveW9jdG8tcXVldWUvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsiL1VzZXJzL2x1Y2Fzc2FudG9zL0Rvd25sb2Fkcy92aXRyaW55LXdlYi1sbC9ub2RlX21vZHVsZXMveW9jdG8tcXVldWUvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTm9kZSB7XG5cdC8vLyB2YWx1ZTtcblx0Ly8vIG5leHQ7XG5cblx0Y29uc3RydWN0b3IodmFsdWUpIHtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cblx0XHQvLyBUT0RPOiBSZW1vdmUgdGhpcyB3aGVuIHRhcmdldGluZyBOb2RlLmpzIDEyLlxuXHRcdHRoaXMubmV4dCA9IHVuZGVmaW5lZDtcblx0fVxufVxuXG5jbGFzcyBRdWV1ZSB7XG5cdC8vIFRPRE86IFVzZSBwcml2YXRlIGNsYXNzIGZpZWxkcyB3aGVuIHRhcmdldGluZyBOb2RlLmpzIDEyLlxuXHQvLyAjX2hlYWQ7XG5cdC8vICNfdGFpbDtcblx0Ly8gI19zaXplO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuY2xlYXIoKTtcblx0fVxuXG5cdGVucXVldWUodmFsdWUpIHtcblx0XHRjb25zdCBub2RlID0gbmV3IE5vZGUodmFsdWUpO1xuXG5cdFx0aWYgKHRoaXMuX2hlYWQpIHtcblx0XHRcdHRoaXMuX3RhaWwubmV4dCA9IG5vZGU7XG5cdFx0XHR0aGlzLl90YWlsID0gbm9kZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5faGVhZCA9IG5vZGU7XG5cdFx0XHR0aGlzLl90YWlsID0gbm9kZTtcblx0XHR9XG5cblx0XHR0aGlzLl9zaXplKys7XG5cdH1cblxuXHRkZXF1ZXVlKCkge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9oZWFkO1xuXHRcdGlmICghY3VycmVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2hlYWQgPSB0aGlzLl9oZWFkLm5leHQ7XG5cdFx0dGhpcy5fc2l6ZS0tO1xuXHRcdHJldHVybiBjdXJyZW50LnZhbHVlO1xuXHR9XG5cblx0Y2xlYXIoKSB7XG5cdFx0dGhpcy5faGVhZCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLl90YWlsID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuX3NpemUgPSAwO1xuXHR9XG5cblx0Z2V0IHNpemUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3NpemU7XG5cdH1cblxuXHQqIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdGxldCBjdXJyZW50ID0gdGhpcy5faGVhZDtcblxuXHRcdHdoaWxlIChjdXJyZW50KSB7XG5cdFx0XHR5aWVsZCBjdXJyZW50LnZhbHVlO1xuXHRcdFx0Y3VycmVudCA9IGN1cnJlbnQubmV4dDtcblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBRdWV1ZTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/yocto-queue/index.js\n");

/***/ })

};
;