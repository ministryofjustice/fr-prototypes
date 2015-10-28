(function() {
    var incomeCalculator, root;

    root = typeof exports !== "undefined" && exports !== null ? exports : this;

    incomeCalculator = (function() {
        var checkValidation, couple_supp, min_val, pp_child, showResult;

        function incomeCalculator() {}

        min_val = 1085;

        pp_child = 245;

        couple_supp = 160;

        incomeCalculator.prototype.calculate = function(fee, status, children, income) {
            var child_uplift, curr_fee, married_supp, max_cont, result, user_to_pay;
            child_uplift = children * pp_child;
            curr_fee = parseFloat(fee);
            married_supp = status === 'true' || status === true ? couple_supp : 0;
            max_cont = Math.max(Math.floor((income - (min_val + child_uplift + married_supp)) / 10, 0) * 10 * 0.5, 0);
            user_to_pay = Math.min(max_cont, curr_fee);
            if (user_to_pay === 0) {
                result = {
                    type: 'full',
                    to_pay: '£0'
                };
            } else if (user_to_pay === curr_fee) {
                result = {
                    type: 'none',
                    to_pay: this.formatCurrency(user_to_pay)
                };
            } else if (user_to_pay > 0 && user_to_pay < curr_fee) {
                result = {
                    type: 'part',
                    to_pay: this.formatCurrency(user_to_pay)
                };
            } else {
                result = {
                    type: 'error',
                    to_pay: ''
                };
            }
            return result;
        };

        checkValidation = function() {
            $('input[data-check]').each(function() {
                var error, parent, test;
                test = $(this);
                error = $('label.error[data-check-error=' + test.data('check') + ']');
                parent = error.parents('.form-group').children('div');
                if (test.val().length === 0 || test.is(':radio') && $('input[name=' + test.attr('name') + ']:checked').val() === void 0) {
                    error.removeClass('hide');
                    parent.addClass('field_with_errors');
                } else {
                    error.addClass('hide');
                    parent.removeClass('field_with_errors');
                }
            });
            return $('label.error:visible').length === 0;
        };

        incomeCalculator.prototype.formatCurrency = function(val, dec) {
            var result;
            if (dec == null) {
                dec = 2;
            }
            result = parseFloat(val).toFixed(dec).replace(/\.0{2}/, '');
            return '£' + result;
        };

        showResult = function(data) {
            var add_class, show_text;
            add_class = 'callout-' + data.type;
            show_text = "The applicant doesn't have to pay the fee";
            switch (data.type) {
                case 'none':
                    show_text = 'The applicant must pay the full fee';
                    break;
                case 'part':
                    show_text = 'The applicant must pay ' + data.to_pay + ' towards the fee';
            }
            $('#calculator.callout').removeClass('callout-none callout-part callout-full');
            $('#calculator.callout').addClass(add_class);
            if (location.pathname.substring(location.pathname.lastIndexOf("/") + 1)=='evidence-check-4.html') {
                $("#next-url").attr("href", updateQueryStringParameter('income', $('#income').val()));
                $("#next-url").attr("href", updateQueryStringParameter('outcome', data.type));
                if(data.type=='part') {
                    $("#next-url").attr("href", updateQueryStringParameter('to_pay', escape(data.to_pay)));
                }
            }
            $('h3#fee-remit').text(show_text);
            $('#confirm_fee').text(incomeCalculator.prototype.formatCurrency($('#fee').val()));
            $('#confirm_status').text($('input:radio[name=couple]:checked').parent().text());
            $('#confirm_children').text($('#children').val());
            $('#confirm_income').text(incomeCalculator.prototype.formatCurrency($('#income').val()));
            $('#r2_calculator_result').show();
            $('#r2_calculator_income').hide();
            $('#check_btn').hide();
            return $('#next-url').show();
        };

        incomeCalculator.prototype.setupPage = function() {
            $('#r2_calculator_result').hide();
            $('#r2_calculator :input').attr('disabled', false);
            $('#json-result').hide();
            $('#check_btn').show();
            $('#clear_btn').hide();
            $('#fee').val('');
            $('#children').val('');
            $('#income').val('');
            $('#couple-yes').prop('checked', false);
            $('#couple-no').prop('checked', false);
            $('.error').addClass('hide');
        };

        incomeCalculator.prototype.setup = function() {
            this.setupPage();
            return $('#check_btn').on('click', function() {
                var result;
                if (checkValidation()) {
                    result = incomeCalculator.prototype.calculate($('#fee').val(), $('input:radio[name=couple]:checked').val(), $('#children').val(), $('#income').val());
                    showResult(result);
                }
            });
        };

        return incomeCalculator;

    })();

    root.incomeCalculator = incomeCalculator;

    jQuery(function() {
        var calc;
        calc = new incomeCalculator;
        return calc.setup();
    });

}).call(this);
