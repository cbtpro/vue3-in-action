var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,r=(t,a,o)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[a]=o;import{c as s,a as n,b as c,d as m,r as d,e as l,f as i,t as p,F as u,w as b,p as f,g as h,h as v,i as _,o as g,j as E,V as y,k as j}from"./vendor.a96b9fac.js";const k=s({modules:{home:{namespaced:!0,state:((e,s)=>{for(var n in s||(s={}))a.call(s,n)&&r(e,n,s[n]);if(t)for(var n of t(s))o.call(s,n)&&r(e,n,s[n]);return e})({},{systemTime:Date.now()}),mutations:{},actions:{},getters:{}}}});let O;const V={},w=function(e,t){if(!t)return e();if(void 0===O){const e=document.createElement("link").relList;O=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in V)return;V[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":O,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))},D=[{path:"/",redirect:"/home",meta:{}},{path:"/home",name:"home",meta:{title:"主页"},component:()=>w((()=>import("./index.6553fd67.js")),["./assets/index.6553fd67.js","./assets/index.3acf2805.css","./assets/vendor.a96b9fac.js"])},{path:"/demo-list",name:"demo-list",meta:{title:"demo列表"},component:()=>w((()=>import("./index.fefafffe.js")),["./assets/index.fefafffe.js","./assets/index.ef290c6a.css","./assets/vendor.a96b9fac.js"])},{path:"/custom-map",name:"custom-map",meta:{title:"map"},component:()=>w((()=>import("./index.e674560b.js")),["./assets/index.e674560b.js","./assets/index.1a8be785.css","./assets/vendor.a96b9fac.js"])}];var P=n({history:c(),routes:D}),L=m({name:"HelloWorld",props:{msg:{type:String,required:!0}},setup:()=>({count:d(0)})});const I=b();f("data-v-b59f1cb0");const A=h('<p data-v-b59f1cb0> Recommended IDE setup: <a href="https://code.visualstudio.com/" target="_blank" data-v-b59f1cb0>VSCode</a> + <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" data-v-b59f1cb0> Vetur </a> or <a href="https://github.com/johnsoncodehk/volar" target="_blank" data-v-b59f1cb0>Volar</a> (if using <code data-v-b59f1cb0>&lt;script setup&gt;</code>) </p><p data-v-b59f1cb0>See <code data-v-b59f1cb0>README.md</code> for more information.</p><p data-v-b59f1cb0><a href="https://vitejs.dev/guide/features.html" target="_blank" data-v-b59f1cb0> Vite Docs </a> | <a href="https://v3.vuejs.org/" target="_blank" data-v-b59f1cb0>Vue 3 Docs</a></p>',3),R=i("p",null,[v(" Edit "),i("code",null,"components/HelloWorld.vue"),v(" to test hot module replacement. ")],-1);_();const S=I(((e,t,a,o,r,s)=>(g(),l(u,null,[i("h1",null,p(e.msg),1),A,i("button",{type:"button",onClick:t[1]||(t[1]=t=>e.count++)},"count is: "+p(e.count),1),R],64))));L.render=S,L.__scopeId="data-v-b59f1cb0";var x=m({name:"App",components:{HelloWorld:L}});x.render=function(e,t,a,o,r,s){const n=E("router-view");return g(),l(n)},new y({maxLogNumber:1e3});const T=j(x);T.use(k),T.use(P),T.mount("#app");
