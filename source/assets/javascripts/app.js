$(document).ready( function() {

  $('input[type=radio]').on('change', function () {
    $("[name='" + $(this).attr('name') + "']").parent().removeClass("selected");
    $(this).parent().addClass('selected');
  });
  $('input[type="checkbox"]').on('change', function () {
    $(this).parent().toggleClass('selected', $(this).is(':checked'));
  });

  $('input:checked').parent().addClass('selected');

  listLocalStorage();
});

function buildNextUrl(page) {
  var query = location.href.substring((location.href.indexOf('?') + 1), location.href.length);
  if (location.href.indexOf('?') > 0) {
    page = page + '?' + query;
  }
  $('#next-url').attr("href", page);
}

function updateQueryStringParameter(key, value) {
  var uri = $('#next-url').attr('href');
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}
function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function listLocalStorage() {
  var obj = {};
  for (var i = 0; i < localStorage.length; i++){
    obj[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
  }

  console.log(obj);
}

function storeValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));

  console.log('stored: ' + key + '=' + value);
}

function getValue(key) {
  var val = JSON.parse(localStorage.getItem(key));

  console.log('requested: ' + key);

  if(val && val !== 'null') {
    console.log('returned: ' + val);
    return val;
  }

  console.log('nope')
  return false;
}

function clearValue(key) {
  localStorage.removeItem(key);
}
