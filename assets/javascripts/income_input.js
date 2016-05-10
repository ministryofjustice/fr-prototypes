"use strict";var incomeInputModule={sources:null,prefixes:null,init:function(){var e=this;e.prefixes=incomeSourcesModule.prefixes,e.sources=getValue("public","income-sources"),console.dir(e.sources),e.sources.length?(e.collectIncome(0),e.bindEvents()):e.finishIncome()},bindEvents:function(){var e=this;$(document).on("keypress","#income-entry input",function(n){13===n.keyCode&&(n.preventDefault(),e.recordIncome())}),$("#next-url").attr("href","#").on("click",function(n){n.preventDefault(),e.recordIncome()})},collectIncome:function(e){var n=this,r=n.sources[e],t="",o=$("#income-entry"),s="";o.data({source:r,sourceNum:e}),t+='<span class="hint">10 of 20</span>',t+="<h4>"+r.text+"</h4>",s=r.user&&r.partner?"you and your partner receive":r.user?"you receive":"your partner receives","income-wages"===r.name?(t+="<br><p>Enter the amount "+s+" every month before tax and National Insurance have been taken off.</p>",t+="<p>If you get paid weekly, multiply your weekly wage by 52 and divide by 12 to get a monthly total.</p>"):t+="<br><p>Enter the amount "+s+" every month.</p>";for(var i in n.prefixes){var c=n.prefixes[i];r[c]&&(t+=n.writeInput(c,r))}o.html(t),o.find("input").eq(0).trigger("focus")},writeInput:function(e,n){var r="",t="user"===e?"You receive":"Your partner receives";return r+='<label for="'+e+"-"+n.name+'">'+t+"</label>",r+='<div class="row"><div class="small-6 medium-10 columns"><div class="small-2 columns" style="padding: 0">',r+='<span class="prefix"><label class="inline" for="'+e+"-"+n.name+'">\xa3</label></span>',r+='</div><div class="small-10 columns" style="padding: 0"><input class="'+e+'-amount" id="'+e+"-"+n.name+'" type="number" step="0.01">',r+="</div></div></div><br>"},recordIncome:function(){{var e=this,n=$("#income-entry"),r=n.data("source"),t=n.data("sourceNum");n.find('input[type="number"]')}for(var o in e.prefixes){var s=e.prefixes[o],i=$("#"+s+"-"+r.name);if(i.length){var c=i.val()||0;e.sources[t][s+"Amount"]=c}}storeValue("public","income-sources",e.sources),e.nextIncome(t)},nextIncome:function(e){var n=this,r=e+1;r>=n.sources.length?n.finishIncome():n.collectIncome(r)},finishIncome:function(){buildNextUrl("probate.html"),document.location=$("#next-url").attr("href")}};