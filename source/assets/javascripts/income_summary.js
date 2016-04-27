"use strict";

var incomeSummaryModule = {
  sources: null,
  prefixes: incomeSourcesModule.prefixes,
  isMarried: getUrlParameter('married').toString(),

  init: function() {
    var self = this;

    if($('.row#income-summary').length) {
      self.sources = JSON.parse(localStorage.getItem('income-sources'));
      self.totals = self.getTotals();
      self.showIncomeSummary();
    }
  },

  showIncomeSummary: function() {
    var self = this,
        html = '';

    $('.row.income-detail').remove();

    html += '<div class="small-12 medium-4 columns">';
    html += '<div class="subheader">Total income (monthly)</div>';
    html += '</div>';
    html += '<div class="small-12 medium-7 columns">';
    html += '<strong>' + self.formatCurrency(self.totals[2]) + '</strong>';
    html += '</div>';
    html += '<div class="small-12 medium-1 large-1 columns">';
    html += '<a href="income.html">Change</a>';
    html += '</div>';

    $('.row#income-summary').html(html).after(self.incomeSourcesRows());
  },

  incomeSourcesRows: function() {
    var self = this,
        html = '';

    if(self.isMarried === 'true') {
      html += '<div class="row">';
      html += '<div class="small-4 small-offset-4 columns"><strong>You</strong></div>';
      html += '<div class="small-4 columns"><strong>Your partner</strong></div>';
      html += '</div>';
    }

    self.sources.forEach(function(source) {
      html += '<div class="row">';
      html += '<div class="small-4 columns"><div class="subheader">' + source.text + '</div></div>';
      html += '<div class="small-4 columns">' + self.formatCurrency((source.userAmount ? source.userAmount : 0)) + '</div>';

      html += '<div class="small-4 columns">' + (self.isMarried === 'true' ? self.formatCurrency(source.partnerAmount ? source.partnerAmount : 0) : '&nbsp;') + '</div>';

      html += '</div>';
    });

    if(self.isMarried === 'true') {
      html += '<div class="row">';
      html += '<div class="small-4 small-offset-4 columns"><strong>' + self.formatCurrency(self.totals[0]) + '</strong></div>';
      html += '<div class="small-4 columns"><strong>' + self.formatCurrency(self.totals[1]) + '</strong></div>';
      html += '</div>';
    }

    return html;
  },

  getTotals: function() {
    var self = this,
        userTotal = 0,
        partnerTotal = 0;

    self.sources.forEach(function(source) {
      userTotal += parseFloat((source.userAmount ? source.userAmount : 0), 10);
      partnerTotal += parseFloat((source.partnerAmount ? source.partnerAmount : 0), 10);
    });

    return [userTotal, partnerTotal, (self.isMarried === 'true' ? userTotal + partnerTotal : userTotal)];
  },

  formatCurrency: function(amount) {
    return '£' + numeral(amount).format('0,0.00');
  }
};
