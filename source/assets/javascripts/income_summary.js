"use strict";

var incomeSummaryModule = {
  init: function() {
    var self = this;

    if($('.row#income-summary').length) {
      self.writeIncomeToSummary();
    }
  },

  writeIncomeToSummary: function() {
    var self = this,
        $el = $('#income-summary #income-detail'),
        text,
        incomeBand = getValue('public', 'income-band'),
        tFloor = getValue('public', 'incomeThresholdFloor') || 1085,
        tCeil = getValue('public', 'incomeThresholdCeiling') || 5085;


    if(incomeBand === 'low') {
      text = 'Less than ' + self.formatCurrency(tFloor, '0,0');
    } else if(incomeBand === 'high') {
      text = 'More than ' + self.formatCurrency(tCeil, '0,0');
    } else {
      text = self.formatCurrency(getValue('public', 'income-detail'));
    }

    $el.text(text);
  },

  formatCurrency: function(amount, format) {
    var f = format || '0,0.00';

    return '£' + numeral(amount).format(f);
  }
};
