define(["@grafana/data","react","@grafana/ui"],((e,t,r)=>(()=>{"use strict";var n={781:t=>{t.exports=e},7:e=>{e.exports=r},959:e=>{e.exports=t}},a={};function o(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return n[e](r,r.exports,o),r.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return(()=>{o.r(s),o.d(s,{plugin:()=>S});var e=o(781),t=o(959),r=o.n(t),n=o(7);function a(t){return t&&t.length?(0,e.toCSV)(t.map((t=>(0,e.toDataFrame)(t)))):""}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){i(e,t,r[t])}))}return e}function l(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}class u extends t.PureComponent{componentDidMount(){const{options:e}=this.props;if(e.jsonData.data){const t=a(e.jsonData.data);this.setState({text:t})}}render(){const{text:e}=this.state;return r().createElement("div",null,r().createElement("div",{className:"gf-form-group"},r().createElement("h4",null,"Shared Data:"),r().createElement("span",null,"Enter CSV"),r().createElement(n.TableInputCSV,{text:e,onSeriesParsed:this.onSeriesParsed,width:"100%",height:200})),r().createElement("div",{className:"grafana-info-box"},"This data is stored in the datasource json and is returned to every user in the initial request for any datasource. This is an appropriate place to enter a few values. Large datasets will perform better in other datasources.",r().createElement("br",null),r().createElement("br",null),r().createElement("b",null,"NOTE:")," Changes to this data will only be reflected after a browser refresh."))}constructor(...t){super(...t),i(this,"state",{text:""}),i(this,"onSeriesParsed",((t,r)=>{const{options:n,onOptionsChange:a}=this.props;t||(t=[new e.MutableDataFrame]);const o=l(c({},n.jsonData),{data:t});a(l(c({},n),{jsonData:o})),this.setState({text:r})}))}}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){d(e,t,r[t])}))}return e}function f(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}class b extends e.DataSourceApi{getQueryDisplayText(e){return e.data?"Panel Data: "+y(e.data):`Shared Data From: ${this.name} (${y(this.data)})`}metricFindQuery(e,t){return new Promise(((e,t)=>{const r=[];for(const e of this.data)for(const t of e.fields)r.push({text:t.name});e(r)}))}query(t){const r=[];for(const n of t.targets){if(n.hide)continue;let t=this.data;n.data&&(t=n.data.map((t=>(0,e.toDataFrame)(t))));for(let e=0;e<t.length;e++)r.push(f(p({},t[e]),{refId:n.refId}))}return Promise.resolve({data:r})}testDatasource(){return new Promise(((e,t)=>{let r=0,n=`${this.data.length} Series:`;for(const e of this.data){const t=e.length;n+=` [${e.fields.length} Fields, ${t} Rows]`,r+=t}r>0&&e({status:"success",message:n}),t({status:"error",message:"No Data Entered"})}))}constructor(t){super(t),d(this,"data",[]),t.jsonData.data&&(this.data=t.jsonData.data.map((t=>(0,e.toDataFrame)(t))))}}function h(e){return e&&e.fields&&e.fields.length?"length"in e?e.length:e.fields[0].values.length:0}function y(e){if(!e||!e.length)return"";if(e.length>1){const t=e.reduce(((e,t)=>e+h(t)),0);return`${e.length} Series, ${t} Rows`}const t=e[0];if(!t.fields)return"Missing Fields";const r=h(t);return`${t.fields.length} Fields, ${r} Rows`}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){g(e,t,r[t])}))}return e}function m(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}const j=[{value:"panel",label:"Panel",description:"Save data in the panel configuration."},{value:"shared",label:"Shared",description:"Save data in the shared datasource object."}];class P extends t.PureComponent{onComponentDidMount(){const{query:e}=this.props,t=a(e.data);this.setState({text:t})}render(){const{datasource:e,query:t}=this.props,{uid:a,name:o}=e,{text:s}=this.state,i=t.data?j[0]:j[1];return r().createElement("div",null,r().createElement(n.InlineField,{label:"Data",labelWidth:8},r().createElement(r().Fragment,null,r().createElement(n.Select,{width:20,options:j,value:i,onChange:this.onSourceChange}),t.data?r().createElement("div",{style:{alignSelf:"center"}},y(t.data)):r().createElement(n.LinkButton,{fill:"text",href:`datasources/edit/${a}/`},o,": ",y(e.data),"   ",r().createElement(n.Icon,{name:"pen"})))),t.data&&r().createElement(n.TableInputCSV,{text:s,onSeriesParsed:this.onSeriesParsed,width:"100%",height:200}))}constructor(...t){super(...t),g(this,"state",{text:""}),g(this,"onSourceChange",(t=>{const{datasource:r,query:n,onChange:a,onRunQuery:o}=this.props;let s;if("panel"===t.value){if(n.data)return;s=[...r.data],s||(s=[new e.MutableDataFrame]),this.setState({text:(0,e.toCSV)(s)})}a(m(O({},n),{data:s})),o()})),g(this,"onSeriesParsed",((t,r)=>{const{query:n,onChange:a,onRunQuery:o}=this.props;this.setState({text:r}),t||(t=[new e.MutableDataFrame]),a(m(O({},n),{data:t})),o()}))}}const S=new e.DataSourcePlugin(b).setConfigEditor(u).setQueryEditor(P)})(),s})()));
//# sourceMappingURL=module.js.map