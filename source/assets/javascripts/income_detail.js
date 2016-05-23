"use strict";

var incomeDetailModule = {
  init: function() {
    var self = this,
        $form = $('form#income-detail'),
        incomeLists = $('ul.income-sources', $form);

    if(incomeLists.length) {
      incomeThresholdModule.writeIncomeList(incomeLists);

      self.bindEvents();
    }
  },

  bindEvents: function() {
    $('#income-detail-amount').on('change', function(e) {
      var $el = $(e.target);

      storeValue('public', 'income-detail', $el.val());
    });
  }
};
