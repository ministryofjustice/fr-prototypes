"use strict";

var incomeSourcesModule = {
  sourcesContainer: '#income-sources',
  nextButton: '#next-url',
  sources: [
    {
      name: 'income-wages',
      text: 'Wages'
    },
    {
      name: 'income-child-benefit',
      text: 'Child Benefit'
    },
    {
      name: 'income-working-tax-credit',
      text: 'Working tax credit'
    },
    {
      name: 'income-child-tax-credit',
      text: 'Child tax credit'
    },
    {
      name: 'income-maintenence-payments',
      text: 'Maintenence payments'
    },
    {
      name: 'income-jsa',
      text: 'Contribution-based Jobseekers Allowance (JSA)'
    },
    {
      name: 'income-esa',
      text: 'Contribution-based Employment and Support Allowance (ESA)'
    },
    {
      name: 'income-universal-credit',
      text: 'Universal Credit'
    },
    {
      name: 'income-pensions',
      text: 'Pensions (state, work, private)'
    },
    {
      name: 'income-rent',
      text: 'Rent from anyone living with you'
    },
    {
      name: 'income-rent-other',
      text: 'Rent from other properties you own'
    },
    {
      name: 'income-other',
      text: 'Other monthly income'
    },
  ],
  prefixes: ['user', 'partner'],
  isMarried: null,

  init: function() {
    var self = this;
    if($(self.sourcesContainer).length) {
      self.isMarried = getValue('public', 'married').toString();
      self.bindEvents();
      self.writeIncomeSources();
    }
  },

  bindEvents: function() {
    var self = this,
        $button = $(self.nextButton),
        url = $button.attr('href');

    $button.on('click', function(e) {
      e.preventDefault();
      self.getSources();
    });

    $(document).on('click', '#income-sources-wrapper input', function(e) {
      self.checkColumn($(e.target));
    });
  },

  writeIncomeSources: function() {
    var self = this,
        $wrapper = $('#income-sources-wrapper'),
        html = '';

    html += '<div class="small-12 medium-6 income-source-list columns user">';
    html += '<h3>Your income</h3>';
    self.sources.forEach(function(source) {
      html += '<div class="source-row" data-source="' + source.name + '" data-person="user">';
      html += self.compileSource(source.name, source.text, self.prefixes[0]);

      html += '</div>';
    });

    html += '<div class="source-row no-income-row">';
    html += '<div class="options radio"><div class="option">';
    html += '<label for="user-none">';
    html += '<input id="user-none" class="check-none" type="checkbox">';
    html += 'No income';
    html += '</label></div></div></div>';

    html += '</div>';


    if(self.isMarried === 'true') {
      html += '<div class="small-12 medium-6 income-source-list columns partner">';
      html += '<h3>Your partner\'s income</h3>';
      self.sources.forEach(function(source) {
        html += '<div class="source-row" data-source="' + source.name + '" data-person="partner">';
        html += self.compileSource(source.name, source.text, self.prefixes[1]);
        html += '</div>';
      });

      html += '<div class="source-row no-income-row">';
      html += '<div class="options radio"><div class="option">';
      html += '<label for="partner-none">';
      html += '<input id="partner-none" class="check-none" type="checkbox">';
      html += 'No income';
      html += '</label></div></div>';

      html += '</div>';
    };

    $wrapper.find('.row').eq(0).html(html);
  },

  compileSource: function(name, text, prefix) {
    var html = '';

    html += '<div class="options radio"><div class="option">';
    html += '<label for="' + prefix + '-' + name + '">';
    html += '<input id="' + prefix + '-' + name + '" type="checkbox">';
    html += text;
    html += '</label></div></div>';

    return html;
  },

  getSources: function() {
    var self = this,
        selectedSources = [];

    self.sources.forEach(function(source) {
      var checkedSourceOpts = $('[data-source="' + source.name + '"] input:checked');

      if(checkedSourceOpts.length) {
        var obj = {
          name: source.name,
          text: source.text
        };
        self.prefixes.forEach(function(prefix) {
          obj[prefix] = $('[data-source="' + source.name + '"][data-person="' + prefix + '"] input').prop('checked');
        });

        selectedSources.push(obj);
      }
    });

    storeValue('public', 'income-sources', selectedSources);

    // console.log(selectedSources);
    self.goNext();
  },

  goNext: function() {
    var self = this;

    document.location = $(self.nextButton).attr('href');
  },

  checkColumn: function($el) {
    var self = this,
        whichColumn = $el.attr('id').split('-')[0];

    if($el.hasClass('check-none') && $el.is(':checked')) {
      $('input[id^="' + whichColumn + '"]:checked').each(function(n, el) {
        self.unselect($(el));
      });
      self.select($el);
    } else {
      $('input[id="' + whichColumn + '-none"]:checked').each(function(n, el) {
        self.unselect($(el));
      });
    }
  },

  select: function($el) {
    $el.prop('checked', true).closest('label').addClass('selected');
  },

  unselect: function($el) {
    $el.prop('checked', false).closest('label').removeClass('selected');
  }
};
