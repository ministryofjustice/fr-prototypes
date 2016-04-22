"use strict";

var incomeSummaryModule = {
  sources: null,
  prefixes: incomeSourcesModule.prefixes,
  isMarried: getUrlParameter('married').toString(),

  init: function() {
    var self = this;

    if($('.row#income-summary').length) {
      self.sources = JSON.parse(localStorage.getItem('income-sources'));
      console.dir(self.sources);
      self.totals = self.getTotals();
      self.showIncomeSummary();

      console.log(self.totals);
    }
  },

  showIncomeSummary: function() {
    var self = this,
        html = '';

    $('.row.income-detail').remove();

    html += '<div class="small-12 medium-5 large-4 columns">';
    html += '<div class="subheader">Total income (monthly)</div>';
    html += '</div>';
    html += '<div class="small-12 medium-6 large-7 columns">';
    html += '£' + self.totals[2];
    html += '</div>';
    html += '<div class="small-12 medium-1 large-1 columns">';
    html += '<a href="income.html">Change</a>';
    html += '</div>';

    $('.row#income-summary').html(html).after(self.incomeSourcesTableRow());
  },

  incomeSourcesTableRow: function() {
    var self = this,
        html = '';

    html += '<div class="row">';
    html += '<div class="small-8 small-offset-2 columns">';
    html += '<table width="100%">';

    if(self.isMarried === 'true') {
      html += '<thead>';
      html += '<tr>';
      html += '<th>Source</th>';
      html += '<th>You</th>';
      html += '<th>Your partner</th>';
      html += '</tr>';
      html += '</thead>';
    }

    html += '<tbody>';

    self.sources.forEach(function(source) {
      html += '<tr>';
      html += '<th>' + source.text + '</th>';
      html += '<td>£' + (source.userAmount ? source.userAmount : 0) + '</td>';
      if(self.isMarried === 'true') {
        html += '<td>£' + (source.partnerAmount ? source.partnerAmount : 0) + '</td>';
      }
      html += '</tr>';
    });

    html += '</tbody>';
    html += '<tfoot>';
    html += '<tr>';
    html += '<td></td>';
    html += '<td>£' + self.totals[0] + '</td>';
    if(self.isMarried === 'true') {
      html += '<td>£' + self.totals[1] + '</td>';
    }
    html += '</tr>';
    html += '</tfoot>';
    html += '</table>';
    html += '</div></div>';

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
  }
};
