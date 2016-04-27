"use strict";

var formNumberModule = {
  defaultFormText: 'Your Application',

  init: function() {
    var self = this;

    if($('input#form_number').length) {
      self.bindEvents();
    }

    if($('.row#form-number').length) {
      self.writeFormNumberToSummary();
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

    if(!$('#form-unknown').prop('checked')) {
      if($('#form_number').val() !== '') {
        formNumber = $('#form_number').val();
      }
    }

    console.log(formNumber);
    localStorage.setItem('form-number', JSON.stringify(formNumber));

    self.goNext();
  },

  goNext: function() {
    document.location = $('#next-url').attr('href');
  },

  writeFormNumberToSummary: function() {
    var self = this,
        key = 'form-number',
        storedFormNumber;

    if(localStorage.getItem(key)) {
      storedFormNumber = JSON.parse(localStorage.getItem(key));
    } else {
      storedFormNumber = self.defaultFormText;
    }

    $('#form-number .detail').text(storedFormNumber);
  }
};
