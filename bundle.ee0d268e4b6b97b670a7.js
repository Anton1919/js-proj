(()=>{"use strict";class t{constructor(t){this.$el="string"==typeof t?document.querySelector(t):t}html(t){return"string"==typeof t?(this.$el.innerHTML=t,this):this.$el.outerHTML.trim()}text(t){return"string"==typeof t?(this.$el.textContent=t,this):"input"===this.$el.tagName.toLowerCase()?this.$el.value.trim():this.$el.textContent.trim()}append(e){return e instanceof t&&(e=e.$el),Element.prototype.append?this.$el.append(e):this.$el.appendChild(e),this}clear(){return this.html(""),this}on(t,e){this.$el.addEventListener(t,e)}off(t,e){this.$el.removeEventListener(t,e)}get data(){return this.$el.dataset}closest(t){return e(this.$el.closest(t))}getCoords(){return this.$el.getBoundingClientRect()}id(t){if(t){const t=this.id().split(":");return{row:+t[0],col:+t[1]}}return this.data.id}find(t){return e(this.$el.querySelector(t))}findAllSelectors(t){return this.$el.querySelectorAll(t)}focus(){return this.$el.focus(),this}addClass(t){return this.$el.classList.add(t),this}removeClass(t){return this.$el.classList.remove(t),this}css(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object.keys(t).forEach((e=>this.$el.style[e]=t[e]))}}function e(e){return new t(e)}e.create=function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";const r=document.createElement(t);return n&&r.classList.add(n),e(r)};class n{constructor(){this.listeners={}}emit(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return!!Array.isArray(this.listeners[t])&&(this.listeners[t].forEach((t=>{t(...n)})),!0)}subscribe(t,e){return this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e),()=>{this.listeners[t]=this.listeners[t].filter((t=>t!==e))}}}function r(t,e){return t>e&&([e,t]=[t,e]),new Array(e-t+1).fill("").map(((e,n)=>t+n))}function i(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e)return JSON.parse(localStorage.getItem(t));localStorage.setItem(t,JSON.stringify(e))}class s{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t)throw new Error("No $root provided for DomListener");this.$root=t,this.listeners=e}initDomListeners(){this.listeners.forEach((t=>{const e=o(t);if(!this[e]){const t=this.name||"";throw new Error("Method ".concat(e," is not implemented in ").concat(t," component"))}this[e]=this[e].bind(this),this.$root.on(t,this[e])}))}removeDomListeners(){this.listeners.forEach((t=>{const e=o(t);this.$root.off(t,this[e])}))}}function o(t){return"on"+("string"!=typeof(e=t)?"":e.charAt(0).toLocaleUpperCase()+e.slice(1));var e}class a extends s{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};super(t,e.listeners),this.name=e.name||"",this.emitter=e.emitter,this.unsubscribers=[],this.store=e.store,this.storeSub=null,this.prepare()}prepare(){}toHTML(){return""}$emit(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];this.emitter.emit(t,...n)}$on(t,e){const n=this.emitter.subscribe(t,e);this.unsubscribers.push(n)}$dispatch(t){this.store.dispatch(t)}$subscribe(t){this.storeSub=this.store.subscribe(t)}init(){this.initDomListeners()}destroy(){this.removeDomListeners(),this.unsubscribers.forEach((t=>t())),this.storeSub.unsubscribe()}}class c extends a{constructor(t,e){super(t,{name:"Formula",listeners:["input","keydown"],...e})}toHTML(){return'\n      <div class="info">fx</div>\n      <div \n        id="formula" \n        class="input" \n        contenteditable \n        spellcheck="false"\n      ></div>\n    '}init(){super.init(),this.$formula=this.$root.find("#formula"),this.$on("table:select",(t=>{this.$formula.text(t.text())})),this.$subscribe((t=>{this.$formula.text(t.currentText)}))}onKeydown(t){["Enter","Tab"].includes(t.key)&&(t.preventDefault(),this.$emit("formula:done"))}onInput(t){this.$emit("formula:input",e(t.target).text())}}var l,u,h,d;l=c,h="excel__formula",(u="symbol"==typeof(d=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(u="className"))?d:d+"")in l?Object.defineProperty(l,u,{value:h,enumerable:!0,configurable:!0,writable:!0}):l[u]=h;class f extends a{constructor(t,e){super(t,{name:"Header",...e})}toHTML(){return'\n    <input class="input" type="text" value="Новая таблица"/>\n    <div>\n      <div class="button">\n        <i class="material-icons">delete</i>\n      </div>\n      <div class="button">\n        <i class="material-icons">exit_to_app</i>\n      </div>\n    </div>\n    '}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(f,"className","excel__header");const p={A:65,Z:90},m=120,v=24;function b(t,e){return(t[e]||m)+"px"}function y(t,e){return function(n,r){const i="".concat(e,":").concat(r),s=b(t.colState,r),o=t.dataState[i]||"";return'\n      <div \n        class="cell" \n        contenteditable \n        data-col="'.concat(r,'"\n        data-type="cell"\n        data-id="').concat(i,'"\n        style="width: ').concat(s,'"\n      >\n        ').concat(o,"\n      </div>")}}function g(t){let{col:e,index:n,width:r}=t;return'\n    <div \n    class="column" \n    data-type="resizable" \n    data-col="'.concat(n,'"\n    style="width: ').concat(r,'"\n    >\n      ').concat(e,'\n      <div class="col-resize" data-resize="col"></div>\n    </div>\n    ')}function w(t,e,n){const r=t?'<div class="row-resize" data-resize="row"></div>':"",i=function(t,e){return(t[e]||v)+"px"}(n,t);return'\n    <div \n      class="row" \n      data-type="resizable" \n      data-row="'.concat(t,'"\n      style="height: ').concat(i,'"\n    >\n     <div class="row-info">\n       ').concat(t||"","\n       ").concat(r,'\n     </div>\n       <div class="row-data">').concat(e,"</div>\n    </div>\n    ")}function $(t,e){return String.fromCharCode(p.A+e)}class x{constructor(){this.group=[],this.current=null}select(t){this.clear(),t.focus().addClass(x.className),this.group.push(t),this.current=t}clear(){this.group.forEach((t=>t.removeClass(x.className))),this.group=[]}selectGroup(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.clear(),this.group=t,this.group.forEach((t=>t.addClass(x.className)))}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(x,"className","selected");const S="TABLE_RESIZE",E="CHANGE_TEXT";class T extends a{constructor(t,e){super(t,{name:"Table",listeners:["mousedown","keydown","input"],...e})}prepare(){this.selection=new x}toHTML(){return function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=p.Z-p.A+1,r=[],i=new Array(n).fill("").map($).map(function(t){return function(e,n){return{col:e,index:n,width:b(t.colState,n)}}}(e)).map(g).join("");r.push(w(null,i,{}));for(let i=0;i<t;i++){const t=new Array(n).fill("").map(y(e,i)).join("");r.push(w(i+1,t,e.rowState))}return r.join("")}(10,this.store.getState())}selectCell(t){this.selection.select(t),this.$emit("table:select",t),this.$dispatch({type:"TEST"})}init(){super.init();const t=this.$root.find('[data-id="0:0"]');this.selectCell(t),this.$on("formula:input",(t=>{this.selection.current.text(t),this.updateTextInStore(t)})),this.$on("formula:done",(()=>{this.selection.current.focus()}))}async resizeTable(t){try{const n=await function(t,n){return new Promise((r=>{const i=e(n.target),s=i.closest('[data-type="resizable"]'),o=s.getCoords(),a=i.data.resize,c="col"===a?"bottom":"right";let l;i.css({opacity:1,[c]:"-3000px"}),document.onmousemove=t=>{if("col"===a){const e=t.pageX-o.right;l=o.width+e;const n=40;l=Math.max(l,n);const r=o.width-n,s=Math.min(-e,r);i.css({right:"".concat(s,"px")})}else{const e=t.pageY-o.bottom;l=o.height+e;const n=20;l=Math.max(l,n);const r=o.height-n,s=Math.min(-e,r);i.css({bottom:"".concat(s,"px")})}},document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,"col"===a?(s.css({width:l+"px"}),t.findAllSelectors('[data-col="'.concat(s.data.col,'"]')).forEach((t=>t.style.width=l+"px"))):s.css({height:l+"px"}),r({value:l,type:a,id:s.data[a]}),i.css({opacity:0,right:0,bottom:0})}}))}(this.$root,t);this.$dispatch(function(t){return{type:S,data:t}}(n))}catch(t){console.warn(t.message)}}onMousedown(t){if(function(t){return t.target.dataset.resize}(t))this.resizeTable(t);else if(function(t){return"cell"===t.target.dataset.type}(t)){const n=e(t.target);if(t.shiftKey){const t=function(t,e){const n=t.id(!0),i=e.id(!0),s=r(i.col,n.col),o=r(i.row,n.row);return s.reduce(((t,e)=>(o.forEach((n=>t.push("".concat(n,":").concat(e)))),t)),[])}(n,this.selection.current).map((t=>this.$root.find('[data-id="'.concat(t,'"]'))));this.selection.selectGroup(t)}else this.selectCell(n)}}onKeydown(t){const{key:e,shiftKey:n}=t;if(["Enter","Tab","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e)&&!n){t.preventDefault();const n=this.selection.current.id(!0),r=this.$root.find(function(t,e){let{row:n,col:r}=e;const i=p.Z-p.A;switch(t){case"Enter":case"ArrowDown":n=n+1>9?9:n+1;break;case"Tab":case"ArrowRight":r=r+1>i?25:r+1;break;case"ArrowLeft":r=r-1<0?0:r-1;break;case"ArrowUp":n=n-1<0?0:n-1}return'[data-id="'.concat(n,":").concat(r,'"]')}(e,n));this.selectCell(r)}}updateTextInStore(t){var e;this.$dispatch((e={id:this.selection.current.id(),value:t},{type:E,data:e}))}onInput(t){this.updateTextInStore(e(t.target).text())}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(T,"className","excel__table");class A extends a{constructor(t,e){super(t,{name:"Toolbar",listeners:["click"],...e})}toHTML(){return'\n    <div class="button">\n      <i class="material-icons">format_align_left</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_align_center</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_align_right</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_bold</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_italic</i>\n    </div>\n    <div class="button">\n      <i class="material-icons">format_underlined</i>\n    </div>\n    '}onClick(t){console.log(t.target)}}!function(t,e,n){e=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:e+""}(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}(A,"className","excel__toolbar");const _="excel-state",L=function(t){let e=t({...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}},{type:"__INIT__"}),n=[];return{subscribe:t=>(n.push(t),{unsubscribe(){n=n.filter((e=>e!==t))}}),dispatch(r){e=t(e,r),n.forEach((t=>t(e)))},getState:()=>e}}((function(t,e){let n,r;switch(e.type){case S:return r="col"===e.data.type?"colState":"rowState",n=t[r]||{},n[e.data.id]=e.data.value,{...t,[r]:n};case E:return n=t.dataState||{},n[e.data.id]=e.data.value,{...t,currentText:e.data.value,dataState:n};default:return t}}),i(_)?i(_):{colState:{},rowState:{},dataState:{},currentText:""});L.subscribe((t=>{console.log("App state",t),i(_,t)})),new class{constructor(t,r){this.$el=e(t),this.components=r.components||[],this.emitter=new n,this.store=r.store}getRoot(){const t=e.create("div","excel"),n={emitter:this.emitter,store:this.store};return this.components=this.components.map((r=>{const i=e.create("div",r.className),s=new r(i,n);return i.html(s.toHTML()),t.append(i),s})),t}render(){this.$el.append(this.getRoot()),this.components.forEach((t=>t.init()))}destroy(){this.components.forEach((t=>t.destroy()))}}("#app",{components:[f,A,c,T],store:L}).render()})();