(()=>{"use strict";class t{constructor(t){this.$el="string"==typeof t?document.querySelector(t):t}html(t){return"string"==typeof t?(this.$el.innerHTML=t,this):this.$el.outerHTML.trim()}text(t){return"string"==typeof t?(this.$el.textContent=t,this):"input"===this.$el.tagName.toLowerCase()?this.$el.value.trim():this.$el.textContent.trim()}append(e){return e instanceof t&&(e=e.$el),Element.prototype.append?this.$el.append(e):this.$el.appendChild(e),this}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}get data(){return this.$el.dataset}closest(t){return e(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}id(t){if(t){const t=this.id().split(":");return{row:+t[0],col:+t[1]}}return this.data.id}find(t){return e(this.$el.querySelector(t))}findAllSelectors(t){return this.$el.querySelectorAll(t)}focus(){return this.$el.focus(),this}addClass(t){return this.$el.classList.add(t),this}removeClass(t){return this.$el.classList.remove(t),this}css(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object.keys(t).forEach((e=>this.$el.style[e]=t[e]))}}function e(e){return new t(e)}e.create=function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const i=document.createElement(t);return n&&i.classList.add(n),e(i)};class n{constructor(){this.listeners={}}emit(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];return!!Array.isArray(this.listeners[t])&&(this.listeners[t].forEach((t=>{t(...n)})),!0)}subscribe(t,e){return this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e),()=>{this.listeners[t]=this.listeners[t].filter((t=>t!==e))}}}function i(t,e){return t>e&&([e,t]=[t,e]),new Array(e-t+1).fill("").map(((e,n)=>t+n))}class r{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t)throw new Error("No $root provided for DomListener");this.$root=t,this.listeners=e}initDomListeners(){this.listeners.forEach((t=>{const e=s(t);if(!this[e]){const t=this.name||"";throw new Error("Method ".concat(e," is not implemented in ").concat(t," component"))}this[e]=this[e].bind(this),this.$root.on(t,this[e])}))}removeDomListeners(){this.listeners.forEach((t=>{const e=s(t);this.$root.off(t,this[e])}))}}function s(t){return"on"+("string"!=typeof(e=t)?"":e.charAt(0).toLocaleUpperCase()+e.slice(1));var e}class o extends r{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};super(t,e.listeners),this.name=e.name||"",this.emitter=e.emitter,this.unsubscribers=[],this.prepare()}prepare(){}toHTML(){return""}$emit(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];this.emitter.emit(t,...n)}$on(t,e){const n=this.emitter.subscribe(t,e);this.unsubscribers.push(n)}init(){this.initDomListeners()}destroy(){this.removeDomListeners(),this.unsubscribers.forEach((t=>t()))}}class a extends o{constructor(t,e){super(t,{name:"Formula",listeners:["input","keydown"],...e})}toHTML(){return'\n      <div class="info">fx</div>\n      <div \n        id="formula" \n        class="input" \n        contenteditable \n        spellcheck="false"\n      ></div>\n    '}init(){super.init(),this.$formula=this.$root.find("#formula"),this.$on("table:select",(t=>{this.$formula.text(t.text())})),this.$on("table:input",(t=>{this.$formula.text(t.text())}))}onKeydown(t){["Enter","Tab"].includes(t.key)&&(t.preventDefault(),this.$emit("formula:done"))}onInput(t){this.$emit("formula:input",e(t.target).text())}}var c,l,u,h;c=a,u="excel__formula",(l="symbol"==typeof(h=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(l="className"))?h:h+"")in c?Object.defineProperty(c,l,{value:u,enumerable:!0,configurable:!0,writable:!0}):c[l]=u;class d extends o{constructor(t,e){super(t,{name:"Header",...e})}toHTML(){return'\n    <input class="input" type="text" value="Новая таблица"/>\n    <div>\n      <div class="button">\n        <i class="material-icons">delete</i>\n      </div>\n      <div class="button">\n        <i class="material-icons">exit_to_app</i>\n      </div>\n    </div>\n    '}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(d,"className","excel__header");const m=65,f=90;function p(t){return function(e,n){return' <div \n    class="cell" \n    contenteditable \n    data-col="'.concat(n,'"\n    data-type="cell"\n    data-id="').concat(t,":").concat(n,'"\n    ></div>')}}function v(t,e){return'\n    <div \n    class="column" \n    data-type="resizable" \n    data-col="'.concat(e,'"\n    >\n      ').concat(t,'\n      <div class="col-resize" data-resize="col"></div>\n    </div>\n    ')}function b(t,e){const n=t?'<div class="row-resize" data-resize="row"></div>':"";return'\n    <div class="row" data-type="resizable">\n        <div class="row-info">\n          '.concat(t||"","\n          ").concat(n,'\n        </div>\n        <div class="row-data">').concat(e,"</div>\n    </div>\n    ")}function y(t,e){return String.fromCharCode(m+e)}class g{constructor(){this.group=[],this.current=null}select(t){this.clear(),t.focus().addClass(g.className),this.group.push(t),this.current=t}clear(){this.group.forEach((t=>t.removeClass(g.className))),this.group=[]}selectGroup(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.clear(),this.group=t,this.group.forEach((t=>t.addClass(g.className)))}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(g,"className","selected");class w extends o{constructor(t,e){super(t,{name:"Table",listeners:["mousedown","keydown","input"],...e})}prepare(){this.selection=new g}toHTML(){return function(t){const e=f-m+1,n=[],i=new Array(e).fill("").map(y).map(v).join("");n.push(b(null,i));for(let t=0;t<10;t++){const i=new Array(e).fill("").map(p(t)).join("");n.push(b(t+1,i))}return n.join("")}()}selectCell(t){this.selection.select(t),this.$emit("table:select",t)}init(){super.init();const t=this.$root.find('[data-id="0:0"]');this.selectCell(t),this.$on("formula:input",(t=>{this.selection.current.text(t)})),this.$on("formula:done",(()=>{this.selection.current.focus()}))}onMousedown(t){if(function(t){return t.target.dataset.resize}(t))!function(t,n){const i=e(n.target),r=i.closest('[data-type="resizable"]'),s=r.getCoords(),o=i.data.resize,a="col"===o?"bottom":"right";let c;i.css({opacity:1,[a]:"-3000px"}),document.onmousemove=t=>{if("col"===o){const e=t.pageX-s.right;c=s.width+e;const n=40;c=Math.max(c,n);const r=s.width-n,o=Math.min(-e,r);i.css({right:"".concat(o,"px")})}else{const e=t.pageY-s.bottom;c=s.height+e;const n=20;c=Math.max(c,n);const r=s.height-n,o=Math.min(-e,r);i.css({bottom:"".concat(o,"px")})}},document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,"col"===o?(r.css({width:c+"px"}),t.findAllSelectors('[data-col="'.concat(r.data.col,'"]')).forEach((t=>t.style.width=c+"px"))):r.css({height:c+"px"}),i.css({opacity:0,right:0,bottom:0})}}(this.$root,t);else if(function(t){return"cell"===t.target.dataset.type}(t)){const n=e(t.target);if(t.shiftKey){const t=function(t,e){const n=t.id(!0),r=e.id(!0),s=i(r.col,n.col),o=i(r.row,n.row);return s.reduce(((t,e)=>(o.forEach((n=>t.push("".concat(n,":").concat(e)))),t)),[])}(n,this.selection.current).map((t=>this.$root.find('[data-id="'.concat(t,'"]'))));this.selection.selectGroup(t)}else this.selection.select(n)}}onKeydown(t){const{key:e,shiftKey:n}=t;if(["Enter","Tab","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&!n){t.preventDefault();const n=this.selection.current.id(!0),i=this.$root.find(function(t,e){let{row:n,col:i}=e;const r=f-m;switch(t){case"Enter":case"ArrowDown":n=n+1>9?9:n+1;break;case"Tab":case"ArrowRight":i=i+1>r?25:i+1;break;case"ArrowLeft":i=i-1<0?0:i-1;break;case"ArrowUp":n=n-1<0?0:n-1}return'[data-id="'.concat(n,":").concat(i,'"]')}(e,n));this.selectCell(i)}}onInput(t){this.$emit("table:input",e(t.target))}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(w,"className","excel__table");class $ extends o{constructor(t,e){super(t,{name:"Toolbar",listeners:["click"],...e})}toHTML(){return'\n    <div class="button">\n      <i class="material-icons">format_align_left</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_align_center</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_align_right</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_bold</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_italic</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_underlined</i>\n    </div>\n    '}onClick(t){console.log(t.target)}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}($,"className","excel__toolbar"),new class{constructor(t,i){this.$el=e(t),this.components=i.components||[],this.emitter=new n}getRoot(){const t=e.create("div","excel"),n={emitter:this.emitter};return this.components=this.components.map((i=>{const r=e.create("div",i.className),s=new i(r,n);return r.html(s.toHTML()),t.append(r),s})),t}render(){this.$el.append(this.getRoot()),this.components.forEach((t=>t.init()))}destroy(){this.components.forEach((t=>t.destroy()))}}("#app",{components:[d,$,a,w]}).render()})();