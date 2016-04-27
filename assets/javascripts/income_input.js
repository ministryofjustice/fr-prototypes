"use strict";var incomeInputModule={sources:null,prefixes:null,init:function(){var e=this;e.prefixes=incomeSourcesModule.prefixes,e.sources=JSON.parse(localStorage.getItem("income-sources")),console.dir(e.sources),$("#next-url").attr("href","#").on("click",function(n){n.preventDefault(),e.recordIncome()}),e.sources.length?e.collectIncome(0):e.finishIncome()},collectIncome:function(e){var n=this,r=n.sources[e],t="",o=$("#income-entry"),s="";o.data({source:r,sourceNum:e}),t+='<span class="hint">10 of 20</span>',t+="<h4>"+r.text+"</h4>",s=r.user&&r.partner?"you and your partner receive":r.user?"you receive":"your partner receives","income-wages"===r.name?(t+="<br><p>Enter the amount "+s+" every month before tax and National Insurance have been taken off.</p>",t+="<p>If you get paid weekly, multiply your weekly wage by 52 and divide by 12 to get a monthly total.</p>"):t+="<br><p>Enter the amount "+s+" every month.</p>";for(var a in n.prefixes){var i=n.prefixes[a];r[i]&&(t+=n.writeInput(i,r))}o.html(t)},writeInput:function(e,n){var r="",t="user"===e?"You receive":"Your partner receives";return r+='<label for="'+e+"-"+n.name+'">'+t+"</label>",r+='<div class="row"><div class="small-6 medium-10 columns"><div class="small-2 columns" style="padding: 0">',r+='<span class="prefix"><label class="inline" for="'+e+"-"+n.name+'">\xa3</label></span>',r+='</div><div class="small-10 columns" style="padding: 0"><input class="'+e+'-amount" id="'+e+"-"+n.name+'" type="number" step="0.01">',r+="</div></div></div><br>"},recordIncome:function(){{var e=this,n=$("#income-entry"),r=n.data("source"),t=n.data("sourceNum");n.find('input[type="number"]')}for(var o in e.prefixes){var s=e.prefixes[o],a=$("#"+s+"-"+r.name);if(a.length){var i=a.val()||0;e.sources[t][s+"Amount"]=i}}localStorage.setItem("income-sources",JSON.stringify(e.sources)),e.nextIncome(t)},nextIncome:function(e){var n=this,r=e+1;r>=n.sources.length?n.finishIncome():n.collectIncome(r)},finishIncome:function(){buildNextUrl("probate.html"),document.location=$("#next-url").attr("href")}};