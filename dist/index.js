!function(t){var r={};function e(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return t[n].call(u.exports,u,u.exports,e),u.l=!0,u.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var u in t)e.d(n,u,function(r){return t[r]}.bind(null,u));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=5)}([function(t,r,e){"use strict";(function(t,n){var u,o=e(1);u="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:n;var i=Object(o.a)(u);r.a=i}).call(this,e(3),e(4)(t))},function(t,r,e){"use strict";function n(t){var r,e=t.Symbol;return"function"==typeof e?e.observable?r=e.observable:(r=e("observable"),e.observable=r):r="@@observable",r}e.d(r,"a",(function(){return n}))},,function(t,r){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,r){t.exports=function(t){if(!t.webpackPolyfill){var r=Object.create(t);r.children||(r.children=[]),Object.defineProperty(r,"loaded",{enumerable:!0,get:function(){return r.l}}),Object.defineProperty(r,"id",{enumerable:!0,get:function(){return r.i}}),Object.defineProperty(r,"exports",{enumerable:!0}),r.webpackPolyfill=1}return r}},function(t,r,e){"use strict";e.r(r);var n=e(0),u=function(){return Math.random().toString(36).substring(7).split("").join(".")},o={INIT:"@@redux/INIT"+u(),REPLACE:"@@redux/REPLACE"+u(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+u()}};function i(t){if("object"!=typeof t||null===t)return!1;for(var r=t;null!==Object.getPrototypeOf(r);)r=Object.getPrototypeOf(r);return Object.getPrototypeOf(t)===r}function c(t,r,e){var u;if("function"==typeof r&&"function"==typeof e||"function"==typeof e&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof r&&void 0===e&&(e=r,r=void 0),void 0!==e){if("function"!=typeof e)throw new Error("Expected the enhancer to be a function.");return e(c)(t,r)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var a=t,f=r,s=[],l=s,p=!1;function d(){l===s&&(l=s.slice())}function h(){if(p)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return f}function y(t){if("function"!=typeof t)throw new Error("Expected the listener to be a function.");if(p)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var r=!0;return d(),l.push(t),function(){if(r){if(p)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");r=!1,d();var e=l.indexOf(t);l.splice(e,1),s=null}}}function b(t){if(!i(t))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===t.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(p)throw new Error("Reducers may not dispatch actions.");try{p=!0,f=a(f,t)}finally{p=!1}for(var r=s=l,e=0;e<r.length;e++){(0,r[e])()}return t}function g(t){if("function"!=typeof t)throw new Error("Expected the nextReducer to be a function.");a=t,b({type:o.REPLACE})}function v(){var t,r=y;return(t={subscribe:function(t){if("object"!=typeof t||null===t)throw new TypeError("Expected the observer to be an object.");function e(){t.next&&t.next(h())}return e(),{unsubscribe:r(e)}}})[n.a]=function(){return this},t}return b({type:o.INIT}),(u={dispatch:b,subscribe:y,getState:h,replaceReducer:g})[n.a]=v,u}function a(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function f(t,r){var e=Object.keys(t);return Object.getOwnPropertySymbols&&e.push.apply(e,Object.getOwnPropertySymbols(t)),r&&(e=e.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e}function s(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?f(e,!0).forEach((function(r){a(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):f(e).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function l(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return 0===r.length?function(t){return t}:1===r.length?r[0]:r.reduce((function(t,r){return function(){return t(r.apply(void 0,arguments))}}))}function p(t){return null!=t&&"object"==typeof t&&!0===t["@@functional/placeholder"]}function d(t){return function r(e){return 0===arguments.length||p(e)?r:t.apply(this,arguments)}}function h(t){return function r(e,n){switch(arguments.length){case 0:return r;case 1:return p(e)?r:d((function(r){return t(e,r)}));default:return p(e)&&p(n)?r:p(e)?d((function(r){return t(r,n)})):p(n)?d((function(r){return t(e,r)})):t(e,n)}}}var y=h((function(t,r){return null!=r&&r.constructor===t||r instanceof t}));function b(t,r){switch(t){case 0:return function(){return r.apply(this,arguments)};case 1:return function(t){return r.apply(this,arguments)};case 2:return function(t,e){return r.apply(this,arguments)};case 3:return function(t,e,n){return r.apply(this,arguments)};case 4:return function(t,e,n,u){return r.apply(this,arguments)};case 5:return function(t,e,n,u,o){return r.apply(this,arguments)};case 6:return function(t,e,n,u,o,i){return r.apply(this,arguments)};case 7:return function(t,e,n,u,o,i,c){return r.apply(this,arguments)};case 8:return function(t,e,n,u,o,i,c,a){return r.apply(this,arguments)};case 9:return function(t,e,n,u,o,i,c,a,f){return r.apply(this,arguments)};case 10:return function(t,e,n,u,o,i,c,a,f,s){return r.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}var g=h((function(t,r){return 1===t?d(r):b(t,function t(r,e,n){return function(){for(var u=[],o=0,i=r,c=0;c<e.length||o<arguments.length;){var a;c<e.length&&(!p(e[c])||o>=arguments.length)?a=e[c]:(a=arguments[o],o+=1),u[c]=a,p(a)||(i-=1),c+=1}return i<=0?n.apply(this,u):b(i,t(r,u,n))}}(t,[],r))})),v=d((function(t){return g(t.length,t)}));function w(t,r){return function(){return r.call(this,t.apply(this,arguments))}}function O(t){return function r(e,n,u){switch(arguments.length){case 0:return r;case 1:return p(e)?r:h((function(r,n){return t(e,r,n)}));case 2:return p(e)&&p(n)?r:p(e)?h((function(r,e){return t(r,n,e)})):p(n)?h((function(r,n){return t(e,r,n)})):d((function(r){return t(e,n,r)}));default:return p(e)&&p(n)&&p(u)?r:p(e)&&p(n)?h((function(r,e){return t(r,e,u)})):p(e)&&p(u)?h((function(r,e){return t(r,n,e)})):p(n)&&p(u)?h((function(r,n){return t(e,r,n)})):p(e)?d((function(r){return t(r,n,u)})):p(n)?d((function(r){return t(e,r,u)})):p(u)?d((function(r){return t(e,n,r)})):t(e,n,u)}}}var m=Array.isArray||function(t){return null!=t&&t.length>=0&&"[object Array]"===Object.prototype.toString.call(t)};var j=d((function(t){return!!m(t)||!!t&&("object"==typeof t&&(!function(t){return"[object String]"===Object.prototype.toString.call(t)}(t)&&(1===t.nodeType?!!t.length:0===t.length||t.length>0&&(t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1)))))})),E=function(){function t(t){this.f=t}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(t){return t},t.prototype["@@transducer/step"]=function(t,r){return this.f(t,r)},t}();var P=h((function(t,r){return b(t.length,(function(){return t.apply(r,arguments)}))}));function x(t,r,e){for(var n=e.next();!n.done;){if((r=t["@@transducer/step"](r,n.value))&&r["@@transducer/reduced"]){r=r["@@transducer/value"];break}n=e.next()}return t["@@transducer/result"](r)}function S(t,r,e,n){return t["@@transducer/result"](e[n](P(t["@@transducer/step"],t),r))}var A="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function N(t,r,e){if("function"==typeof t&&(t=function(t){return new E(t)}(t)),j(e))return function(t,r,e){for(var n=0,u=e.length;n<u;){if((r=t["@@transducer/step"](r,e[n]))&&r["@@transducer/reduced"]){r=r["@@transducer/value"];break}n+=1}return t["@@transducer/result"](r)}(t,r,e);if("function"==typeof e["fantasy-land/reduce"])return S(t,r,e,"fantasy-land/reduce");if(null!=e[A])return x(t,r,e[A]());if("function"==typeof e.next)return x(t,r,e);if("function"==typeof e.reduce)return S(t,r,e,"reduce");throw new TypeError("reduce: list must be array or iterable")}var I=O(N);function _(t,r){return function(){var e=arguments.length;if(0===e)return r();var n=arguments[e-1];return m(n)||"function"!=typeof n[t]?r.apply(this,arguments):n[t].apply(n,Array.prototype.slice.call(arguments,0,e-1))}}var T=d(_("tail",O(_("slice",(function(t,r,e){return Array.prototype.slice.call(e,t,r)})))(1,1/0)));function C(){if(0===arguments.length)throw new Error("pipe requires at least one argument");return b(arguments[0].length,I(w,arguments[0],T(arguments)))}function k(t,r){return Object.prototype.hasOwnProperty.call(r,t)}var R=Number.isInteger||function(t){return t<<0===t},L=O((function(t,r,e){var n={};for(var u in e)n[u]=e[u];return n[t]=r,n})),U=d((function(t){return null==t})),D=O((function t(r,e,n){if(0===r.length)return e;var u=r[0];if(r.length>1){var o=!U(n)&&k(u,n)?n[u]:R(r[1])?[]:{};e=t(Array.prototype.slice.call(r,1),e,o)}if(R(u)&&m(n)){var i=[].concat(n);return i[u]=e,i}return L(u,e,n)}));function F(t){return null!=t&&"function"==typeof t["@@transducer/step"]}function K(t,r,e){return function(){if(0===arguments.length)return e();var n=Array.prototype.slice.call(arguments,0),u=n.pop();if(!m(u)){for(var o=0;o<t.length;){if("function"==typeof u[t[o]])return u[t[o]].apply(u,n);o+=1}if(F(u)){var i=r.apply(null,n);return i(u)}}return e.apply(this,arguments)}}var M=function(){return this.xf["@@transducer/init"]()},$=function(t){return this.xf["@@transducer/result"](t)},X=function(){function t(t,r){this.xf=r,this.f=t}return t.prototype["@@transducer/init"]=M,t.prototype["@@transducer/result"]=$,t.prototype["@@transducer/step"]=function(t,r){return this.xf["@@transducer/step"](t,this.f(r))},t}(),W=h((function(t,r){return new X(t,r)})),Y=Object.prototype.toString,B=function(){return"[object Arguments]"===Y.call(arguments)?function(t){return"[object Arguments]"===Y.call(t)}:function(t){return k("callee",t)}}(),q=!{toString:null}.propertyIsEnumerable("toString"),H=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],z=function(){return arguments.propertyIsEnumerable("length")}(),G=function(t,r){for(var e=0;e<t.length;){if(t[e]===r)return!0;e+=1}return!1},J="function"!=typeof Object.keys||z?d((function(t){if(Object(t)!==t)return[];var r,e,n=[],u=z&&B(t);for(r in t)!k(r,t)||u&&"length"===r||(n[n.length]=r);if(q)for(e=H.length-1;e>=0;)k(r=H[e],t)&&!G(n,r)&&(n[n.length]=r),e-=1;return n})):d((function(t){return Object(t)!==t?[]:Object.keys(t)})),Q=h(K(["fantasy-land/map","map"],W,(function(t,r){switch(Object.prototype.toString.call(r)){case"[object Function]":return g(r.length,(function(){return t.call(this,r.apply(this,arguments))}));case"[object Object]":return N((function(e,n){return e[n]=t(r[n]),e}),{},J(r));default:return function(t,r){for(var e=0,n=r.length,u=Array(n);e<n;)u[e]=t(r[e]),e+=1;return u}(t,r)}}))),V=h((function(t,r){return function(e){return function(n){return Q((function(t){return r(t,n)}),e(t(n)))}}})),Z=h((function(t,r){for(var e=r,n=0;n<t.length;){if(null==e)return;e=e[t[n]],n+=1}return e})),tt=d((function(t){return V(Z(t),D(t))})),rt=d((function(t){return function(){return t}})),et=function(t){return{value:t,map:function(r){return et(r(t))}}},nt=O((function(t,r,e){return t((function(t){return et(r(t))}))(e).value})),ut=O((function(t,r,e){return nt(t,rt(r),e)})),ot=function(t){return{value:t,"fantasy-land/map":function(){return this}}},it=h((function(t,r){return t(ot)(r).value}));const ct=".".charCodeAt(0),at=/\\(\\)?/g,ft=RegExp("[^.[\\]]+|\\[(?:([^\"'][^[]*)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))","g"),st=t=>Array.isArray(t)?t:(t=>{const r=[];return t.charCodeAt(0)===ct&&r.push(""),t.replace(ft,(t,e,n,u)=>{let o=t;if(n){const t=u.replace(at,"$1");return r.push(t)}if(e){const n=e.trim(),u=parseInt(n,10);if(n==u)return r.push(u);throw Error(`Key in ${t} should be integer`)}r.push(o)}),r})(t),lt=v((t,r,e)=>C(st,tt,t=>ut(t,r,e))(t)),pt=v((t,r,e)=>C(st,tt,t=>it(t,r),t=>void 0===t?e:t)(t)),dt=y(String),ht=y(Function),yt=y(Promise),bt=(t,...r)=>ht(t)?t(...r):t,gt=(v((t,r)=>(console.log(`${t}: `,r),r)),v((t,r,e,n=null)=>{const u=pt(t,e),o=bt(r,u);return yt(o)?Ot(t,o,e,n):lt(t,o,e)})),vt=v((t,r,e=null)=>Object.entries(t).reduce((t,[r,n])=>{const u=pt(r,t),o=bt(n,u);return yt(o)?Ot(r,o,t,e):lt(r,o,t)},r)),wt=(...t)=>{const[r]=t;return dt(r)?gt(...t):vt(...t)};function Ot(t,r,e,n){return r.then(r=>{const e=Pt(t,{error:null,isLoading:!1,data:r});n.dispatch(e)}).catch(r=>{const e=Pt(t,{error:r,isLoading:!1,data:null});n.dispatch(e)}),wt(t,{error:null,isLoading:!0,data:pt(`${t}.data`,n.getState(),null)},e,n)}var mt=t=>r=>e=>{if("@@FLAT_REDUX_ACTION"===e.type&&ht(e.Updater)){const n=t.getState();return r({...e,Updater:e.Updater(n,t)})}return r(e)};const jt="NO_LINK_CONNECT"!==ReactComponent,Et=t=>curry((r,e="NO_LINK_CONNECT")=>{const n=jt(e)?r:e;return t(jt(e)?(t,e)=>{const n=bt(r,e);return Object.entries(n).reduce((r,[e,n])=>({...r,[e]:pt(n,t)}),{})}:null,t=>({set:(...r)=>t(Pt(...r))}))(n)});e.d(r,"setState",(function(){return Pt})),e.d(r,"createStore",(function(){return xt})),e.d(r,"set",(function(){return Pt})),e.d(r,"get",(function(){return pt})),e.d(r,"link",(function(){return Et}));const Pt=(...t)=>({type:"@@FLAT_REDUX_ACTION",Updater:wt(...t)}),xt=(t={},r=[])=>{const e=c((t={},{type:r,Updater:e})=>"@@FLAT_REDUX_ACTION"===r?bt(e,t):t,t,function(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return function(t){return function(){var e=t.apply(void 0,arguments),n=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},u={getState:e.getState,dispatch:function(){return n.apply(void 0,arguments)}},o=r.map((function(t){return t(u)}));return s({},e,{dispatch:n=l.apply(void 0,o)(e.dispatch)})}}}(mt,...r));return e.set=(...t)=>{e.dispatch(Pt(...t))},e}}]);