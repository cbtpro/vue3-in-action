import{d as e,u as s,l as t,o,e as d,t as r}from"./vendor.dd946b5b.js";var a=e({name:"demo-list",setup(){const e=s(),o=t();return{store:e,handler(){o.push({path:"/home"})}}}});(a.__cssModules={}).$style={"demo-list":"_demo-list_1uyho_3"},a.render=function(e,s,t,a,l,m){return o(),d("div",{class:[e.$style["demo-list"]],onClick:s[1]||(s[1]=(...s)=>e.handler&&e.handler(...s))},"demo-list"+r(e.store.state.home.systemTime),3)};export default a;