"use strict";

var formValidationModule = {
  init: function() {
    var self = this,
        $form = $('form[data-abide]').eq(0);

    $form.on('invalid.fndtn.abide', function() {
      var invalid_fields = $(this).find('[data-invalid]');
      console.log(invalid_fields);

      $('.columns.error').removeClass('error');

      invalid_fields.each(function(n, field) {
        $(field).closest('.row > .columns').addClass('error');
      });
    }).on('valid.fndtn.abide', function() {
      console.log('valid!');
      $('.columns.error').removeClass('error');
      document.location = $('#next-url').attr('href');
    });

    $('#next-url', $form).click(function(e) {
      e.preventDefault();
      $form.submit();
    });
  }
};
