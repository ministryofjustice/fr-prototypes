"use strict";var incomeDetailModule={init:function(){var e=this,n=$("form#income-detail"),i=$("ul.income-sources",n);i.length&&incomeThresholdModule.writeIncomeList(i),n.length&&e.bindEvents()},bindEvents:function(){$("#income-detail-amount").on("change",function(e){var n=$(e.target);storeValue("public","income-detail",n.val())})}};