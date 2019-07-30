// ==UserScript==
// @name         熊猫书签（阉割版）
// @namespace    https://ehpanda.github.io
// @description  zh-cn/
// @license      MIT
// @version      12
// @match        *.e-hentai.org/*
// @grant        none
// ==/UserScript==
(function(){
'use strict';
var a=document.createElement('script');a.src='//ehpanda.github.io/panda.js?'+parseInt(Date.parse(new Date())/600000);document.body.appendChild(a);
})();