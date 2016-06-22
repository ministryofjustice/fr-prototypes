(function() {
  var incomeCalculator, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  incomeCalculator = (function() {
    var checkValidation,
        couple_supp,
        min_val,
        pp_child,
        storeResult;

    function incomeCalculator() {}

    min_val = 1085;

    pp_child = 245;

    couple_supp = 160;

    incomeCalculator.prototype.calculate = function(fee, status, children, income) {
      var child_uplift,
          curr_fee,
          married_supp,
          max_cont,
          result,
          user_to_pay;

      child_uplift = children * pp_child;
      curr_fee = parseFloat(fee);
      married_supp = status === 'true' || status === true ? couple_supp : 0;
      max_cont = Math.max(Math.floor((income - (min_val + child_uplift + married_supp)) / 10, 0) * 10 * 0.5, 0);
      user_to_pay = Math.min(max_cont, curr_fee);
      if (user_to_pay === 0) {
        result = {
          type: 'full',
          to_pay: '0'
        };
      } else if (user_to_pay === curr_fee) {
        result = {
          type: 'none',
          to_pay: user_to_pay.toString()
        };
      } else if (user_to_pay > 0 && user_to_pay < curr_fee) {
        result = {
          type: 'part',
          to_pay: user_to_pay.toString()
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
      var errorsFound = 0;

      $('input[data-check]').each(function() {
        var error,
            parent,
            test;

        test = $(this);
        error = $('label.error[data-check-error=' + test.data('check') + ']');
        parent = error.parents('.form-group').children('div');
        if (test.val().length === 0 || test.is(':radio') && $('input[name=' + test.attr('name') + ']:checked').val() === void 0) {
          error.removeClass('hide');
          errorsFound++;
          parent.addClass('field_with_errors');
        } else {
          error.addClass('hide');
          parent.removeClass('field_with_errors');
        }
      });

      return errorsFound === 0;
    };

    incomeCalculator.prototype.formatCurrency = function(val, dec) {
      var result;

      if (dec == null) {
        dec = 2;
      }
      result = parseFloat(val).toFixed(dec).replace(/\.0{2}/, '');
      return '£' + result;
    };

    storeResult = function(data) {
      storeValue('staff', 'outcome', data.type);
      if(data.type=='part') {
        storeValue('staff', 'to_pay', data.to_pay);
      }
    };

    incomeCalculator.prototype.setupPage = function() {
      $('.error').addClass('hide');
    };

    incomeCalculator.prototype.setup = function() {
      this.setupPage();
      return $('#next-url').on('click', function(e) {
        var result;
        e.preventDefault();

        if (checkValidation()) {
          result = incomeCalculator.prototype.calculate($('#fee').val(), $('input:radio[name=couple]:checked').val(), $('#children').val(), $('#income').val());
          storeResult(result);
          document.location = $('#next-url').attr('href');
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
