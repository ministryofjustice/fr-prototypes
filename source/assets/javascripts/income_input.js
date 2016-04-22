"use strict";

var incomeInputModule = {
  sources: null,
  prefixes: incomeSourcesModule.prefixes,
  init: function() {
    var self = this;

    self.sources = JSON.parse(localStorage.getItem('income-sources'));
    console.dir(self.sources);

    $('#next-url').attr('href', '#').on('click', function(e) {
      e.preventDefault();
      self.recordIncome();
    });

    if(self.sources.length) {
      self.collectIncome(0);
    } else {
      // TODO: no income
      self.finishIncome();
    }
  },

  collectIncome: function(n) {
    var self = this,
        incomeSource = self.sources[n],
        html = '',
        $target = $('#income-entry');

    $target.data({
      source: incomeSource,
      sourceNum: n
    });

    html += '<span class="hint">10.' + (n + 1) + ' of 20</span>';

    html += '<h4>Income: ' + incomeSource.text + '</h4>';

    for(var x in self.prefixes) {
      var prefix = self.prefixes[x];
      if(incomeSource[prefix]) {
        html += self.writeInput(prefix, incomeSource);
      }
    }

    $target.html(html);
  },

  writeInput: function(prefix, incomeSource) {
    var html = '',
        person = (prefix === 'user' ? "your" : "your partner's");

    html += '<br><p>Enter <strong>' + person + '</strong> income from ' + incomeSource.text + ' <strong>per month</strong>.</p>';
    if(incomeSource.name === 'income-wages') {
      html += '<p>Enter the amount before tax and National Insurance have been taken off.</p>';
    }

    html += '<div class="row"><div class="small-6 medium-10 columns"><div class="small-2 columns" style="padding: 0">'
    html += '<span class="prefix"><label class="inline" for="' + prefix + '-' + incomeSource.name + '">£</label></span>';
    html += '</div><div class="small-10 columns" style="padding: 0"><input class="' + prefix + '-amount" id="' + prefix + '-' + incomeSource.name + '" type="number" step="0.01">';
    html += '</div></div></div><br>';

    return html;
  },

  recordIncome: function() {
    var self = this,
        $target = $('#income-entry'),
        targetSource = $target.data('source'),
        targetSourceNum = $target.data('sourceNum'),
        inputs = $target.find('input[type="number"]');

    for(var x in self.prefixes) {
      var prefix = self.prefixes[x],
          $el = $('#' + prefix + '-' + targetSource.name);

      if($el.length) {
        var amountEntered = $el.val() || 0;
        self.sources[targetSourceNum][prefix + 'Amount'] = amountEntered;
      }
    }

    localStorage.setItem('income-sources', JSON.stringify(self.sources));
    // console.log('saved!');
    // console.log(self.sources);

    self.nextIncome(targetSourceNum);
  },

  nextIncome: function(n) {
    var self = this,
        nextIncome = n + 1;

    if(nextIncome >= self.sources.length) {
      self.finishIncome();
    } else {
      self.collectIncome(nextIncome);
    }
  },

  finishIncome: function() {
    buildNextUrl('probate.html');
    document.location = $('#next-url').attr('href');
  }
};
