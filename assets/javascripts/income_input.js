"use strict";var incomeInputModule={sources:null,prefixes:incomeSourcesModule.prefixes,init:function(){var e=this;e.sources=JSON.parse(localStorage.getItem("income-sources")),console.dir(e.sources),$("#next-url").attr("href","#").on("click",function(n){n.preventDefault(),e.recordIncome()}),e.sources.length?e.collectIncome(0):e.finishIncome()},collectIncome:function(e){var n=this,o=n.sources[e],r="",s=$("#income-entry");s.data({source:o,sourceNum:e}),r+='<span class="hint">10.'+(e+1)+" of 20</span>",r+="<h4>Income: "+o.text+"</h4>";for(var t in n.prefixes){var c=n.prefixes[t];o[c]&&(r+=n.writeInput(c,o))}s.html(r)},writeInput:function(e,n){var o="",r="user"===e?"your":"your partner's";return o+="<br><p>Enter <strong>"+r+"</strong> income from "+n.text+" <strong>per month</strong>.</p>","income-wages"===n.name&&(o+="<p>Enter the amount before tax and National Insurance have been taken off.</p>"),o+='<div class="row"><div class="small-6 medium-10 columns"><div class="small-2 columns" style="padding: 0">',o+='<span class="prefix"><label class="inline" for="'+e+"-"+n.name+'">\xa3</label></span>',o+='</div><div class="small-10 columns" style="padding: 0"><input class="'+e+'-amount" id="'+e+"-"+n.name+'" type="number" step="0.01">',o+="</div></div></div><br>"},recordIncome:function(){{var e=this,n=$("#income-entry"),o=n.data("source"),r=n.data("sourceNum");n.find('input[type="number"]')}for(var s in e.prefixes){var t=e.prefixes[s],c=$("#"+t+"-"+o.name);if(c.length){var i=c.val()||0;e.sources[r][t+"Amount"]=i}}localStorage.setItem("income-sources",JSON.stringify(e.sources)),e.nextIncome(r)},nextIncome:function(e){var n=this,o=e+1;o>=n.sources.length?n.finishIncome():n.collectIncome(o)},finishIncome:function(){buildNextUrl("probate.html"),document.location=$("#next-url").attr("href")}};