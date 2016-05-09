"use strict";

var incomeInputModule = {
  sources: null,
  prefixes: null,
  init: function() {
    var self = this;

    self.prefixes = incomeSourcesModule.prefixes;

    // self.sources = JSON.parse(localStorage.getItem('income-sources'));
    self.sources = getValue('public', 'income-sources');
    console.dir(self.sources);

    if(self.sources.length) {
      self.collectIncome(0);
      self.bindEvents();
    } else {
      self.finishIncome();
    }
  },

  bindEvents: function() {
    var self = this;

    $(document).on('keypress', '#income-entry input', function(e) {
      if(e.keyCode === 13) {
        e.preventDefault();
        self.recordIncome();
      }
    });

    $('#next-url').attr('href', '#').on('click', function(e) {
      e.preventDefault();
      self.recordIncome();
    });
  },

  collectIncome: function(n) {
    var self = this,
        incomeSource = self.sources[n],
        html = '',
        $target = $('#income-entry'),
        who = '';

    $target.data({
      source: incomeSource,
      sourceNum: n
    });

    html += '<span class="hint">10 of 20</span>';

    html += '<h4>' + incomeSource.text + '</h4>';

    if(incomeSource.user && incomeSource.partner) {
      who = 'you and your partner receive';
    } else {
      if(incomeSource.user) {
        who = 'you receive';
      } else {
        who = 'your partner receives';
      }
    }

    if(incomeSource.name === 'income-wages') {
      html += '<br><p>Enter the amount ' + who + ' every month before tax and National Insurance have been taken off.</p>';
      html += '<p>If you get paid weekly, multiply your weekly wage by 52 and divide by 12 to get a monthly total.</p>';
    } else {
      html += '<br><p>Enter the amount ' + who + ' every month.</p>';
    }

    for(var x in self.prefixes) {
      var prefix = self.prefixes[x];
      if(incomeSource[prefix]) {
        html += self.writeInput(prefix, incomeSource);
      }
    }

    $target.html(html);
    $target.find('input').eq(0).trigger('focus');
  },

  writeInput: function(prefix, incomeSource) {
    var html = '',
        preface = (prefix === 'user' ? "You receive" : "Your partner receives");

    html += '<label for="' + prefix + '-' + incomeSource.name + '">' + preface + '</label>';

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

    // localStorage.setItem('income-sources', JSON.stringify(self.sources));
    storeValue('public', 'income-sources', self.sources);
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
