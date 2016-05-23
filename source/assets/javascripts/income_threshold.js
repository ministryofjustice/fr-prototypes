"use strict";
var incomeThresholdModule = {
  prefixes: ['user', 'partner'],
  isMarried: null,
  baseThresholdFloor: 1085,
  thresholdRange: 4000,
  thresholdMarriedAllowance: 160,
  thresholdChildAllowance: 245,

  init: function() {

    var self = this,
        $form = $('form#income-amount'),
        incomeLists = $('ul.income-sources', $form);

    if(incomeLists.length) {
      self.isMarried = getValue('public', 'married').toString();
      self.updateThresholdFigures();
      self.writeIncomeList(incomeLists);

      self.bindEvents();
    }
  },

  bindEvents: function() {
    $('[name="income-amount"]').on('change', function(e) {
      var $el = $(e.target),
          band = $el.val();

      storeValue('public', 'income-band', band);
      buildNextUrl(band === 'mid' ? 'income-detail.html' : 'probate.html');
    });
  },

  writeIncomeList: function(incomeLists) {
    var self = this,
        sources = getValue('public', 'income-sources'),
        html = '';

    sources.forEach(function(source) {
      var entry = '';
      self.prefixes.forEach(function(prefix) {
        if(source[prefix] && source[prefix].toString() === 'true') {
          entry = '<li>' + source.text + '</li>';
        }
      });
      html += entry;
    });

    $(incomeLists).each(function(n, list) {
      $(list).html(html);
    });
  },

  updateThresholdFigures: function() {
    var self = this,
        tFloor = self.baseThresholdFloor,
        tCeil;

    if(getValue('public', 'married').toString() === 'true') {
      tFloor += self.thresholdMarriedAllowance;
    }

    if(getValue('public', 'children')) {
      tFloor += (parseInt(getValue('public', 'children'), 10) * self.thresholdChildAllowance);
    }

    tCeil = tFloor + self.thresholdRange;

    $('.threshold-lower').text(numeral(tFloor).format('0,0'));
    $('.threshold-upper').text(numeral(tCeil).format('0,0'));

    storeValue('public', 'incomeThresholdFloor', tFloor);
    storeValue('public', 'incomeThresholdCeiling', tCeil);
  },

  formatCurrency: function(amount) {
    return '£' + numeral(amount).format('0,0.00');
  }
};
