(()=>{"use strict";class t{constructor(t){this.$el="string"==typeof t?document.querySelector(t):t}html(t){return"string"==typeof t?(this.$el.innerHTML=t,this):this.$el.outerHTML.trim()}append(e){return e instanceof t&&(e=e.$el),Element.prototype.append?this.$el.append(e):this.$el.appendChild(e),this}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}get data(){return this.$el.dataset}closest(t){return e(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}findAllSelectors(t){return this.$el.querySelectorAll(t)}}function e(e){return new t(e)}e.create=function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const i=document.createElement(t);return n&&i.classList.add(n),e(i)};class n{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t)throw new Error("No $root provided for DomListener");this.$root=t,this.listeners=e}initDomListeners(){this.listeners.forEach((t=>{const e=i(t);if(!this[e]){const t=this.name||"";throw new Error("Method ".concat(e," is not implemented in ").concat(t," component"))}this[e]=this[e].bind(this),this.$root.on(t,this[e])}))}removeDomListeners(){this.listeners.forEach((t=>{const e=i(t);this.$root.off(t,this[e])}))}}function i(t){return"on"+("string"!=typeof(e=t)?"":e.charAt(0).toLocaleUpperCase()+e.slice(1));var e}class o extends n{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};super(t,e.listeners),this.name=e.name||""}toHTML(){return""}init(){this.initDomListeners()}destroy(){this.removeDomListeners()}}class r extends o{constructor(t){super(t,{name:"Formula",listeners:["input","click"]})}toHTML(){return'\n      <div class="info">fx</div>\n      <div class="input" contenteditable spellcheck="false"></div>\n    '}onInput(t){console.log("Formula: onInput",t)}onClick(){console.log("click")}}var s,a,l,c;s=r,l="excel__formula",(a="symbol"==typeof(c=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(a="className"))?c:c+"")in s?Object.defineProperty(s,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):s[a]=l;class u extends o{toHTML(){return'\n    <input class="input" type="text" value="Новая таблица"/>\n    <div>\n      <div class="button">\n        <i class="material-icons">delete</i>\n      </div>\n      <div class="button">\n        <i class="material-icons">exit_to_app</i>\n      </div>\n    </div>\n    '}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(u,"className","excel__header");const d=65,m=90;function v(t,e){return'\n    <div class="cell" contenteditable data-col="'.concat(e,'"></div>\n    ')}function f(t,e){return'\n    <div class="column" data-type="resizable" data-col="'.concat(e,'">\n      ').concat(t,'\n      <div class="col-resize" data-resize="col"></div>\n    </div>\n    ')}function p(t,e){const n=t?'<div class="row-resize" data-resize="row"></div>':"";return'\n    <div class="row" data-type="resizable">\n        <div class="row-info">\n          '.concat(t||"","\n          ").concat(n,'\n        </div>\n        <div class="row-data">').concat(e,"</div>\n    </div>\n    ")}function h(t,e){return String.fromCharCode(d+e)}class b extends o{constructor(t){super(t,{listeners:["mousedown"]})}toHTML(){return function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;const e=m-d+1,n=[],i=new Array(e).fill("").map(h).map(f).join("");n.push(p(null,i));for(let i=0;i<t;i++){const t=new Array(e).fill("").map(v).join("");n.push(p(i+1,t))}return n.join("")}(10)}onMousedown(t){if(t.target.dataset.resize){const n=e(t.target),i=n.closest('[data-type="resizable"]'),o=i.getCoords(),r=n.data.resize,s=this.$root.findAllSelectors('[data-col="'.concat(i.data.col,'"]'));document.onmousemove=t=>{if("col"===r){const e=t.pageX-o.right,n=o.width+e;i.$el.style.width=n+"px",s.forEach((t=>t.style.width=n+"px"))}else{const e=t.pageY-o.bottom,n=o.height+e;i.$el.style.height=n+"px"}},document.onmouseup=()=>{document.onmousemove=null}}}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(b,"className","excel__table");class y extends o{constructor(t){super(t,{name:"Toolbar",listeners:["click"]})}toHTML(){return'\n    <div class="button">\n      <i class="material-icons">format_align_left</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_align_center</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_align_right</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_bold</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_italic</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_underlined</i>\n    </div>\n    '}onClick(t){console.log(t.target)}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(y,"className","excel__toolbar"),new class{constructor(t,n){this.$el=e(t),this.components=n.components||[]}getRoot(){const t=e.create("div","excel");return this.components=this.components.map((n=>{const i=e.create("div",n.className),o=new n(i);return o.name&&(window["c"+o.name]=o),i.html(o.toHTML()),t.append(i),o})),t}render(){this.$el.append(this.getRoot()),this.components.forEach((t=>t.init()))}}("#app",{components:[u,y,r,b]}).render()})();