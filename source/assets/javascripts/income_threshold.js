"use strict";

var incomeThresholdModule = {
  prefixes: ['user', 'partner'],
  isMarried: null,

  init: function() {
    var self = this,
        incomeLists = $('ul.income-source-list');

    if(incomeLists.length) {
      self.isMarried = getValue('public', 'married').toString();
      self.writeIncomeList(incomeLists);
    }
  },

  writeIncomeList: function(incomeLists) {
    var self = this,
        sources = getValue('public', 'income-sources'),
        html = '';

    self.prefixes.forEach(function(prefix) {
      sources.forEach(function(source) {
        if(source[prefix].toString() === 'true') {
          var prefixText = (prefix === 'user' ? 'You' : 'Your partner');
          html += '<li>' + prefixText + ': ' + source.text + '</li>';
        }
      });
    });

    $(incomeLists).each(function(n, list) {
      $(list).html(html);
    });
  }
};
