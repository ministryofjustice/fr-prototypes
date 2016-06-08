"use strict";

var summaryModule = {
  init: function() {
    var self = this;

    if($('form#summary').length) {
      self.summaryDetails();
    }
  },

  summaryDetails: function() {
    var self = this;

    self.writeIncomeToSummary();

    if(getValue('public', 'married').toString() === 'true') {
      $('#married-detail').text('Married');
    }

    var numChildren = parseInt(getValue('public', 'children'), 10);
    if(numChildren) {
      $('#children-detail').text(numChildren);
    } else {
      $('#children-row').hide();
    }

    var savingsChoice = getValue('public', 'savings');
    if(savingsChoice) {
      $('#savings-detail').text(savingsChoice);
    }

    var benefitsChoice = getValue('public', 'benefits').toString();
    if(benefitsChoice === 'true') {
      $('#benefits-detail').text('Yes');
      $('#income-summary').hide();
    }

    var niEntry = getValue('public', 'ni');
    if(niEntry) {
      $('#ni-detail').text(niEntry);
    }

    var name = '';
    var title = getValue('public', 'title').toString();
    var fname = getValue('public', 'first_name').toString();
    var lname = getValue('public', 'last_name').toString();

    if(fname.toString() !== 'false' || lname.toString() !== 'false') {
      name += ((title && title !== 'false') ? title + ' ' : '');
      name += ((fname && fname !== 'false') ? fname + ' ' : '');
      name += ((lname && lname !== 'false') ? lname : '');

      $('#name-detail').text(name);
    }

    if(getValue('public', 'et-case').toString() === 'true') {
      $('#et-case').show();
      $('#case-heading .subheader').text('Claim number');
    }

    var caseNumber = getValue('public', 'case-number').toString();
    if(caseNumber !== '' && caseNumber !== 'false') {
      $('#case-number').show();
      $('#case-detail').text(caseNumber)
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
