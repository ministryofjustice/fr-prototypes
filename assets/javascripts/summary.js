"use strict";var summaryModule={init:function(){var e=this;$("form#summary").length&&e.summaryDetails()},summaryDetails:function(){var e=this;e.writeIncomeToSummary(),"true"===getValue("public","married").toString()&&$("#married-detail").text("Married");var t=parseInt(getValue("public","children"),10);t?$("#children-detail").text(t):$("#children-row").hide();var a=getValue("public","savings");a&&$("#savings-detail").text(a);var i=getValue("public","benefits").toString();"true"===i&&($("#benefits-detail").text("Yes"),$("#income-summary").hide());var r=getValue("public","ni");r&&$("#ni-detail").text(r);var l="",n=getValue("public","title").toString(),u=getValue("public","first_name").toString(),c=getValue("public","last_name").toString();("false"!==u.toString()||"false"!==c.toString())&&(l+=n&&"false"!==n?n+" ":"",l+=u&&"false"!==u?u+" ":"",l+=c&&"false"!==c?c:"",$("#name-detail").text(l)),"true"===getValue("public","et-case").toString()&&$("#et-case").show();var o=getValue("public","case-number").toString();""!==o&&($("#case-number").show(),$("#case-detail").text(o))},writeIncomeToSummary:function(){var e,t=this,a=$("#income-summary #income-detail"),i=getValue("public","income-band"),r=getValue("public","incomeThresholdFloor")||1085,l=getValue("public","incomeThresholdCeiling")||5085;e="low"===i?"Less than "+t.formatCurrency(r,"0,0"):"high"===i?"More than "+t.formatCurrency(l,"0,0"):t.formatCurrency(getValue("public","income-detail")),a.text(e)},formatCurrency:function(e,t){var a=t||"0,0.00";return"\xa3"+numeral(e).format(a)}};