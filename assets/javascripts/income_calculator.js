(function(){var e,t;t="undefined"!=typeof exports&&null!==exports?exports:this,e=function(){function e(){}var t,r,a,o,n;return a=1085,o=245,r=160,e.prototype.calculate=function(e,t,n,c){var l,u,i,p,h,s;return l=n*o,u=parseFloat(e),i="true"===t||t===!0?r:0,p=Math.max(10*Math.floor((c-(a+l+i))/10,0)*.5,0),s=Math.min(p,u),h=0===s?{type:"full",to_pay:"\xa30"}:s===u?{type:"none",to_pay:this.formatCurrency(s)}:s>0&&u>s?{type:"part",to_pay:this.formatCurrency(s)}:{type:"error",to_pay:""}},t=function(){return $("input[data-check]").each(function(){var e,t,r;r=$(this),e=$("label.error[data-check-error="+r.data("check")+"]"),t=e.parents(".form-group").children("div"),0===r.val().length||r.is(":radio")&&void 0===$("input[name="+r.attr("name")+"]:checked").val()?(e.removeClass("hide"),t.addClass("field_with_errors")):(e.addClass("hide"),t.removeClass("field_with_errors"))}),0===$("label.error:visible").length},e.prototype.formatCurrency=function(e,t){var r;return null==t&&(t=2),r=parseFloat(e).toFixed(t).replace(/\.0{2}/,""),"\xa3"+r},n=function(t){var r,a;switch(r="callout-"+t.type,a="The applicant doesn't have to pay the fee",t.type){case"none":a="The applicant must pay the full fee";break;case"part":a="The applicant must pay "+t.to_pay+" towards the fee"}return $("#calculator.callout").removeClass("callout-none callout-part callout-full"),$("#calculator.callout").addClass(r),"evidence-check-4.html"==location.pathname.substring(location.pathname.lastIndexOf("/")+1)&&($("#next-url").attr("href",updateQueryStringParameter("income",$("#income").val())),$("#next-url").attr("href",updateQueryStringParameter("outcome",t.type)),"part"==t.type&&$("#next-url").attr("href",updateQueryStringParameter("to_pay",escape(t.to_pay)))),$("h3#fee-remit").text(a),$("#confirm_fee").text(e.prototype.formatCurrency($("#fee").val())),$("#confirm_status").text($("input:radio[name=couple]:checked").parent().text()),$("#confirm_children").text($("#children").val()),$("#confirm_income").text(e.prototype.formatCurrency($("#income").val())),$("#r2_calculator_result").show(),$("#r2_calculator_income").hide(),$("#check_btn").hide(),$("#next-url").show()},e.prototype.setupPage=function(){$("#r2_calculator_result").hide(),$("#r2_calculator :input").attr("disabled",!1),$("#json-result").hide(),$("#check_btn").show(),$("#clear_btn").hide(),$("#fee").val(""),$("#children").val(""),$("#income").val(""),$("#couple-yes").prop("checked",!1),$("#couple-no").prop("checked",!1),$(".error").addClass("hide")},e.prototype.setup=function(){return this.setupPage(),$("#check_btn").on("click",function(){var r;t()&&(r=e.prototype.calculate($("#fee").val(),$("input:radio[name=couple]:checked").val(),$("#children").val(),$("#income").val()),n(r))})},e}(),t.incomeCalculator=e,jQuery(function(){var t;return t=new e,t.setup()})}).call(this);