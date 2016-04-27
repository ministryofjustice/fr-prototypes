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

    localStorage.removeItem('form-number');

    if(!$('#form-unknown').prop('checked')) {
      if($('#form_number').val() !== '') {
        formNumber = $('#form_number').val();
        localStorage.setItem('form-number', JSON.stringify(formNumber));
      }
    }

    self.goNext();
  },

  getStoredFormNumber: function() {
    var self = this,
        key = 'form-number',
        storedFormNumber = false;

    if(localStorage.getItem(key)) {
      storedFormNumber = JSON.parse(localStorage.getItem(key));
    }

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
      $('.form-number').html(self.getStoredFormNumber() + ' application').wrap('<strong />');
    }
  }
};
