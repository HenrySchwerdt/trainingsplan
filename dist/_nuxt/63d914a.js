(window.webpackJsonp=window.webpackJsonp||[]).push([[24,13],{399:function(t,e,n){"use strict";n.r(e);n(26);var l={props:{trainingPlanId:{type:String,default:"Test"},userName:{type:String,default:"TestUser"},trainingPlanName:{type:String,default:"BA Tests"},percentage:{type:Number,default:20},createdAt:{default:"8.8.21"},size:{default:100}},computed:{series:function(){return[this.percentage,100-this.percentage]},options:function(){var t={plotOptions:{pie:{customScale:1,donut:{size:"0%"}}},fill:{colors:this.percentage>=100?["#200A58","#200A58"]:["#A82465","#b3668d"]},legend:{show:!1},dataLabels:{enabled:!1},markers:{enabled:!1},subtitle:{enabled:!1},tooltip:{enabled:!1},stroke:{show:!1},states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"none",value:.15}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"none",value:.35}}}};return t}}},r=n(71),c=n(88),o=n.n(c),d=n(175),h=n(49),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{height:"150px",width:"150px",cursor:"pointer"},on:{click:function(e){return t.$router.push("/app/trainingsplan/"+t.trainingPlanId)}}},[n("v-sheet",{staticClass:"d-flex justify-center align-center",staticStyle:{width:"100%",height:"100%",overflow:"hidden"},attrs:{elevation:"5",rounded:"",height:"150",width:"150",color:this.percentage>=100?"#200A58":"#A82465"}},[n("div",{staticStyle:{width:"100%",height:"100%"}},[this.percentage<100?n("div",{staticClass:"d-flex justify-center align-center",staticStyle:{width:"100%",height:"100%"}},[n("apexchart",{attrs:{width:"100%",height:"100%",type:"donut",options:t.options,series:t.series}})],1):n("div",{staticClass:"d-flex justify-center align-center",staticStyle:{width:"100%",height:"100%"}},[n("v-icon",{staticStyle:{"font-size":"280px"},attrs:{color:"#5f4c8f"}},[t._v("\n          mdi-check-bold\n        ")])],1)]),t._v(" "),n("div",{staticStyle:{position:"absolute","max-width":"150px","max-height":"150px","text-align":"center","text-overflow":"ellipsis",overflow:"hidden","white-space":"-o-pre-wrap","/* CSS3 */   \n white-space":"-moz-pre-wrap","word-wrap":"break-word"}},[n("div",{staticClass:"text-h5",staticStyle:{color:"white"}},[t._v("\n        "+t._s(t.trainingPlanName)+"\n      ")]),t._v(" "),n("div",{staticClass:"text-caption",staticStyle:{color:"white"}},[t._v("\n        by "),n("span",[t._v(t._s(t.userName))])])])])],1)}),[],!1,null,null,null);e.default=component.exports;o()(component,{VIcon:d.a,VSheet:h.a})},513:function(t,e,n){"use strict";n.r(e);var l={computed:{plans:{get:function(){return this.$store.getters["plans/getAllPlans"]}}},methods:{}},r=n(71),c=n(88),o=n.n(c),d=n(501),h=n(502),v=n(371),f=n(492),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{staticClass:"mt-12",attrs:{justify:"center",align:"center"}},[n("v-col",{staticClass:"mt-10",attrs:{cols:"12",sm:"1",md:"8"}},[n("div",{staticClass:"d-flex flex-row",staticStyle:{width:"100%"}},[n("v-spacer"),t._v(" "),n("v-spacer"),t._v(" "),n("v-spacer"),t._v(" "),n("v-text-field",{attrs:{label:"Search user or plans","append-icon":"mdi-magnify"}})],1),t._v(" "),t.plans.length<=0?n("div",{staticClass:"text-caption",staticStyle:{"text-align":"center",width:"100%"}},[t._v("\n        No trainingplans found...\n      ")]):t._e(),t._v(" "),n("div",{staticStyle:{display:"grid","grid-template-columns":"repeat(auto-fill, 150px)","justify-content":"space-between","grid-gap":"15px",width:"100%"}},t._l(t.plans,(function(e,l){return n("div",{key:l},[n("training-plan-link",{attrs:{trainingPlanId:e.id,userName:e.created_by_name,trainingPlanName:e.title,percentage:e.percentange,createdAt:e.created_at}}),t._v(" "),n("br")],1)})),0)])],1)],1)}),[],!1,null,null,null);e.default=component.exports;o()(component,{TrainingPlanLink:n(399).default}),o()(component,{VCol:d.a,VRow:h.a,VSpacer:v.a,VTextField:f.a})}}]);