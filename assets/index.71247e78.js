import{u as e}from"./index.cf28c33e.js";import{e as s,m as t,o,f as r,t as a}from"./vendor.10860888.js";var m=s({name:"demo-list",setup(){const s=e(),o=t();return{store:s,handler(){o.push({path:"/home"})}}}});(m.__cssModules={}).$style={"demo-list":"_demo-list_12xui_2"},m.render=function(e,s,t,m,d,l){return o(),r("div",{class:[e.$style["demo-list"]],onClick:s[1]||(s[1]=(...s)=>e.handler&&e.handler(...s))},"demo-list"+a(e.store.state.home.systemTime),3)};export default m;
