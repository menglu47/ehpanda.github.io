function panda_loadpage(gid,token,numb,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://e-hentai.org/g/'+gid+'/'+token+'/?p='+(numb-1),true);
xhr.onerror=function(){if(confirm(panda_lang_a001)){panda_loadpage(gid,token,numb,exec);}else{panda_lock=false;}};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var prev=document.getElementsByClassName('ths')[1].innerHTML=='Normal'?this.responseText.match(/<div class="gdtm"(.*?)>(.*?)https:\/\/e-hentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g):this.responseText.match(/<div class="gdtl"(.*?)>(.*?)https:\/\/e-hentai\.org\/s\/(\w+)\/(\d+)-(\d+)(.*?)<\/div>/g);
var info={};
prev.forEach(function(value){var preg=value.match(/https:\/\/e-hentai\.org\/s\/(\w+)\/(\d+)-(\d+)/);info[preg[3]]=preg[1];});
exec(info);
}};
xhr.send(null);
};
function panda_loadfile(gid,numb,hash,adds,exec){
var xhr=new XMLHttpRequest();
xhr.open('GET','https://e-hentai.org/s/'+hash+'/'+gid+'-'+numb+'?'+adds,true);
xhr.onerror=function(){exec(null);};
xhr.onreadystatechange=function(){if(this.readyState===4 && this.status===200){
var html=this.responseText;
var info={};
info.numb=numb;
info.hash=hash;
info.show=html.match(/id="img" src="(.*?)"/)[1];
info.full=html.match(/href="(https:\/\/e-hentai\.org\/fullimg.php(.*?))"/)?html.match(/href="(https:\/\/e-hentai\.org\/fullimg.php(.*?))"/)[1].replace(/\&amp;/g,'\&'):info.show;
info.adds=adds+'&nl='+html.match(/onclick="return nl\(\'(.*?)\'\)"/)[1];
exec(info);
}};
xhr.send(null);
};
function panda_showlist(){
var panda_filefrom=parseInt(document.getElementById('panda_filefrom').value);
var panda_filefinl=parseInt(document.getElementById('panda_filefinl').value);
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
if(!panda_filefrom || panda_filefrom<0){panda_filefrom=1;};
if(!panda_filefinl || panda_filefinl>panda_fileqnty){panda_filefinl=panda_fileqnty;};
if(panda_filefrom>panda_filefinl){alert(panda_lang_a002);return;};
document.getElementById('panda_filefrom').title=panda_filefrom;
document.getElementById('panda_filefinl').title=panda_filefinl;
var panda_pageconf=document.getElementsByClassName('ths');
var panda_pageqnty=parseInt(panda_pageconf[0].innerHTML)*(panda_pageconf[1].innerHTML=='Normal'?10:5);
var panda_pagefrom=Math.ceil(panda_filefrom/panda_pageqnty);
var panda_pagefinl=Math.ceil(panda_filefinl/panda_pageqnty);
var panda_hashmaps={};
for(var numb=panda_pagefrom;numb<=panda_pagefinl;numb++){
panda_loadpage(gid,token,numb,function(info){
panda_hashmaps=Object.assign(panda_hashmaps,info);
if(Math.ceil(Object.keys(panda_hashmaps).length/panda_pageqnty)==(panda_pagefinl-panda_pagefrom+1)){
document.getElementById('panda_list').innerHTML='';
document.getElementById('panda_prev').style.display='';
document.getElementById('panda_next').style.display='';
document.getElementById('panda_dock').style.display='';
document.getElementById('panda_plus').scrollIntoView();
for(var numb=panda_filefrom;numb<=panda_filefinl;numb++){
document.getElementById('panda_list').innerHTML+='<img id="panda_file_'+numb+'" src="" alt="" style="display:block;margin:4px auto;max-width:100%;min-width:100px;min-height:100px;background:#000;" onclick="panda_showfile('+numb+',\''+panda_hashmaps[numb]+'\',this.alt);" />';
document.getElementById('panda_file_'+numb).click();
};
};
});
};
};
function panda_showfile(numb,hash,adds){
panda_loadfile(gid,numb,hash,adds,function(info){
if(!info){return;};
var file=document.getElementById('panda_file_'+info.numb);
file.src=document.cookie.match(/panda_origin=true/)?info.full:info.show;
file.alt=info.adds;
});
};
function panda_showprev(){
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
var panda_readfrom=parseInt(document.getElementById('panda_filefrom').title);
var panda_readfinl=parseInt(document.getElementById('panda_filefinl').title);
if(panda_readfrom==1){alert(panda_lang_a003);return;};
var panda_readqnty=prompt(panda_lang_q001,panda_readfinl-panda_readfrom+1);
if(!panda_readqnty && panda_readqnty!==''){return;};
panda_readqnty=parseInt(panda_readqnty);
if(!panda_readqnty || panda_readqnty<0){panda_readqnty=panda_fileqnty;};
var panda_filefrom=panda_readfrom-panda_readqnty;
var panda_filefinl=panda_readfrom-1;
if(panda_filefrom<1){panda_filefrom=1;};
document.getElementById('panda_filefrom').value=panda_filefrom;
document.getElementById('panda_filefinl').value=panda_filefinl;
panda_showlist();
};
function panda_shownext(){
var panda_fileqnty=parseInt(document.getElementById('panda_fileqnty').title);
var panda_readfrom=parseInt(document.getElementById('panda_filefrom').title);
var panda_readfinl=parseInt(document.getElementById('panda_filefinl').title);
if(panda_readfinl==panda_fileqnty){alert(panda_lang_a003);return;};
var panda_readqnty=prompt(panda_lang_q001,panda_readfinl-panda_readfrom+1);
if(!panda_readqnty && panda_readqnty!==''){return;};
panda_readqnty=parseInt(panda_readqnty);
if(!panda_readqnty || panda_readqnty<0){panda_readqnty=panda_fileqnty;};
var panda_filefrom=panda_readfinl+1;
var panda_filefinl=panda_readfinl+panda_readqnty;
if(panda_filefinl>panda_fileqnty){panda_filefinl=panda_fileqnty;};
document.getElementById('panda_filefrom').value=panda_filefrom;
document.getElementById('panda_filefinl').value=panda_filefinl;
panda_showlist();
};
function panda_plusfunc(){
var navi=document.getElementsByClassName('gpc')[0].innerHTML.match(/Showing ([\d,]+) - ([\d,]+) of ([\d,]+) images/);
var code=document.createElement('div');
code.innerHTML='<div id="panda_plus" class="gm" style="text-align:center;"><h3>'+panda_lang_p001+'&nbsp;<input id="panda_filefrom" style="width:50px;" value="'+navi[1].replace(/,/g,'')+'" />&nbsp;<span id="panda_fileqnty" title="'+navi[3].replace(/,/g,'')+'">-</span>&nbsp;<input id="panda_filefinl" size="3" style="width:50px;" value="'+navi[2].replace(/,/g,'')+'" />&nbsp;&nbsp;'+panda_lang_p002+'&nbsp;<input id="panda_size" style="width:50px;" value="'+panda_width+'" onmouseout="panda_width=parseInt(document.getElementById(\'panda_size\').value);document.cookie=\'panda_width=\'+panda_width+\';path=/;domain=.e-hentai.org\';document.getElementById(\'panda_list\').style.width=panda_width+\'px\';" />&nbsp;&nbsp;'+panda_lang_p003+'&nbsp;<input type="checkbox" '+(document.cookie.match(/panda_origin=true/)?'checked="checked"':'')+' onclick="if(this.checked){alert(panda_lang_a004);};document.cookie=\'panda_origin=\'+this.checked+\';path=/;domain=.e-hentai.org\';if(document.getElementById(\'panda_list\').innerHTML){panda_showlist();};" /></h3><h3><a id="panda_prev" href="javascript:;" onclick="panda_showprev();" style="text-decoration:none;display:none;">&lt;&lt;&lt;</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="panda_showlist();" style="text-decoration:none;">[&nbsp;&#9660;&nbsp;]</a>&nbsp;&nbsp;&nbsp;<a id="panda_next" href="javascript:;" onclick="panda_shownext();" style="text-decoration:none;display:none;">&gt;&gt;&gt;</a></h3></div><div id="panda_list" style="margin:10px auto;width:'+panda_width+'px;max-width:100%;"></div><div id="panda_dock" class="gm" style="text-align:center;display:none;"><h3><a href="javascript:;" onclick="panda_showprev();" style="text-decoration:none;">&lt;&lt;&lt;</a>&nbsp;&nbsp;&nbsp;<a href="#panda_plus" style="text-decoration:none;">[&nbsp;&#9650;&nbsp;]</a>&nbsp;&nbsp;&nbsp;<a href="javascript:;" onclick="panda_shownext();" style="text-decoration:none;">&gt;&gt;&gt;</a></h3></div>';
var gtbn=document.getElementById('cdiv');
gtbn.parentNode.insertBefore(code,gtbn);
};
var panda=document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1];
var panda_zhcn=(navigator.language && navigator.language=='zh-CN')?true:false;
var panda_lang_a001=panda_zhcn?'网络错误，是否重试？':'Network error, retry?';
var panda_lang_a002=panda_zhcn?'输入有误':'Incorrect input';
var panda_lang_a003=panda_zhcn?'到达边界':'Edge reached';
var panda_lang_a004=panda_zhcn?'登录才可浏览原图':'Login to view original';
var panda_lang_p001=panda_zhcn?'范围':'Range';
var panda_lang_p002=panda_zhcn?'宽度':'Width';
var panda_lang_p003=panda_zhcn?'原图':'Original';
var panda_lang_q001=panda_zhcn?'加载多少张图片？（留空读取至末尾）':'How many pictures to load? (Leave blank to end)';
var panda_width=document.cookie.match(/panda_width=[\d]+/)?document.cookie.match(/panda_width=(\d+)/)[1]:720;
if(document.getElementById('gdt') && !document.getElementById('panda_plus')){panda_plusfunc();};
