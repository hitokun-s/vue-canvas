/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function (){
  var drawFuncs = [];

  Vue.directive('canvas', {
    bind: function (el, binding, vnode) {




      var children = vnode.children.filter(function(child){
        return child.componentOptions;
      });


      children.sort(function(child1, child2){


        // console.log(child1.componentInstance.ord);
        // console.log(child2.componentInstance.ord);
        // return (parseInt(child1.componentInstance.ord) || 9999) - (parseInt(child2.componentInstance.ord) || 9999);
        return (parseInt(child1.componentOptions.propsData.ord) || 9999) - (parseInt(child2.componentOptions.propsData.ord) || 9999);

      });

      if(drawFuncs.length == 0){
        drawFuncs = children.map(function(child){

          return child.componentInstance.draw;
          // return child.componentOptions.propsData;
        });
      }

      // console.log(children.map(function(d){return d.ord}));

      var canvas = el;
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0,0,canvas.width, canvas.height);

      var promises = drawFuncs.map(function(draw){
        return function(){
          return new Promise(function(resolve){
            draw(ctx, resolve);
          });
        };
      });

      var promise = promises[0]();
      for (var i = 1; i < promises.length; i++){
        promise = promise.then(promises[i]);
      }

      promise.then(function(){
        binding.value(ctx);
      })
    },
    update: function(el, binding, vnode){

      var bind = binding.def.bind;
      bind(el, binding, vnode);
    }
  });
})();

/***/ })
/******/ ]);