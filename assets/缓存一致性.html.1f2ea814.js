import{_ as e,V as n,W as _,X as l}from"./framework.1bd1ad73.js";const t={},o=l("ul",null,[l("li",null,"❎先更数据库，再更缓存"),l("li",null,"❎先更缓存，再更数据库"),l("li",null,"❎先删缓存，再更数据库"),l("li",null,"✔️先更数据库，再删缓存: 理论上这种情况是会出现缓存不一致的情况，但是在实际中发生的概率很低。因为数据库操作远比缓存操作要慢。"),l("li",null,"解耦数据库操作、缓存操作"),l("li",null,"单独写个程序订阅mysql binglog，有数据变更时，删除对应的缓存")],-1),s=[o];function c(i,u){return n(),_("div",null,s)}const a=e(t,[["render",c],["__file","缓存一致性.html.vue"]]);export{a as default};
