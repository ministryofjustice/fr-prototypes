"use strict";

var formNumberModule = {
  init: function() {
    var self = this;

    if($('input#form_number').length) {
      self.bindEvents();
    }

    if($('.row#form-number').length) {
      self.writeFormNumberToSummary();
    }

    if($('.show-form-number').length) {
      self.displayFormNumber();
    }
  },

  bindEvents: function() {
    var self = this;

    $('#next-url').on('click', function(e) {
      e.preventDefault();
      self.collectFormName();
    });
  },

  collectFormName: function() {
    var self = this,
        formNumber = self.defaultFormText;

    clearValue('public', 'form-number');

    if(!$('#form-unknown').prop('checked')) {
      if($('#form_number').val() !== '') {
        formNumber = $('#form_number').val();
        // localStorage.setItem('form-number', JSON.stringify(formNumber));
        storeValue('public', 'form-number', formNumber);
      }
    }

    self.goNext();
  },

  getStoredFormNumber: function() {
    var storedFormNumber = false;

    storedFormNumber = getValue('public', 'form-number');

    return storedFormNumber;
  },

  goNext: function() {
    document.location = $('#next-url').attr('href');
  },

  writeFormNumberToSummary: function() {
    var self = this,
        key = 'form-number',
        storedFormNumber;

    if(self.getStoredFormNumber()) {
      storedFormNumber = self.getStoredFormNumber();
    } else {
      storedFormNumber = 'not known';
    }

    $('#form-number .detail').text(storedFormNumber);
  },

  displayFormNumber: function() {
    var self = this;

    if(self.getStoredFormNumber()) {

      $('.form-number').each(function(n, el) {
        var fStr = self.getStoredFormNumber(),
            $el = $(el);

        if($el.hasClass('strong')) {
          fStr = '<strong>' + fStr + '</strong>';
        }
        $el.html('your ' + fStr + ' form');
      });
    }
  }
};
